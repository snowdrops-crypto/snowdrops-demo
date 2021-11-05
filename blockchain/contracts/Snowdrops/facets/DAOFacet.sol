// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import {Modifiers, ItemType} from "../libraries/LibAppStorage.sol";
import {LibERC1155} from "../../shared/libraries/LibERC1155.sol";
import {LibItems} from "../libraries/LibItems.sol";
import {LibMeta} from "../../shared/libraries/LibMeta.sol";

contract DAOFacet is Modifiers {
  event DaoTransferred(address indexed previousDao, address indexed newDao);
  event DaoTreasuryTransferred(address indexed previousDaoTreasury, address indexed newDaoTreasury);
  event AddItemType(ItemType _itemType);
  event ItemTypeMaxQuantity(uint256[] _itemIds, uint256[] _maxQuantities);
  event ItemManagerAdded(address indexed newItemManager_);
  event ItemManagerRemoved(address indexed itemManager_);

  ///@notice Allow the Diamond owner or DAO to set a new Dao address and Treasury address
  ///@param _newDao New DAO address
  ///@param _newDaoTreasury New treasury address
  function setDao(address _newDao, address _newDaoTreasury) external onlyDaoOrOwner {
    emit DaoTransferred(s.dao, _newDao);
    emit DaoTreasuryTransferred(s.daoTreasury, _newDaoTreasury);
    s.dao = _newDao;
    s.daoTreasury = _newDaoTreasury;
  }

  ///@notice Allow the Diamond owner or DAO to add item managers
  ///@param _newItemManagers An array containing the addresses that need to be added as item managers
  function addItemManagers(address[] calldata _newItemManagers) external onlyDaoOrOwner {
    for (uint256 index = 0; index < _newItemManagers.length; index++) {
      address newItemManager = _newItemManagers[index];
      s.itemManagers[newItemManager] = true;
      emit ItemManagerAdded(newItemManager);
    }
  }

  ///@notice Allow the Diamond owner or DAO to remove item managers
  ///@dev Will throw if one of the addresses in `_itemManagers` is not an item manager
  ///@param _itemManagers An array containing the addresses that need to be removed from existing item managers
  function removeItemManagers(address[] calldata _itemManagers) external onlyDaoOrOwner {
    for (uint256 index = 0; index < _itemManagers.length; index++) {
      address itemManager = _itemManagers[index];
      require(s.itemManagers[itemManager] == true, "DAOFacet: itemManager does not exist or already removed");
      s.itemManagers[itemManager] = false;
      emit ItemManagerRemoved(itemManager);
    }
  }

  ///@notice Allow an item manager to increase the max quantity of an item
  ///@dev Will throw if the new maxquantity is less than the existing quantity
  ///@param _itemIds An array containing the identifiers of items whose quantites are to be increased
  ///@param _maxQuantities An array containing the new max quantity of each item
  function updateItemTypeMaxQuantity(uint256[] calldata _itemIds, uint256[] calldata _maxQuantities) external onlyItemManager {
    require(_itemIds.length == _maxQuantities.length, "DAOFacet: _itemIds length not the same as _newQuantities length");
    for (uint256 i; i < _itemIds.length; i++) {
      uint256 itemId = _itemIds[i];
      uint256 maxQuantity = _maxQuantities[i];
      require(maxQuantity >= s.itemTypes[itemId].totalQuantity, "DAOFacet: maxQuantity is greater than existing quantity");
      s.itemTypes[itemId].maxQuantity = maxQuantity;
    }
    emit ItemTypeMaxQuantity(_itemIds, _maxQuantities);
  }

  ///@notice Allow an item manager to mint new ERC1155 items
  ///@dev Will throw if a particular item current supply has reached its maximum supply
  ///@param _to The address to mint the items to
  ///@param _itemIds An array containing the identifiers of the items to mint
  ///@param _quantities An array containing the number of items to mint
  function mintItems(
    address _to,
    uint256[] calldata _itemIds,
    uint256[] calldata _quantities
  ) external onlyItemManager {
    require(_itemIds.length == _quantities.length, "DAOFacet: Ids and quantities length must match");
    address sender = LibMeta.msgSender();
    uint256 itemTypesLength = s.itemTypes.length;
    for (uint256 i; i < _itemIds.length; i++) {
      uint256 itemId = _itemIds[i];

      require(itemTypesLength > itemId, "DAOFacet: Item type does not exist");

      uint256 quantity = _quantities[i];
      uint256 totalQuantity = s.itemTypes[itemId].totalQuantity + quantity;
      require(totalQuantity <= s.itemTypes[itemId].maxQuantity, "DAOFacet: Total item type quantity exceeds max quantity");

      LibItems.addToOwner(_to, itemId, quantity);
      s.itemTypes[itemId].totalQuantity = totalQuantity;
    }
    emit LibERC1155.TransferBatch(sender, address(0), _to, _itemIds, _quantities);
    LibERC1155.onERC1155BatchReceived(sender, address(0), _to, _itemIds, _quantities, "");
  }

  ///@notice Allow an item manager to add item types
  ///@param _itemTypes An array of structs where each struct contains details about each item to be added
  function addItemTypes(ItemType[] memory _itemTypes) external onlyItemManager {
    insertItemTypes(_itemTypes);
  }

  // /@notice Allow an item manager to add item types and their svgs
  // /@param _itemTypes An array of structs where each struct contains details about each item to be added
  // /@param _svg The svg to be added
  // /@param _typesAndSizes An array of structs, each struct containing details about the item types and sizes
  // function addItemTypesAndSvgs(
  //   ItemType[] memory _itemTypes,
  //   string calldata _svg,
  //   LibSvg.SvgTypeAndSizes[] calldata _typesAndSizes
  // ) external onlyItemManager {
  //   insertItemTypes(_itemTypes);
  //   LibSvg.storeSvg(_svg, _typesAndSizes);
  // }

  function insertItemTypes(ItemType[] memory _itemTypes) internal {
    uint256 itemTypesLength = s.itemTypes.length;
    for (uint256 i; i < _itemTypes.length; i++) {
      uint256 itemId = itemTypesLength++;
      s.erc1155Categories[address(this)][itemId] = _itemTypes[i].category;
      s.itemTypes.push(_itemTypes[i]);
      emit AddItemType(_itemTypes[i]);
      emit LibERC1155.TransferSingle(LibMeta.msgSender(), address(0), address(0), itemId, 0);
    }
  }
}
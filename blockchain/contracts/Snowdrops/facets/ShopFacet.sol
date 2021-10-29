// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import {Modifiers, AppStorage, ItemType} from "../libraries/LibAppStorage.sol";
import {LibSnowdrops} from "../libraries/LibSnowdrops.sol";
// import "hardhat/console.sol";
import {IERC20} from "../../shared/interfaces/IERC20.sol";
import {LibERC721} from "../../shared/libraries/LibERC721.sol";
import {LibERC1155} from "../../shared/libraries/LibERC1155.sol";
import {LibItems} from "../libraries/LibItems.sol";
import {LibMeta} from "../../shared/libraries/LibMeta.sol";
import {LibERC1155Marketplace} from "../libraries/LibERC1155Marketplace.sol";

contract ShopFacet is Modifiers {
  event BuyPacks(address indexed _from, address indexed _to, uint256 _tokenId);

  event PurchaseItemsWithSwdp(address indexed _buyer, address indexed _to, uint256[] _itemIds, uint256[] _quantities, uint256 _totalPrice);
  event PurchaseTransferItemsWithSwdp(
    address indexed _buyer, address indexed _to, uint256[] _itemIds, uint256[] _quantities, uint256 _totalPrice
  );

  function buyPacks(address _to, uint256 _swdp, uint256 _quantity) external {
    address sender = LibMeta.msgSender();
    uint256 totalPrice;
    totalPrice = _quantity * _swdp;

    // 10 items per pack
    for (uint256 i; i < _quantity * 10; i++) {

    }
  }

  function purchaseItemsWithSwdp(address _to, uint256[] calldata _itemIds, uint256[] calldata _quantities) external {
    require(_itemIds.length == _quantities.length, "ShopFacet: _itemIds not same length as _quantities");
    address sender = LibMeta.msgSender();
    uint256 totalPrice;
    for (uint256 i; i < _itemIds.length; i++) {
      uint256 itemId = _itemIds[i];
      uint256 quantity = _quantities[i];
      ItemType storage itemType = s.itemTypes[itemId];
      require(itemType.canPurchaseWithSwdp, "ShopFacet: Can't purchase item type with SWDP");
      uint256 totalQuantity = itemType.totalQuantity + quantity;
    }
    uint256 swdpBalance = IREC20(s.swdpContract).balanceOf(sender);
    require(swdpBalance >= totalPrice, "ShopFacet: Not enough SWDP!");
    emit PurchaseItemsWithSwdp(sender, _to, _itemIds, _quantities, totalPrice);
    emit LibERC1155.TransferBatch(sender, address(0), _to, _itemIds, _quantities);
    LibSnowdrops.purchase(sender, totalPrice);
    LibERC1155.onERC1155BatchReceived(sender, address(0), _to, _itemIds, _quantities, "");
  }

  function purchaseTransferItemsWithSwdp(address _to, uint256[] calldata _itemIds, uint256[] calldata _quantities) external {
    require(_to != address(0), "ShopFacet: Can't transfer to 0 address");
    require(_itemIds.length == _quantities.length, "ShopFacet: ids not same length as quantities");
    address sender = LibMeta.msgSender();
    address from = address(this);
    uint256 totalPrice;
    for (uint256 i; i < _itemIds.length; i++) {
      uint256 itemId = _itemIds[i];
      uint256 quantity = _quantities[i];
      require(quantity == 1, "ShopFacet: Can only purchase 1 of an item per transaction.");
      ItemType storage itemType = s.itemTypes[itemId];
      require(itemType.canPurchaseWithSwdp, "ShopFacet: Can't purchase item type with SWDP");
      totalPrice += quantity * itemType.swdpPrice;
      LibItems.removeFromOwner(from, itemId, quantity);
      LibItems.addToOwner(_to, itemId, quantity);
      LibERC1155Marketplace.updateERC1155Listing(address(this), itemId, from);
    }
    uint256 swdpBalance = IERC20(s.swdpContract).balanceOf(sender);
    require(swdpBalance >= totalPrice, "ShopFacet: Not enough SWDP!");
    emit LibERC1155.TransferBatch(sender, from, _to, _itemIds, _quantities);
    emit PurchaseTransferItemsWithSwdp(sender, _to, _itemIds, _quantities, totalPrice);
    LibSnowdrops.purchase(sender, totalPrice);
    LibERC1155.onERC1155BatchReceived(sender, from, _to, _itemIds, _quantities, "");
  }
}
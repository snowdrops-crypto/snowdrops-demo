// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import {LibAppStorage, AppStorage, ItemType, Snowdrops, EQUIPPED_ITEM_SLOTS} from "./LibAppStorage.sol";
import {LibERC1155} from "../../shared/libraries/LibERC1155.sol";

/*
    This contract is built to handle the adding and removing of an ERC1155 token
    to/from an NFT or Owner.
*/

struct ItemTypeIO {
  uint256 balance;
  uint256 itemId;
  ItemType itemType;
}

library LibItems {
  uint8 internal constant ITEM_SLOT_FRONT   = 0;
  uint8 internal constant ITEM_SLOT_LEFT    = 1;
  uint8 internal constant ITEM_SLOT_RIGHT   = 2;
  uint8 internal constant ITEM_SLOT_BACK    = 3;
  uint8 internal constant ITEM_SLOTS_TOTAL  = 4;

  function itemBalancesOfTokenWithTypes(address _tokenContract, uint256 _tokenId)
    internal
    view
    returns (ItemTypeIO[] memory itemBalancesOfTokenWithTypes_)
  {
    AppStorage storage s = LibAppStorage.diamondStorage();
    uint256 count = s.nftItems[_tokenContract][_tokenId].length;
    itemBalancesOfTokenWithTypes_ = new ItemTypeIO[](count);
    for (uint256 i; i < count; i++) {
      uint256 itemId = s.nftItems[_tokenContract][_tokenId][i];
      uint256 bal = s.nftItemBalances[_tokenContract][_tokenId][itemId];
      itemBalancesOfTokenWithTypes_[i].itemId = itemId;
      itemBalancesOfTokenWithTypes_[i].balance = bal;
      itemBalancesOfTokenWithTypes_[i].itemType = s.itemTypes[itemId];
    }
  }

  function addToParent(
      address _toContract,
      uint256 _toTokenId,
      uint256 _id,
      uint256 _value // number of same item to add
  ) internal {
      AppStorage storage s = LibAppStorage.diamondStorage();
      s.nftItemBalances[_toContract][_toTokenId][_id] += _value;
      if (s.nftItemIndexes[_toContract][_toTokenId][_id] == 0) {
          s.nftItems[_toContract][_toTokenId].push(uint16(_id));
          s.nftItemIndexes[_toContract][_toTokenId][_id] = s.nftItems[_toContract][_toTokenId].length;
      }
  }

  function addToOwner(
      address _to,
      uint256 _id,
      uint256 _value // number of same item to add
  ) internal {
      AppStorage storage s = LibAppStorage.diamondStorage();
      s.ownerItemBalances[_to][_id] += _value;
      if (s.ownerItemIndexes[_to][_id] == 0) {
          s.ownerItems[_to].push(uint16(_id));
          s.ownerItemIndexes[_to][_id] = s.ownerItems[_to].length;
      }
  }

  function removeFromOwner(
      address _from,
      uint256 _id,
      uint256 _value // number of same item to remove
  ) internal {
      AppStorage storage s = LibAppStorage.diamondStorage();
      uint256 bal = s.ownerItemBalances[_from][_id];
      require(_value <= bal, "LibItems: Doesn't have that many to transfer");
      bal -= _value;
      s.ownerItemBalances[_from][_id] = bal;
      if (bal == 0) {
          uint256 index = s.ownerItemIndexes[_from][_id] - 1;
          uint256 lastIndex = s.ownerItems[_from].length - 1;
          if (index != lastIndex) {
              uint256 lastId = s.ownerItems[_from][lastIndex];
              s.ownerItems[_from][index] = uint16(lastId);
              s.ownerItemIndexes[_from][lastId] = index + 1;
          }
          s.ownerItems[_from].pop();
          delete s.ownerItemIndexes[_from][_id];
      }
  }

  function removeFromParent(
      address _fromContract,
      uint256 _fromTokenId,
      uint256 _id,
      uint256 _value
  ) internal {
      AppStorage storage s = LibAppStorage.diamondStorage();
      uint256 bal = s.nftItemBalances[_fromContract][_fromTokenId][_id];
      require(_value <= bal, "Items: Doesn't have that many to transfer");
      bal -= _value;
      s.nftItemBalances[_fromContract][_fromTokenId][_id] = bal;
      if (bal == 0) {
          uint256 index = s.nftItemIndexes[_fromContract][_fromTokenId][_id] - 1;
          uint256 lastIndex = s.nftItems[_fromContract][_fromTokenId].length - 1;
          if (index != lastIndex) {
              uint256 lastId = s.nftItems[_fromContract][_fromTokenId][lastIndex];
              s.nftItems[_fromContract][_fromTokenId][index] = uint16(lastId);
              s.nftItemIndexes[_fromContract][_fromTokenId][lastId] = index + 1;
          }
          s.nftItems[_fromContract][_fromTokenId].pop();
          delete s.nftItemIndexes[_fromContract][_fromTokenId][_id];
          if (_fromContract == address(this)) {
              checkItemIsEquipped(_fromTokenId, _id);
          }
      }
      if (_fromContract == address(this) && bal == 1) {
          Snowdrops storage snowdrop = s.snowdrops[_fromTokenId];
          if (
              snowdrop.equippedItems[LibItems.ITEM_SLOT_FRONT] == _id &&
              snowdrop.equippedItems[LibItems.ITEM_SLOT_BACK] == _id
          ) {
              revert("LibItems: Can't hold 1 item in both hands");
          }
      }
  }

  function checkItemIsEquipped(uint256 _fromTokenId, uint256 _id) internal view {
      AppStorage storage s = LibAppStorage.diamondStorage();
      for (uint256 i; i < EQUIPPED_ITEM_SLOTS; i++) {
          require(s.snowdrops[_fromTokenId].equippedItems[i] != _id, "Items: Cannot transfer wearable that is equipped");
      }
  }
}
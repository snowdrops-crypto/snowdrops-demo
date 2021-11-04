// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import {IERC20} from "../../shared/interfaces/IERC20.sol";
import {LibAppStorage, AppStorage, Snowdrops, ItemType, PAGE_SLOTS, EQUIPPED_ITEM_SLOTS} from "./LibAppStorage.sol";
import {LibERC20} from "../../shared/libraries/LibERC20.sol";
import {LibMeta} from "../../shared/libraries/LibMeta.sol";
import {IERC721} from "../../shared/interfaces/IERC721.sol";
import {LibERC721} from "../../shared/libraries/LibERC721.sol";
import {LibItems, ItemTypeIO} from "../libraries/LibItems.sol";

struct SnowdropsInfo {
  uint256 tokenId;
  string name;
  address owner;
  uint256 randomNumber;
  uint256 status;
  uint8[PAGE_SLOTS][EQUIPPED_ITEM_SLOTS] equippedItems;
  bool locked;
  ItemTypeIO[] items;
}

library LibSnowdrops {
  function getSnowdrops(uint256 _tokenId) internal view returns (SnowdropsInfo memory snowdropsInfo_) {
    AppStorage storage s = LibAppStorage.diamondStorage();
    snowdropsInfo_.tokenId = _tokenId;
    snowdropsInfo_.owner = s.snowdrops[_tokenId].owner;
    snowdropsInfo_.randomNumber = s.snowdrops[_tokenId].randomNumber;
    // snowdropsInfo_.status = s.snowdrops[_tokenId].status;
    snowdropsInfo_.name = s.snowdrops[_tokenId].name;

    // snowdropsInfo_.equippedItems = s.snowdrops[_tokenId].equippedItems;
    snowdropsInfo_.locked = s.snowdrops[_tokenId].locked;
    // snowdropsInfo_.items = LibItems.itemBalanceOfTokenWithTypes(address(this), _tokenId);
  }

  // Need to ensure there is no overflow of _swdp
  function purchase(address _from, uint256 _swdp) internal {
    AppStorage storage s = LibAppStorage.diamondStorage();
    //33% to burn address
    uint256 burnShare = (_swdp * 33) / 100;

    //33% to Snowdrops Crypto wallet
    uint256 companyShare = (_swdp * 33) / 100;

    //10% to DAO
    uint256 daoShare = (100 - companyShare + burnShare);

    // Using 0xFFFfffFFFFfffFFfFFFfFfFfffFfFffffFFFfFFf as burn address.
    // SWDP token contract does not allow transferring to address(0) address: https://etherscan.io/address/0x3F382DbD960E3a9bbCeaE22651E88158d2791550#code
    address swdpContract = s.swdpContract;
    LibERC20.transferFrom(swdpContract, _from, address(0xFFFfffFFFFfffFFfFFFfFfFfffFfFffffFFFfFFf), burnShare);
    LibERC20.transferFrom(swdpContract, _from, s.snowdropsWallet, companyShare);
    LibERC20.transferFrom(swdpContract, _from, s.dao, daoShare);
  }

  // This method will be used for Marketplace and Claiming through key.
  function transfer(
    address _from,
    address _to,
    uint256 _tokenId
  ) internal {
    AppStorage storage s = LibAppStorage.diamondStorage();

    // remove
    uint256 index = s.ownerTokenIdIndexes[_from][_tokenId];
    uint256 lastIndex = s.ownerTokenIds[_from].length - 1;
    if (index != lastIndex) {
      uint32 lastTokenId = s.ownerTokenIds[_from][lastIndex];
      s.ownerTokenIds[_from][index] = lastTokenId;
      s.ownerTokenIdIndexes[_from][lastTokenId] = index;
    }
    s.ownerTokenIds[_from].pop();
    delete s.ownerTokenIdIndexes[_from][_tokenId];
    if (s.approved[_tokenId] != address(0)) {
      delete s.approved[_tokenId];
      emit LibERC721.Approval(_from, address(0), _tokenId);
    }
    // add
    s.snowdrops[_tokenId].owner = _to;
    s.ownerTokenIdIndexes[_to][_tokenId] = s.ownerTokenIds[_to].length;
    s.ownerTokenIds[_to].push(uint32(_tokenId));
    emit LibERC721.Transfer(_from, _to, _tokenId);
  }

  function sqrt(uint256 x) internal pure returns (uint256 y) {
    uint256 z = (x + 1) / 2;
    y = x;
    while (z < y) {
      y = z;
      z = (x / z + z) / 2;
    }
  }
}
// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

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
  event BuyPacks(

  );

  function purchasePackWithSWDP(address _to, uint256[] calldata _itemIds, )
}
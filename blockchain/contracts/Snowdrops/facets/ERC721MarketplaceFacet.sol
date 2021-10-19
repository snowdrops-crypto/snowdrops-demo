// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import {IERC721} from "../../shared/interfaces/IERC721.sol";
import {LibERC20} from "../../shared/libraries/LibERC20.sol";
import {IERC20} from "../../shared/interfaces/IERC20.sol";
import {LibMeta} from "../../shared/libraries/LibMeta";
import {LibERC721Marketplace, ERC721Listing} from "../libraries/LibERC721Marketplace.sol";
import {Modifiers, ListingListItem} from "../libraries/LibAppStorage.sol";

contract ERC721MarketplaceFacet is Modifiers {
  event ERC721ListingAdd();
  event ERC721ExecutedListing();

  function getSnowdropListing();
  function getERC721Listing();

  function getERC721ListingFromToken();
  function getOwnerERC721Listings();

  struct SnowdropsListing {
    ERC721Listing listing_;
    SnowdropsInfo snowdropsInfo_;
  }

  
}
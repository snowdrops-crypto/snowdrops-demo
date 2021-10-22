// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import {IERC721} from "../../shared/interfaces/IERC721.sol";
import {LibERC20} from "../../shared/libraries/LibERC20.sol";
import {IERC20} from "../../shared/interfaces/IERC20.sol";
import {LibMeta} from "../../shared/libraries/LibMeta";
import {LibERC721Marketplace, ERC721Listing} from "../libraries/LibERC721Marketplace.sol";
import {Modifiers, ListingListItem} from "../libraries/LibAppStorage.sol";

contract ERC721MarketplaceFacet is Modifiers {
  event ERC721ListingAdd(
    uint256 indexed listingId,
    address indexed seller,
    address erc721TokenAddress,
    uint256 erc721TokenId,
    uint256 indexed category,
    uint256 time
  );

  event ERC721ExecutedListing(
    uint256 indexed listingId,
    address indexed seller,
    address buyer,
    address erc721TokenAddress,
    uint256 erc721TokenId,
    uint256 indexed category,
    uint256 priceInWei,
    uint256 time
  );

  function getSnowdropListing(uint256 _listingId) external view returns (ERC721Listing memory listing_, );
  function getERC721Listing();

  function getERC721ListingFromToken();
  function getOwnerERC721Listings();

  struct SnowdropsListing {
    ERC721Listing listing_;
    SnowdropsInfo snowdropsInfo_;
  }

  function getOwnerSnowdropsListings(address _owner, uint256 _category);

}
// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import {LibSnowdrops, SnowdropsInfo} from "../libraries/LibSnowdrops.sol";
import {IERC721} from "../../shared/interfaces/IERC721.sol";
import {LibERC20} from "../../shared/libraries/LibERC20.sol";
import {IERC20} from "../../shared/interfaces/IERC20.sol";
import {LibMeta} from "../../shared/libraries/LibMeta.sol";
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

  ///@notice Get an snowdrops listing details through an identifier
  ///@dev Will throw if the listing does not exist
  ///@param _listingId The identifier of the listing to query
  ///@return listing_ A struct containing certain details about the listing like timeCreated etc
  ///@return snowdropsInfo_ A struct containing details about the snowdrops
  function getSnowdropListing(uint256 _listingId) external view returns (ERC721Listing memory listing_, SnowdropsInfo memory snowdropsInfo_) {
    listing_ = s.erc721Listings[_listingId];
    require(listing_.timeCreated != 0, "ERC721Marketplace: ERC721 listing does not exist");
    snowdropsInfo_ = LibSnowdrops.getSnowdrops(listing_.erc721TokenId);
  }

  ///@notice Get an ERC721 listing details through an identifier
  ///@dev Will throw if the listing does not exist
  ///@param _listingId The identifier of the ERC721 listing to query
  ///@return listing_ A struct containing certain details about the ERC721 listing like timeCreated etc
  function getERC721Listing(uint256 _listingId) external view returns (ERC721Listing memory listing_) {
    listing_ = s.erc721Listings[_listingId];
    require(listing_.timeCreated != 0, "ERC721Marketplace: ERC721 listing does not exist");
  }

  ///@notice Get an ERC721 listing details through an NFT
  ///@dev Will throw if the listing does not exist
  ///@param _erc721TokenAddress The address of the NFT associated with the listing
  ///@param _erc721TokenId The identifier of the NFT associated with the listing
  ///@param _owner The owner of the NFT associated with the listing
  ///@return listing_ A struct containing certain details about the ERC721 listing associated with an NFT of contract address `_erc721TokenAddress` and identifier `_erc721TokenId`
  function getERC721ListingFromToken(
    address _erc721TokenAddress,
    uint256 _erc721TokenId,
    address _owner
  ) external view returns (ERC721Listing memory listing_) {
    uint256 listingId = s.erc721TokenToListingId[_erc721TokenAddress][_erc721TokenId][_owner];
    require(listingId != 0, "ERC721Marketplace: listing doesn't exist");
    listing_ = s.erc721Listings[listingId];
  }

  ///@notice Query a certain amount of ERC721 listings created by an address based on their category and sortings
  ///@param _owner Creator of the listings to query
  ///@param _category Category of listings to query // 0 == portal, 1 == vrf pending, 1 == open portal, 2 == Snowdrops.
  ///@param _sort Sortings of listings to query // "listed" or "purchased"
  ///@param _length How many ERC721 listings to return
  ///@return listings_ An array of structs, each struct containing details about each listing being returned
  function getOwnerERC721Listings(
    address _owner,
    uint256 _category,
    string memory _sort,
    uint256 _length // how many items to get back or the rest available
  ) external view returns (ERC721Listing[] memory listings_) {
    uint256 listingId = s.erc721OwnerListingHead[_owner][_category][_sort];
    listings_ = new ERC721Listing[](_length);
    uint256 listIndex;
    for (; listingId != 0 && listIndex < _length; listIndex++) {
      listings_[listIndex] = s.erc721Listings[listingId];
      listingId = s.erc721OwnerListingListItem[listingId].childListingId;
    }
    assembly {
      mstore(listings_, listIndex)
    }
  }

  struct SnowdropsListing {
    ERC721Listing listing_;
    SnowdropsInfo snowdropsInfo_;
  }

  ///@notice Query a certain amount of Snowdrops listings created by an address based on their category and sortings
  ///@param _owner Creator of the listings to query
  ///@param _category Category of listings to query  // 0 == portal, 1 == vrf pending, 1 == open portal, 2 == Snowdrops.
  ///@param _sort Sortings of listings to query // "listed" or "purchased"
  ///@param _length How many snowdrops listings to return
  ///@return listings_ An array of structs, each struct containing details about each listing being returned
  function getOwnerSnowdropsListings(
    address _owner,
    uint256 _category,
    string memory _sort,
    uint256 _length // how many items to get back or the rest available
  ) external view returns (SnowdropsListing[] memory listings_) {
    uint256 listingId = s.erc721OwnerListingHead[_owner][_category][_sort];
    listings_ = new SnowdropsListing[](_length);
    uint256 listIndex;
    for (; listingId != 0 && listIndex < _length; listIndex++) {
      ERC721Listing memory listing = s.erc721Listings[listingId];
      listings_[listIndex].listing_ = listing;
      listings_[listIndex].snowdropsInfo_ = LibSnowdrops.getSnowdrops(listing.erc721TokenId);
      listingId = s.erc721OwnerListingListItem[listingId].childListingId;
    }
    assembly {
      mstore(listings_, listIndex)
    }
  }

  ///@notice Query a certain amount of ERC721 listings
  ///@param _category Category of listings to query // 0 == Birthday
  ///@param _sort Sortings of listings to query  // "listed" or "purchased"
  ///@param _length How many listings to return
  ///@return listings_ An array of structs, each struct containing details about each listing being returned
  function getERC721Listings(
    uint256 _category, // 0 == Birthday
    string memory _sort, // "listed" or "purchased"
    uint256 _length // how many items to get back or the rest available
  ) external view returns (ERC721Listing[] memory listings_) {
    uint256 listingId = s.erc721ListingHead[_category][_sort];
    listings_ = new ERC721Listing[](_length);
    uint256 listIndex;
    for (; listingId != 0 && listIndex < _length; listIndex++) {
      listings_[listIndex] = s.erc721Listings[listingId];
      listingId = s.erc721ListingListItem[listingId].childListingId;
    }
    assembly {
      mstore(listings_, listIndex)
    }
  }

  ///@notice Query a certain amount of snowdrops listings
  ///@param _category Category of listings to query // 0 == Birthday
  ///@param _sort Sortings of listings to query
  ///@param _length How many listings to return
  ///@return listings_ An array of structs, each struct containing details about each listing being returned
  function getSnowdropsListings(
    uint256 _category, // 0 == Birthday
    string memory _sort, // "listed" or "purchased"
    uint256 _length // how many items to get back or the rest available
  ) external view returns (SnowdropsListing[] memory listings_) {
    uint256 listingId = s.erc721ListingHead[_category][_sort];
    listings_ = new SnowdropsListing[](_length);
    uint256 listIndex;
    for (; listingId != 0 && listIndex < _length; listIndex++) {
      ERC721Listing memory listing = s.erc721Listings[listingId];
      listings_[listIndex].listing_ = listing;
      listings_[listIndex].snowdropsInfo_ = LibSnowdrops.getSnowdrops(listing.erc721TokenId);
      listingId = s.erc721ListingListItem[listingId].childListingId;
    }
    assembly {
      mstore(listings_, listIndex)
    }
  }

  ///@notice Query the category of an NFT
  ///@param _erc721TokenAddress The contract address of the NFT to query
  ///@param _erc721TokenId The identifier of the NFT to query
  ///@return category_ Category of the NFT // 0 == Birthday.
  function getERC721Category(address _erc721TokenAddress, uint256 _erc721TokenId) public view returns (uint256 category_) {
    require(_erc721TokenAddress == address(this), "ERC721Marketplace: ERC721 category does not exist");
    // category_ = s.snowdrops[_erc721TokenId].status;
    category_ = 0;
  }

  ///@notice Allow an ERC721 owner to list his NFT for sale
  ///@dev If the NFT has been listed before,it cancels it and replaces it with the new one
  ///@dev NFTs that are listed are immediately locked
  ///@param _erc721TokenAddress The contract address of the NFT to be listed
  ///@param _erc721TokenId The identifier of the NFT to be listed
  ///@param _priceInWei The cost price of the NFT in $GHST
  function addERC721Listing(
      address _erc721TokenAddress,
      uint256 _erc721TokenId,
      uint256 _priceInWei
  ) external {
    IERC721 erc721Token = IERC721(_erc721TokenAddress);
    address owner = LibMeta.msgSender();
    require(erc721Token.ownerOf(_erc721TokenId) == owner, "ERC721Marketplace: Not owner of ERC721 token");
    require(
      _erc721TokenAddress == address(this) ||
          erc721Token.isApprovedForAll(owner, address(this)) ||
          erc721Token.getApproved(_erc721TokenId) == address(this),
      "ERC721Marketplace: Not approved for transfer"
    );

    require(_priceInWei >= 1e18, "ERC721Marketplace: price should be 1 GHST or larger");
    s.nextERC721ListingId++;
    uint256 listingId = s.nextERC721ListingId;

    uint256 category = getERC721Category(_erc721TokenAddress, _erc721TokenId);
    // require(category != LibSnowdrops.STATUS_VRF_PENDING, "ERC721Marketplace: Cannot list a portal that is pending VRF");

    uint256 oldListingId = s.erc721TokenToListingId[_erc721TokenAddress][_erc721TokenId][owner];
    if (oldListingId != 0) {
      LibERC721Marketplace.cancelERC721Listing(oldListingId, owner);
    }
    s.erc721TokenToListingId[_erc721TokenAddress][_erc721TokenId][owner] = listingId;
    s.erc721Listings[listingId] = ERC721Listing({
      listingId: listingId,
      seller: owner,
      erc721TokenAddress: _erc721TokenAddress,
      erc721TokenId: _erc721TokenId,
      category: category,
      priceInWei: _priceInWei,
      timeCreated: block.timestamp,
      timePurchased: 0,
      cancelled: false
    });

    LibERC721Marketplace.addERC721ListingItem(owner, category, "listed", listingId);
    emit ERC721ListingAdd(listingId, owner, _erc721TokenAddress, _erc721TokenId, category, _priceInWei);
    s.snowdrops[_erc721TokenId].locked = true;
    // Check if there's a publication fee and
    // transfer the amount to burn address
    if (s.listingFeeInWei > 0) {
      // burn address: address(xFFfFfFffFFfffFFfFFfFFFFFffFFFffffFfFFFfF)
      LibERC20.transferFrom(s.swdpContract, owner, address(0xFFfFfFffFFfffFFfFFfFFFFFffFFFffffFfFFFfF), s.listingFeeInWei);
    }
  }

  ///@notice Allow an ERC721 owner to cancel his NFT listing by providing the NFT contract address and identifier
  ///@param _erc721TokenAddress The contract address of the NFT to be delisted
  ///@param _erc721TokenId The identifier of the NFT to be delisted
  function cancelERC721ListingByToken(address _erc721TokenAddress, uint256 _erc721TokenId) external {
    LibERC721Marketplace.cancelERC721Listing(_erc721TokenAddress, _erc721TokenId, LibMeta.msgSender());
  }

  ///@notice Allow an ERC721 owner to cancel his NFT listing through the listingID
  ///@param _listingId The identifier of the listing to be cancelled
  function cancelERC721Listing(uint256 _listingId) external {
    LibERC721Marketplace.cancelERC721Listing(_listingId, LibMeta.msgSender());
  }

  ///@notice Allow a buyer to execute an open listing i.e buy the NFT
  ///@dev Will throw if the NFT has been sold or if the listing has been cancelled already
  ///@param _listingId The identifier of the listing to execute
  function executeERC721Listing(uint256 _listingId) external {
    ERC721Listing storage listing = s.erc721Listings[_listingId];
    require(listing.timePurchased == 0, "ERC721Marketplace: listing already sold");
    require(listing.cancelled == false, "ERC721Marketplace: listing cancelled");
    require(listing.timeCreated != 0, "ERC721Marketplace: listing not found");
    uint256 priceInWei = listing.priceInWei;
    address buyer = LibMeta.msgSender();
    address seller = listing.seller;
    require(seller != buyer, "ERC721Marketplace: buyer can't be seller");
    require(IERC20(s.swdpContract).balanceOf(buyer) >= priceInWei, "ERC721Marketplace: not enough GHST");

    listing.timePurchased = block.timestamp;
    LibERC721Marketplace.removeERC721ListingItem(_listingId, seller);
    LibERC721Marketplace.addERC721ListingItem(seller, listing.category, "purchased", _listingId);

    uint256 daoShare = priceInWei / 100;
    uint256 companyNameShare = (priceInWei * 2) / 100;
    //AGIP6 adds on 0.5%
    uint256 playerRewardsShare = priceInWei / 200;

    uint256 transferAmount = priceInWei - (daoShare + companyNameShare + playerRewardsShare);
    LibERC20.transferFrom(s.swdpContract, buyer, s.companyName, companyNameShare);
    LibERC20.transferFrom(s.swdpContract, buyer, s.daoTreasury, daoShare);
    LibERC20.transferFrom(s.swdpContract, buyer, seller, transferAmount);
    //AGIP6 adds on 0.5%
    // LibERC20.transferFrom((s.swdpContract), buyer, s.rarityFarming, playerRewardsShare);

    s.snowdrops[listing.erc721TokenId].locked = false;

    //To do (Nick) -- Explain why this is necessary
    if (listing.erc721TokenAddress == address(this)) {
      LibSnowdrops.transfer(seller, buyer, listing.erc721TokenId);
    } else {
      // GHSTStakingDiamond
      IERC721(listing.erc721TokenAddress).safeTransferFrom(seller, buyer, listing.erc721TokenId);
    }

    emit ERC721ExecutedListing(
      _listingId,
      seller,
      buyer,
      listing.erc721TokenAddress,
      listing.erc721TokenId,
      listing.category,
      listing.priceInWei,
      block.timestamp
    );
  }

  ///@notice Update the ERC721 listing of an address
  ///@param _erc721TokenAddress Contract address of the ERC721 token
  ///@param _erc721TokenId Identifier of the ERC721 token
  ///@param _owner Owner of the ERC721 token
  function updateERC721Listing(
    address _erc721TokenAddress,
    uint256 _erc721TokenId,
    address _owner
  ) external {
    LibERC721Marketplace.updateERC721Listing(_erc721TokenAddress, _erc721TokenId, _owner);
  }

  ///@notice Allow an ERC721 owner to cancel his NFT listings through the listingIDs
  ///@param _listingIds An array containing the identifiers of the listings to be cancelled
  function cancelERC721Listings(uint256[] calldata _listingIds) external onlyOwner {
    for (uint256 i; i < _listingIds.length; i++) {
      uint256 listingId = _listingIds[i];
      ListingListItem storage listingItem = s.erc721ListingListItem[listingId];
      require(listingItem.listingId != 0, "ERC721Marketplace: listingId does not exist");
      ERC721Listing storage listing = s.erc721Listings[listingId];
      listing.cancelled = true;
      emit LibERC721Marketplace.ERC721ListingCancelled(listingId, listing.category, block.number);
      LibERC721Marketplace.removeERC721ListingItem(listingId, listing.seller);
    }
  }

}
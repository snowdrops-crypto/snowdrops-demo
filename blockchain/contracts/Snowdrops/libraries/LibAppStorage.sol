
// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;
import {LibDiamond} from "../../shared/libraries/LibDiamond.sol";
import {LibMeta} from "../../shared/libraries/LibMeta.sol";
import {ILink} from "../interfaces/ILink.sol";
//import "../interfaces/IERC20.sol";
// import "hardhat/console.sol";

uint8 constant PAGE_SLOTS = 4;
uint8 constant EQUIPPED_ITEM_SLOTS = 16;
// Birthday / Mother's Day / Father's Day / Christmas / Hanukkah
uint256 constant NUMERIC_TYPE_NUM = 6;
uint256 constant ITEMS_PACK_NUM = 10;

struct Snowdrops {
    string name;
    address owner;
    bool locked;
    uint16[PAGE_SLOTS][EQUIPPED_ITEM_SLOTS] equippedItems; //The currently equipped items of the Greeting Card
    uint256 randomNumber;
    uint40 claimTime; //The block timestamp when this snowdrops was claimed
    uint40 lastInteracted; //The last time this Snowdrop was interacted with
}

struct Dimensions {
    uint8 x;
    uint8 y;
    uint8 width;
    uint8 height;
}

struct SvgLayer {
    address svgLayersContract;
    uint16 offset;
    uint16 size;
}


struct ItemDimensions {
    uint8 positionX;
    uint8 positionY;
    uint8 positionZ;

    uint8 scaleX;
    uint8 scaleY;
    uint8 scaleZ;
}

struct ItemType {
    string name;
    string description;
    string author;

    ItemDimensions itemDimensions;

    uint8 category; // is Birthday 0, is Mother's Day 1, is Father's Day 2
    uint8 itemType; // Image SVG GLB
    
    // SVG x,y,width,height
    Dimensions dimensions;
    uint32 svgId; //The svgId of the item
    
    // Each bit is a slot position. 1 is true, 0 is false
    bool[EQUIPPED_ITEM_SLOTS] slotPositions;
    
    uint8 rarityScoreModifier; //Number from 1-50.

    uint256 swdpPrice; //How much GHST this item costs
    uint256 maxQuantity; //Total number that can be minted of this item.
    uint256 totalQuantity; //The total quantity of this item minted so far
    
    bool canPurchaseWithSWDP;
    bool canBeTransferred;
}

struct ERC1155Listing {
  uint256 listingId;
  address seller;
  address erc1155TokenAddress;
  uint256 erc1155TypeId;
  uint256 category; // is Birthday 0, is Mother's Day 1, is Father's Day 2
  uint256 itemType; // Image, SVG, GLB...
  uint256 quantity;
  uint256 priceInWei;
  uint256 timeCreated;
  uint256 timeLastPurchased;
  uint256 sourceListingId;
  bool sold;
  bool cancelled;
}

struct ERC721Listing {
  uint256 listingId;
  address seller;
  address erc721TokenAddress;
  uint256 erc721TokenId;
  uint256 priceInWei;
  uint256 timeCreated;
  uint256 timePurchased;
  bool cancelled;
}

struct ListingListItem {
  uint256 parentListingId;
  uint256 listingId;
  uint256 childListingId;
}

struct AppStorage {
  string name;
  string symbol;

  // Snowdrops
  uint32[] tokenIds;
  uint32 tokenIdCounter;
  mapping(uint256 => Snowdrops) snowdrops;
  mapping(uint256 => uint256) tokenIdIndexes;
  mapping(uint256 => uint256) tokenIdToRandomNumber;
  mapping(address => uint32[]) ownerTokenIds;
  mapping(address => mapping(uint256 => uint256)) ownerTokenIdIndexes;
  mapping(address => mapping(address => bool)) operators; // ?? who, other than the owner, is allowed to use this token?
  mapping(uint256 => address) approved;
  mapping(address => uint256) metaNonces;
  

  // SVG
  mapping(bytes32 => SvgLayer[]) svgLayers;
  mapping(address => mapping(uint256 => mapping(uint256 => uint256))) nftItemBalances;
  mapping(address => mapping(uint256 => uint256[])) nftItems;
  // indexes are stored 1 higher so that 0 means no items in items array
  mapping(address => mapping(uint256 => mapping(uint256 => uint256))) nftItemIndexes;
  
  // Items
  ItemType[] itemTypes;
  mapping(address => mapping(uint256 => uint256)) ownerItemBalances;
  mapping(address => uint256[]) ownerItems;
  // indexes are stored 1 higher so that 0 means no items in items array
  mapping(address => mapping(uint256 => uint256)) ownerItemIndexes;

  //Addresses
  address swdpContract;
  address childChainManager;
  address dao;
  address daoTreasury;
  string itemsBaseUri;
  bytes32 domainSeparator;

  //VRF
  mapping(bytes32 => uint256) vrfRequestIdToTokenId;
  mapping(bytes32 => uint256) vrfNonces;
  bytes32 keyHash;
  uint144 fee;
  address vrfCoordinator;
  ILink link;

  // Marketplace
  uint256 nextERC1155ListingId;
  // erc1155 category => erc1155Order
  //ERC1155Order[] erc1155MarketOrders;
  mapping(uint256 => ERC1155Listing) erc1155Listings;
  // category => ("listed" or purchased => first listingId)
  //mapping(uint256 => mapping(string => bytes32[])) erc1155MarketListingIds;
  mapping(uint256 => mapping(string => uint256)) erc1155ListingHead;
  // "listed" or purchased => (listingId => ListingListItem)
  mapping(string => mapping(uint256 => ListingListItem)) erc1155ListingListItem;
  mapping(address => mapping(uint256 => mapping(string => uint256))) erc1155OwnerListingHead;
  // "listed" or purchased => (listingId => ListingListItem)
  mapping(string => mapping(uint256 => ListingListItem)) erc1155OwnerListingListItem;
  mapping(address => mapping(uint256 => mapping(address => uint256))) erc1155TokenToListingId;
  uint256 listingFeeInWei;
  // erc1155Token => (erc1155TypeId => category)
  mapping(address => mapping(uint256 => uint256)) erc1155Categories;
  uint256 nextERC721ListingId;
  //ERC1155Order[] erc1155MarketOrders;
  mapping(uint256 => ERC721Listing) erc721Listings;
  // listingId => ListingListItem
  mapping(uint256 => ListingListItem) erc721ListingListItem;
  mapping(uint256 => mapping(string => uint256)) erc721ListingHead;
  // user address => category => sort => listingId => ListingListItem
  mapping(uint256 => ListingListItem) erc721OwnerListingListItem;
  mapping(address => mapping(uint256 => mapping(string => uint256))) erc721OwnerListingHead;
  // erc721 token address, erc721 tokenId, user address => listingId
  mapping(address => mapping(uint256 => mapping(address => uint256))) erc721TokenToListingId;
  mapping(uint256 => uint256) sleeves;
  mapping(address => bool) itemManagers;
  // itemTypeId => (sideview => Dimensions)
  mapping(uint256 => mapping(bytes => Dimensions)) sideViewDimensions;
  mapping(address => mapping(address => bool)) petOperators; //Pet operators for a token
}

library LibAppStorage {
    function diamondStorage() internal pure returns (AppStorage storage ds) {
        assembly {
            ds.slot := 0
        }
    }

    function abs(int256 x) internal pure returns (uint256) {
        return uint256(x >= 0 ? x : -x);
    }
}

contract Modifiers {
    AppStorage internal s;
    modifier onlySnowdropsOwner(uint256 _tokenId) {
        require(LibMeta.msgSender() == s.snowdrops[_tokenId].owner, "LibAppStorage: Only snowdrops owner can call this function");
        _;
    }
    modifier onlyUnlocked(uint256 _tokenId) {
        require(s.snowdrops[_tokenId].locked == false, "LibAppStorage: Only callable on unlocked Snowdrops");
        _;
    }

    modifier onlyOwner() {
        LibDiamond.enforceIsContractOwner();
        _;
    }

    modifier onlyDao() {
        address sender = LibMeta.msgSender();
        require(sender == s.dao, "Only DAO can call this function");
        _;
    }

    modifier onlyDaoOrOwner() {
        address sender = LibMeta.msgSender();
        require(sender == s.dao || sender == LibDiamond.contractOwner(), "LibAppStorage: Do not have access");
        _;
    }

    modifier onlyItemManager() {
        address sender = LibMeta.msgSender();
        require(s.itemManagers[sender] == true, "LibAppStorage: only an ItemManager can call this function");
        _;
    }
}

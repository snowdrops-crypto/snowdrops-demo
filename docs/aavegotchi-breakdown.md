# Aavegotchi Contracts Breakdown

[Aavegotchi Github Org](https://github.com/aavegotchi)

This purpose of this document is to break-down Aavegotchi's implementation of ERC-721, ERC-20 and ERC-2535. The reason why I have chose to focus on Aavegotchi's smart contract
implementation is because of their use of the Diamonds Multi-Facet Proxy in conjunciton with their implemenation of an ERC-20 and ERC-721 token. They are also using ERC-1155 in order to tokenize items such as accessories. These are not unique tokens but still hold the same some of the same properties as an ERC-721 token.

#### Repositories
- Aavegotchi Contracts
- ghst-staking
- aavegotchi-realm-diamond
- aavegotchi-installation-diamond

EIP-165(Utility): Creates a standard method to publish and detect what interfaces a smart contract implements.

EIP-173(Utility): Standard interface to handle ownership of contract.

[Aavegotchi Contracts](https://github.com/aavegotchi/aavegotchi-contracts/tree/0b223bbf1b535bf500c4fe67e39363cd6f5c6069/contracts)
Of the folder structure below, the folder names market with a star hold the implementation for Aavegotchi
- *Aavegotchi
  - facets
    - AavegotchiFacet.sol (ERC721)
      - name, symbol, total_supply, tokenURI
      * EVENT PetOperatorApprovalForAll(owner, operator, approved)
      * totalSupply RETURNS uint totalSupply 
      * balanceOf(owner) RETURNS uint balance uint balance
      * getAavegotchi(uint256 _tokenId) RETURNS AavegotchiInfo aavegotchiInfo
      * aavegotchiClaimTime(uint256 tokenId) RETURNS uint claimTime
      * tokenByIndex(uint256 index) RETURNS uint tokenid
      * tokenOfOwnerByIndex(address owner, uint256 index) RETURNS uint 
      * tokenIdsOfOwner(owner) RETURNS 
      * allAavegotchisOfOwner(owner) RETURNS AavegotchiInfo[]
      * ownerOf
      * getApproved
      * isApprovedForAll
      * isPetOperatorForAll
      * safeTransferFrom
      * safeBatchTransferFrom
      * safeTransferFrom
      * transferFrom
      * internalTransferFrom
      * approve
      * setApprovalForAll
      * setPetOperatorForAll
      * name
      * symbol
      * tokenURI
    - AavegotchiGameFacet.sol
    - BridgeFacet.sol
    - CollateralFacet.sol
      * EVENT IncreaseStake
      * EVENT DecreaseStake
      * EVENT ExperienceTransfer
      * collaterals
      * collateralInfo
      * getCollateralInfo
      * getAllCollateralTypes
      * collateralBalance
      * increaseStake
      * decreaseStake
      * decreaseAndDestroy
      * setCollateralEyeShapeSVG
    - DAOFacet.sol
      * EVENT DaoTransferred
      * EVENT DaoTreasuryTransferred
      * EVENT UpdateCollateralModifiers
      * EVENT AddItemType
      * EVENT CreateHaunt
      * EVENT GrantExperience
      * EVENT AddWearableSet
      * EVENT UpdateWearableSet
      * EVENT ItemTypeMaxQuantity
      * EVENT GameManagerAdded
      * EVENT GameManagerRemoved
      * EVENT ItemManagerAdded
      * EVENT ItemManagerRemoved
      * EVENT WearableSlotPositionsSet
      * EVENT ItemModifiersSet
      * EVENT RemoveExperience
      * EVENT UpdateItemPrice
      * isGameManager
      * gameManagerBalance
      * gameManagerRefreshTime
      * setDao
      * addCollateralTypes
      * addItemManagers
      * removeItemManagers
      * updateCollateralModifiers
      * updateItemTypeMaxQuantity
      * createHaunt
      * STRUCT createHauntPayload
      * createHauntWithPayload
      * mintItems
      * grantExperience
      * removeExperience
      * addItemTypes
      * addItemTypesWithSvgs
      * insertItemTypes
      * addWearableSets
      * addGameManagers
      * removeGameManagers
      * setWearableSlotPositions
      * setItemTraitModifiersAndRarityModifier
      * batchUpdateItemsPrice
    - ERC1155Marketplace.sol
      * EVENT ERC1155ListingAdd
      * EVENT ERC1155ExecutedListing
      * EVENT ERC1155ListingCancelled
      * EVENT ChangedListingFee
      * getListingFeeInWei
      * getERC1155Listing
      * getERC1155ListingFromToken
      * getOwnerERC1155Listings
      * getERC1155Listings
      * setListingFee
      * STRUCT Category
      * setERC1155Categories
      * getERC1155Category
      * setERC1155Listing
      * cancelERC1155Listing
      * executeERC1155Listing
      * updateERC1155Listing
      * updateBatchERC1155Listing
      * cancelERC1155Listings
    - ERC721Marketplace.sol
      * EVENT ERC721ListingAdd
      * EVENT ERC721ExecutedListing
      * getAavegotchiListing
      * getERC721Listing
      * getERC721ListingFromToken
      * getOwnerERC721Listings
      * STRUCT AavegotchiListing
      * getOwnerAavegotchiListings
      * getERC721Listings
      * getAavegotchiListings
      * STRUCT Category
      * setERC721Categories
      * getERC721Category
      * getERC721Listing
      * cancelERC721ListingByToken
      * cancelERC721Listing
      * executeERC721Listing
      * updateERC721Listing
      * cancelERC721Listings
    - EscrowFacet.sol
      * EVENT Erc20Deposited
      * EVENT TransferEscrow
      * depositERC20
      * batchDepositERC20
      * escrowBalance
      * transferEscrow
    - ItemsFacet.sol (ERC1155)
      * EVENT TransferToParent
      * EVENT EquipWearables
      * EVENT UseConsumables
      * STRUCT ItemIdIO
      * itemBalances
      * itemBalancesWithTypes
      * balanceOf
      * balanceOfToken
      * itemBalancesOfToken
      * itemBalancesOfTokenWithTypes
      * balanceOfBatch
      * equippedWearables
      * getWearableSets
      * getWearableSet
      * totalWearableSets
      * findWearableSets
      * getItemType
      * getItemTypes
      * uri
      * setBaseURI
      * equipWearables
      * useConsumables
    - ItemsTransferFacet.sol
      * safeTransferFrom
      * safeBatchTransferFrom
      * transferToParent
      * batchBatchTransferToParent
      * batchTransferToParent
      * transferFromTokenApproved
      * transferFromParent: ERC721 -> Address
      * batchTransferFromParent: ERC721 -> Address
      * transferAsChild: ERC721 -> ERC721
      * batchTransferAsChild: ERC721 -> ERC721
      * onERC1155Received
      * onERC1155BatchReceived
      * extractItemsFromSacrificedGotchi: ERC721 -> Address Extract from accidentally burned
      * extractItemsFromDiamond: Diamond -> Address
    - MetaTransactionsFact: Meta Transactions are transactions who’s data is created and signed       off-chain by one person and executed by another person who pays the gas fees.
    https://medium.com/coinmonks/ethereum-meta-transactions-101-de7f91884a06
      * EVENT MetaTransactionExecuted
      * convertBytestoBytes4
      * getDomainSeparator
      * toTypedMessageHash
      * hashMetaTransaction
      * getNonce
      * verify
      * STRUCT MetaTransaction
      * executeMetaTransaction
    - ShopFacet.sol
      * EVENT MintPortals
      * EVENT BuyPortals
      * EVENT PurchaseItemsWithGhst
      * EVENT PurchaseTransferItemsWithGhst
      * EVENT PurchaseItemsWithVouchers
      * buyPortals
      * mintPortals
      * purchaseItemsWithGhst
      * purchaseTransferItemsWithGhst
    - SvgFacet.sol: Returns SVG Element Tags per ERC721
      * getAavegotchiSvg
      * STRUCT SvgLayerDetails
      * getAavegotchiSvgLayers
      * applyStyles
      * getWearableClass
      * getBodyWearable
      * getWearable
      * STRUCT AavegotchiLayers
      * previewAavegotchi
      * addBodyAndWearablesSvgLayers
      * portalAavegotchisSvg
      * getSvg
      * getSvgs
      * getItemSvg
      * storeSvg
      * updateSvg
      * deleteLastSvgLayers
      * STRUCT Sleeve
      * setSleeves
      * setItemDimensions
    - SvgViewsFacet.sol
    - VRFFacet.sol
    - VoucherMigrationFacet.sol
  - interfaces
    - ILink.sol
  - libraries
    - LibAavegotchi.sol
    - LibAppStorage.sol
    - LibERC1155Marketplace.sol
    - LibERC721Marketplace.sol
    - LibItems.sol
    - LibSvg.sol
  - CollateralEscrow.sol
  - InitDiamond.sol
- Ethereum
- *GHST
  - facets
    - GHSTFacet.sol
  - interfaces
    - IGHSTDiamond.sol
  - libraries
    - LibAppStorage.sol
  - InitDiamond.sol
- raffle
- *shared
  - facets
    - DiamondCutFacet.sol
    - DiamondLoupeFacet.sol
    - OwnershipFacet.sol
  - interfaces
    - IDiamondCut.sol
    - IDiamondLoupe.sol
    - IERC1155.sol
    - IERC1155TokenReceiver.sol
    - IERC165.sol
    - IERC173.sol
    - IERC721.sol
    - IERC721TokenReceiver.sol
  - libraries
    - LibDiamond.sol
    - LibERC1155.sol
    - LibERC20.sol
    - LibERC721.sol
    - LibMeta.sol
    - LibStrings.sol
    - RLPReader.sol
  - Diamond.sol
- test

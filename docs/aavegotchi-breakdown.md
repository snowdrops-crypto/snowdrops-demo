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
    - AavegotchiFacet.sol
    - AavegotchiGameFacet.sol
    - BridgeFacet.sol
    - CollateralFacet.sol
    - DAOFacet.sol
    - ERC1155Marketplace.sol
    - ERC721Marketplace.sol
    - EscrowFacet.sol
    - ItemsFacet.sol
    - ItemsTransferFacet.sol
    - ShopFacet.sol
    - SvgFacet.sol
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

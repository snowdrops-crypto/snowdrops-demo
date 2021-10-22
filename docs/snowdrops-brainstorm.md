# Snowdrops Brainstorm

This document is created to list ideas that come to mind about the implementation of Snowdrops.

#### Solidity vs Smart Weave
[Smartweave Article](https://arweave.medium.com/introducing-smartweave-building-smart-contracts-with-arweave-1fc85cb3b632#:~:text=Smart%20contract%20interactions%20are%20placed,verified%20by%20users%20during%20interaction.&text=Instead%2C%20developers%20are%20given%20the,participate%20in%20the%20contract%20execution.)
[SmartWeave Repo](https://github.com/ArweaveTeam/SmartWeave)
[Solidity Assembly](https://jeancvllr.medium.com/solidity-tutorial-all-about-assembly-5acdfefde05c)

:: Should I use Arweave Smart Contracts instead of Solidity?

Traditional: Every node executes a smart contract operation
SmartWeave's: "Lazy Evaluation" computation is pushed to the users of the smart contract
- The user evaluates each prior transaction on the Dapp until they reach the end of the chain of valide state transitions.
- This eliminates the need for GAS
- Enables heavy computations
- Can pay users to run the node for you
- Bad actors can be removed and their staked tokens can be slashed
- DAO controlled compute systems (Communities, staking/slashing/electing to run node)

#### ERC 1155 Items as Token
- Have card assets be items that can then be sold to through packs.
- These asset cards will then be available to select when creating/modifying a custom card.
- Assets include card trims, images, gifs, 3D objects, animations

#### Storing and Accessing Assets
- Inital thoughts on storing and accessing assets is through an address to asset mapping stored on Arweave.
- The address of the asset is store within the ERC721 and/or ERC1155 tokens.
- Then upon returning the address of the asset from the token to the client, use ArweaveJS to return the data
  on the asset.
- This can be a use case for an arweave smart contract. The contract will facilitate the adding, removing, modifying the data stored on
arweave.

#### Aavegotchi to Snowdrops
- Aavegotchi utilizes ERC1155 tokens by making them count as "Power Ups" towards the Aavegotchi NFT traits. This limits the creativity a user has towards customizing their Aavegotchi to premade items and pre-set positions such as hands/head/feet...
- Snowdrops will add an extra dimension to customization by allowing the user to choose where they would like to place an ERC1155 item on the greeting card.

#### 3D Parameter Storage
- Postition/Rotation(determined by page)/Scale of each ERC1155 attached to NFT are stored as parameters in each NFT.
- What is default size of ERC1155 image asset? { Width, Height }
- Position = struct uint256 x, y, z
- Rotation = struct uint256 x, y, z: Which page the ERC1155 token is stored on determines the direction of the Normal Vector.
- Scale = struct uint256 x, y, z
  - What is Max and Min Scale?

#### Rating System Through Token Based Voting
- Users can upvote the design of a card on the market to be entered into a lottery each week where they have a chance of winning that Item.
- The upvote is added to the card creator's rating.
- Card creator rating is used to determine position of listing on market.

#### Inital Distribution
- First time use, free card creation and 1 free ERC1155 pack
- ERC1155 pack contains 10 random Items.
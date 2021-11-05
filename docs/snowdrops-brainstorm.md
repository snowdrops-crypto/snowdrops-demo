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
- The address of the asset is store within the ERC1155 tokens.
- Then upon returning the address of the asset from the token to the client, use ArweaveJS to return the data
  on the asset.
- This can be a use case for an arweave smart contract. The contract will facilitate the adding, removing,
  modifying the data stored on arweave.

#### 3D Parameter Storage
- Postition/Rotation(determined by page)/Scale of each ERC1155 attached to NFT are stored as parameters in each NFT.
- What is default size of ERC1155 image asset? { Width, Height }
- Position = struct uint256 x, y, z
  - What is the max and min position?
- Rotation = struct uint256 x, y, z: Which page the ERC1155 token is stored on determines the direction of the Normal Vector.
- Scale = struct uint256 x, y, z
  - What is Max and Min Scale?
- zIndex: the layering of ERC1155 assets

#### Marketplace Rating System
- Users can upvote the design of a card on the market to be entered into a lottery each week where they have a chance of winning Snowdrops
- The upvote is added to the card creator's rating.
- Card creator rating is used to determine position of listing on market.

#### Adding Assets to Asset Pool
- Anyone can submit a new asset to the asset pool
- After an asset is added, it is vetted and put if approved, put up for voting
- Users vote on which assets will be added to the asset pool
- If an asset is added to the pool, the users who voted for that asset will be reward with that ERC1155 token

#### Inital Distribution
- First time use, free card creation and 1 free ERC1155 pack
- ERC1155 pack contains 10 random Items.

#### NFT Structure
- Each NFT has 4 pages; Front of Card(front), Back of Card(back), Inner Left Page(left), Inner Right Page(right)
- ERC1155 Slots for pages: There will be 4 slots, one for each page. Each page slot will also have 16 additional slots.
- The slot itsself is a struct, this struct contains the address to the ERC1155 token, the position and the scale.
- Rotation of object is determined by by which slot the token is in.

#### Custom Message
- The custom message stored on an NFT will typically be set before it is sent as a gift to someone.
- Before token is put on sale on the marketplace, the message is set to an empty string.

#### Economics Model v0.1
Rough Draft
-----------

The pricing of the tokens needs to reflect the cost of handing out enough tokens on initial signup to
allow someone to create an entire card. This would mean that the cost of creating a card, and the cost
of having enough items to fully customize your card would be added to the user's wallet when signing up
for the first time.

This will inevitably cause the problem of having using try and signup over and over again in order to
collect as many tokens as possible.

:Token Minting in phases
- What is the timeline for minting new tokens?
  - Automated?
  - DAO controlled?
  - More tokens are released the more users signup for app.
    - Signup is confirmed when user receives Tokens
- How will these minted tokens be distributed?
  - Given out for free on first signup.

The price of a creating the card must be the minimum price of a card on the market.
This means that if it costs $30 to create a card, the cheapest card available on the
market is ($30 + gas fees).

A method must also be put in place to restrict the price of the card getting too high.
This means that the value for creating a card, selling a card, and buying a card, need to
be pegged to USD. That means that if the price of a snowdrop token rises or falls, the price
of minting an NFT says the same in relation to USD.

:Attaching Claimable Tokens
Any ERC20 token can be attached to a card. A claim code for that card will then be generated and
returned to the person that attached the claim. Sending the claim code to anyone will allow them
to claim that token into their etheruem account.
- Requires adding addresses or allowing users to input the addresses of ERC20 tokens
- Chainlink VRF will be requires to generate a random 
- Key is hashed with user's address that created the claim
- Creating a claim and creating an NFT are separate events but can be executed at the same time
https://stackoverflow.com/questions/68717362/aes-decryption-in-solidity-contract
- Alternate, key is generated on user's end, then that key is hashed, the hash is stored in contract.
- User sends the key to 

:Use of bonding curve
- requires kyc
- 

#### Sign On Verification

- Users will be able to claim free tokens on signup. A mechanism must be devised in order to pervent
users from creating new ethereum addresses to continuously claim more tokens.
- Verification can have 2 parameters. One is the ethereum address and another is an email address.
- An email verification link will be sent on signup.

This is the proposed idea and not necessarily possible in a decentralized manner.

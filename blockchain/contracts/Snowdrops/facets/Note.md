# Note on the current state of this folder.

This is where most of the business logic for the tokens will exist.
Certain aspects of Aavegotchi's contracts have been ported over to keep as references when
building out the functionality of the Snowdrops token in combiation with the Items Token.
The buying, selling and distribution of these tokens has yet to be fully determined.

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


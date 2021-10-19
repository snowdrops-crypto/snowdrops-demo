# Aavegotchi Contracts Breakdown

[Aavegotchi Contracts Repo](https://github.com/aavegotchi/aavegotchi-contracts)

This purpose of this document is to break-down Aavegotchi's implementation of ERC-721, ERC-20 and ERC-2535. The reason why I have chose to focus on Aavegotchi's smart contract
implementation is because of their use of the Diamonds Multi-Facet Proxy in conjunciton with their implemenation of an ERC-20 and ERC-721 token. They are also using ERC-1155 in order to tokenize items such as accessories. These are not unique tokens but still hold the same some of the same properties as an ERC-721 token.


# Snowdrops Brainstorm

This document is created to list ideas that come to mind about the implementation of Snowdrops.

#### Solidity vs Smart Weave
[Smartweave Article](https://arweave.medium.com/introducing-smartweave-building-smart-contracts-with-arweave-1fc85cb3b632#:~:text=Smart%20contract%20interactions%20are%20placed,verified%20by%20users%20during%20interaction.&text=Instead%2C%20developers%20are%20given%20the,participate%20in%20the%20contract%20execution.)
[SmartWeave Repo](https://github.com/ArweaveTeam/SmartWeave)

:: Should I use Arweave Smart Contracts instead of Solidity?

Traditional: Every node executes a smart contract operation
SmartWeave's: "Lazy Evaluation" computation is pushed to the users of the smart contract
- The user evaluates each prior transaction on the Dapp until they reach the end of the chain of valide state transitions.
- This eliminates the need for GAS
- Enables heavy computations


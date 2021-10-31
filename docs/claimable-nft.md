# Claimable NFT

- One of the key functionalities of this application is to allow users to claim an NFT using a key generated by the original owner of the NFT
- In order to acheive this, security precautions need to be taken into consideration.

#### Possible Attacks
- Bad actor monitors transactions and retrieves sensitive information being sent from the user to the blockchain. Then uses that information to claim ownership over an NFT.
- FrontRunner: A user receives a claim key off-chain from the owner of the NFT. When the claimee attempts to claim ownership of the NFT using the claim code, a front runner
  uses a higher gas fee to essentially cut in line so that their transaction is sent before the claimee transaction. They may also be looking at the pending transaction sent
  from the claimee and may use the key sent in their transaction.

Securing against the first case.
- When a key is generated on the clients end, that key is hashed then sent to the contract.
- When a claimee sends the original key to the contract, that key is first hashed then equated to the original hash to verify.

Securing against the second case.
- A commit-reveal scheme can be used to prevent against frontrunner.
- There are two functions within a contract that a claimee must call in order to claim an NFT
- The first call sets the claimee's address as the only address that is verified to send a claim code.
  - *What if someone monitors for NFTs set to claimable and sends a request to lock the claim to their address?
    - If the second function to claim the NFT is not called within X number of blocks, then the claim address resets.
    - When the claimee then calls the first function they will receive a notification that on whether their address is set, or if the claim is still locked to a different address.
    - Since the bad actor does not have the key to claim the NFT they will never be able to get past the first function.
  - *What if the bad actor repeatedly calls the first function?
    - After X number of attempts from the the same address, lock-out that address.
    - Bad actor will avoid continually calling the set function due to gas fee.
      - However! If there is a gas fee to claiming a token then the claimee may not be able to claim the token without first having (eth/matic) in their wallet.
      - This is mitigated by first signing up and receiving free tokens.
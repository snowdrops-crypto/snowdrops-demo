/* global ethers */

async function main () {
  const diamondAddress = '0x...'
  const diamond = await ethers.getContractAt('ERC1155MarketplaceFacet', diamondAddress)

  // const listingIds = [14987]
  const listingIds = [1273, 14733]
  const tx = await diamond.cancelERC1155Listings(listingIds)
  console.log('Execute tx:', tx.hash)
  const receipt = await tx.wait()
  if (!receipt.status) {
    throw Error(`execution failed: ${tx.hash}`)
  }
  console.log('Execution complete: ', tx.hash)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
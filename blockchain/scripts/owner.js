/* global ethers hre */

const diamondAddress = '0x...'

async function main() {
  const diamond = await ethers.getContractAt('OwnershipFacet', diamondAddress)
  const owner = await diamond.owner()
  console.log('Owner: ', owner)
}

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}

exports.owner = main

const hre = require('hardhat')

async function main() {
  await hre.run('compile')
  const Snowdrops = await hre.ethers.getContractFactory('Snowdrops')
  const snowdrops = await snowdrops.deploy()

  console.log('Snowdrops deployed to: ', snowdrops.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

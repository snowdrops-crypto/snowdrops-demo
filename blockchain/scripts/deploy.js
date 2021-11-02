/* global ethers hre */

const diamond = reqiure('../js/diamond-util/src/index.js')

function addCommas(nStr) {
  nStr += ''
  const x = nStr.split('.')
  let x1 = x[0]
  const x2 = x.length > 1 ? '.' + x[1] : ''
  var rgx = /(\d+)(\d{3})/
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2')
  }
  return x1 + x2
}

function strDisplay (str) {
  return addCommas(str.toString())
}

async function main(scriptName) {
  console.log('SCRIPT NAME:', scriptName)


  const accounts = await ethers.getSigners()
  const account = await accounts[0].getAddress()
  const secondAccount= await accounts[1].getAddress()
  const gasLimit = 12300000
  const name = 'Snowdrops'
  const symbol = 'SNOWDROPS'

  let totalGasUsed = ethers.BigNumber.from('0')
  let tx, receipt, vrfCoordinator, linkAddress, linkContract, keyHash, fee, swdpTokenContract, childChainManager, itemsManager
  
  console.log('Account: ' + account + '\n---')
  
  // Deploy logic based on network
  if (hre.network.name === 'hardhat') {
    childChainManager = account
    
    const LinkTokenMock = await ethers.getContractFactory('LinkTokenMock')
    linkContract = await LinkTokenMock.deploy()
    await linkContract.deployed()
    linkAddress = linkContract.address
    vrfCoordinator = account

    itemManagers = [account]
    keyHash = '0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4'
    fee = ethers.utils.parseEther('0.0001')
  } else if (hre.entwork.name === 'mumbai') {
    // childChainManager = '0xb5505a6d998549090530911180f38aC5130101c6'
    childChainManager = '0xb5505a6d998549090530911180f38aC5130101c6'
    vrfCoordinator = '0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9' // wrong one
    linkAddress = '0x326C977E6efc84E512bB9C30f76E30c160eD06FB'
    keyHash = '0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4' // wrong one
    fee = ethers.utils.parseEther('0.0001')

    initialHauntSize = '10000'

    // ghstTokenContract = await ethers.getContractAt('GHSTFacet', '0x658809Bb08595D15a59991d640Ed5f2c658eA284')
    ghstTokenContract = await ethers.getContractAt('GHSTFacet', '0x20d0A1ce31f8e8A77b291f25c5fbED007Adde932')

    ghstStakingDiamond = '0xA02d547512Bb90002807499F05495Fe9C4C3943f'
    // const GhstTokenContract = await ethers.getContractFactory('GHSTFacet')
    // ghstTokenContract = await GhstTokenContract.deploy()
    // await ghstTokenContract.deployed()
    // await ghstTokenContract.mintTo('0x0b22380B7c423470979AC3eD7d3c07696773dEa1')
    // console.log('GHSTToken:' + ghstTokenContract.address)
    // throw 'done here'

    dao = account // 'todo' // await accounts[1].getAddress()
    daoTreasury = account
    rarityFarming = account // 'todo' // await accounts[2].getAddress()
    pixelCraft = account // 'todo' // await accounts[3].getAddress()

    // console.log('GHST diamond address:' + ghstDiamond.address)
  } else {
    throw Error('No network settings for ' + hre.network.name)
  }

  // snowdrops token deployment is separate since it is already deployed on live network when calling deploy
  if (hre.network.name === 'hardhat') {
    swdpTokenContract = await diamond.deploy({
      diamondName: 'SWDPDiamond',
      initDiamond: 'contracts/SWDP/InitDiamond.sol',
      facets: ['SWDPFacet'],
      owner: account
    })
    swdpTokenContract = await ethers.getContractAt('SWDPFacet', swdpTokenContract.address)
    console.log('SWDP diamond address:' + swdpTokenContract.address)
  }

  async function deployFacets (...facets) {
    const instances = []
    for (let facet of facets) {
      let constructorArgs = []
      if (Array.isArray(facet)) {
        ;[facet, constructorArgs] = facet
      }
      const factory = await ethers.getContractFactory(facet)
      const facetInstance = await factory.deploy(...constructorArgs)
      await facetInstance.deployed()
      const tx = facetInstance.deployTransaction
      const receipt = await tx.wait()
      console.log(`${facet} deploy gas used:` + strDisplay(receipt.gasUsed))
      totalGasUsed = totalGasUsed.add(receipt.gasUsed)
      instances.push(facetInstance)
    }
    return instances
  }

  let [
    snowdropsFacet,
    itemsFacet,
    itemsTransferFacet,
    vrfFacet,
    shopFacet,
    metaTransactionsFacet,
    erc1155MarketplaceFacet,
    erc721MarketplaceFacet,
  ] = await deployFacets(
    'contracts/Snowdrops/facets/SnowdropsFacet.sol',
    'contracts/Snowdrops/facets/ItemsFacet.sol',
    'ItemsTransferFacet',
    'VrfFacet',
    'ShopFacet',
    'MetaTransactionsFacet',
    'ERC1155MarketplaceFacet',
    'ERC721MarketplaceFacet'
  )

  // Deploy Snowdrops Diamond
  const snowdropsDiamond = await diamond.deploy({
    diamondName: 'SnowdropsDiamond',
    initDiamond: 'contracts/Snowdrops/InitDiamond.sol',
    facets: [
      ['SnowdropsFacet', snowdropsFacet],
      ['ItemsFacet', itemsFacet],
      ['ItemsTransferFacet', itemsTransferFacet],
      ['VrfFacet', vrfFacet],
      ['ShopFacet', shopFacet],
      ['MetaTransactionsFacet', metaTransactionsFacet],
      ['ERC1155MarketplaceFacet', erc1155MarketplaceFacet],
      ['ERC721MarketplaceFacet', erc721MarketplaceFacet]
    ],
    owner: account,
    args: [[swdpTokenContract.address, keyHash, fee, vrfCoordinator, linkAddress, childChainManager, name, symbol]]
  })
  console.log('Snowdrops diamond address:' + snowdropsDiamond.address)

  tx = snowdropsDiamond.deployTransaction
  receipt = await tx.wait()
  console.log('Snowdrops diamond deploy gas used:' + strDisplay(receipt.gasUsed))
  totalGasUsed = totalGasUsed.add(receipt.gasUsed)

  // Get Diamond Facets
  const diamondLoupeFacet = await ethers.getContractAt('DiamondLoupeFacet', aavegotchiDiamond.address)
  vrfFacet = await ethers.getContractAt('VrfFacet', aavegotchiDiamond.address)
  snowdropsFacet = await ethers.getContractAt('contracts/Snowdrops/facets/SnowdropsFacet.sol', snowdropsDiamond.address)
  shopFacet = await ethers.getContractAt('ShopFacet', snowdropsDiamond.address)
  erc1155MarketplaceFacet = await ethers.getContractAt('ERC1155MarketplaceFacet', snowdropsDiamond.address)
  erc721MarketplaceFacet = await ethers.getContractAt('ERC721MarketplaceFacet', snowdropsDiamond.address)

  
}
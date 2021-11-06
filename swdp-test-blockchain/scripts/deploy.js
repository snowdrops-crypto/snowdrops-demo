/* global ethers hre */
/* eslint prefer-const: "off" */
const diamondUtils = require('./diamond-util/src/index')
const { getSelectors, FacetCutAction } = require('./libraries/diamond.js')

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

async function deployProject() {
  let tx, receipt, keyHash, fee, swdpTokenContract
  const accounts = await ethers.getSigners()
  const contractOwner = accounts[0]
  const secondAccount = accounts[1]

  let totalGasUsed = ethers.BigNumber.from('0')
  const gasLimit = 12300000
  const name = 'Snowdrops'
  const symbol = 'SNOWDROPS'

  console.log('Account: ' + contractOwner.address + '\n---')

  swdpTokenContract = await diamondUtils.deploy({
    diamondName: 'SWDPDiamond',
    initDiamond: 'InitDiamond',
    facets: ['SWDPFacet'],
    owner: contractOwner.address,
    args: []
  })

  swdpTokenContract = await ethers.getContractAt('SWDPFacet', swdpTokenContract.address)
  console.log('SWDP diamond address:' + swdpTokenContract.address)

  const diamondLoupeFacet = await ethers.getContractAt('DiamondLoupeFacet', swdpTokenContract.address)

  return {
    account: contractOwner.address,
    diamondLoupeFacet: diamondLoupeFacet,
    swdpTokenContract: swdpTokenContract
  }
}

if (require.main === module) {
  deployProject()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error)
      process.exit(1)
    })
}

exports.deployProject = deployProject

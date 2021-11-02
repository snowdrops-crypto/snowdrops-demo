/* global describe it before ethers */
const { expect } = require('chai')

const { deployProject } = require('../scripts/deploy.js')

describe('Deploying contracts, SVG and Minting Items', async () => {
  before(async () => {
    this.timeout(100000)
    const deployVars = await deployProject('deployTest')
    global.set = true
    global.account = deployVars.account
    global.aavegotchiDiamond = deployVars.aavegotchiDiamond
    global.aavegotchiFacet = deployVars.aavegotchiFacet
    global.itemsFacet = deployVars.itemsFacet
    global.itemsTransferFacet = deployVars.itemsTransferFacet
    global.shopFacet = deployVars.shopFacet
    global.swdpTokenContract = deployVars.swdpTokenContract
    global.vrfFacet = deployVars.vrfFacet
    global.svgFacet = deployVars.svgFacet
    global.linkAddress = deployVars.linkAddress
    global.linkContract = deployVars.linkContract
    global.vouchersContract = deployVars.vouchersContract
    global.diamondLoupeFacet = deployVars.diamondLoupeFacet
    global.metaTransactionsFacet = deployVars.metaTransactionsFacet
    global.erc1155MarketplaceFacet = deployVars.erc1155MarketplaceFacet
    global.erc721MarketplaceFacet = deployVars.erc721MarketplaceFacet
  })
  it('Should mint 10,000,000 SWDP tokens', async () => {
    await global.swdpTokenContract.mint()
    const balance = await global.swdpTokenContract.balanceOf(global.account)
    const tenMillion = ethers.utils.parseEther('10000000')
    expect(balance).to.equal(tenMillion)
  })
})

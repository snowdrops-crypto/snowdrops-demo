/* global describe it before ethers */
const { expect } = require('chai')
const truffleAssert = require('truffle-assertions')

const { deployProject } = require('../scripts/deploy.js')

describe('Deploying Contracts, SVG and Minting Items', async () => {
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
    global.linkAddress = deployVars.linkAddress
    global.linkContract = deployVars.linkContract
    global.diamondLoupeFacet = deployVars.diamondLoupeFacet
    global.metaTransactionsFacet = deployVars.metaTransactionsFacet
    global.erc1155MarketplaceFacet = deployVars.erc1155MarketplaceFacet
  })
  it('Should mint 10,000,000 SWDP tokens', async () => { // OK
    await global.swdpTokenContract.mint()
    const balance = await global.swdpTokenContract.balanceOf(global.account)
    const tenMillion = ethers.utils.parseEther('10000000')
    expect(balance).to.equal(tenMillion)
  })
  it('Should purchase items with SWDP tokens', () => { // !OK 
    const balance = await swdpTokenContract.balanceOf(account)
    await swdpTokenContract.approve(snowdropsDiamond.address, balance)

    let balances = await global.itemsFacet.itemBalance(account)
    expect(balances[114]).to.equal(0)

    // (address to, itemIds[], itemQuantities[]
    await global.shopFacet.purchaseItemsWithSWDP(account, ['114', '115', '116', '126', '127', '128', '129'], ['10', '10', '10', '100', '10', '10', '10'])
    balances = await global.itemsFacet.itemBalances(account)

    console.log('balances:', balances[129].toString())
    expect(balances[129]).to.equal(10)
  })
})
describe('Marketplace functionality', () => {
  it('should list an item', async () => {

  })
  it('should execute an order to buy and reduce quantity by 1', () => {

  })
  it('Should modify the listing price', async () => {

  })
})

describe('Fees', async function () {
  it('Can update listing fee', async function () {

  })

  it('Listing fee is burned', async function () {

  })

  it('Pixelcraft receives ')
})
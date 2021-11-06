/* global describe it before ethers */

const { expect } = require('chai')
const { deployProject } = require('../scripts/deploy')

describe('Deploying Contracts, SVG and Minting Aavegotchis', async () => {
  before(async () => {
    const deployVars = await deployProject('deployTest')
    global.set = true
    global.account = deployVars.account
    global.swdpTokenContract = deployVars.swdpTokenContract
    global.diamondLoupeFacet = deployVars.diamondLoupeFacet
  })
  it('Should mint 10,000,000 SWDP tokens', async () => {
    await global.swdpTokenContract.mint()
    const balance = await global.swdpTokenContract.balanceOf(global.account)
    const oneMillion = ethers.utils.parseEther('10000000')
    expect(balance).to.equal(oneMillion)
  })
})
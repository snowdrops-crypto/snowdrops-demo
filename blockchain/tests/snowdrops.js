const { expect } = require('chai')
require("@nomiclabs/hardhat-waffle")

let Snowdrops, snowdrops

describe('Snowdrops', () => {
  before(async () => {
    const [owner] = await hre.ethers.getSigners()
    
    Snowdrops = await hre.ethers.getContractFactory('Snowdrops')
    snowdrops = await Snowdrops.deploy()

    console.log(snowdrops.address)
  })
  it('should set a value and return that value', async () => {
    
    const tx = await snowdrops.store(10)
    const storeTx = await tx.wait()
    const eventTx = storeTx.events?.filter((x) => {return x.event == "ValueChanged"})
    console.log(eventTx)

    expect(await snowdrops.retrieve()).to.equal(10)
  })
})
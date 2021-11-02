export const gasPrice = 100000000000;

export async function impersonate(
  address,
  contract,
  ethers,
  network
) {
  await network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [address],
  })
  let signer = await ethers.getSigner(address)
  contract = contract.connect(signer)
  return contract
}

export async function resetChain(hre) {
  await hre.network.provider.request({
    method: "hardhat_reset",
    params: [
      {
        forking: {
          jsonRpcUrl: process.env.MATIC_URL,
        },
      },
    ],
  })
}

export function getSighashes(selectors, ethers) {
  if (selectors.length === 0) return []
  const sighashes = []
  selectors.forEach((selector) => {
    if (selector !== "") sighashes.push(getSelector(selector, ethers))
  })
  return sighashes
}

export function getSelectors(contract) {
  const signatures = Object.keys(contract.interface.functions)
  const selectors = signatures.reduce((acc, val) => {
    if (val !== "init(bytes)") {
      acc.push(contract.interface.getSighash(val))
    }
    return acc
  }, []);
  return selectors
}

export function getSelector(func, ethers) {
  const abiInterface = new ethers.utils.Interface([func])
  return abiInterface.getSighash(ethers.utils.Fragment.from(func))
}

export const maticDiamondAddress = "0x86935F11C86623deC8a25696E1C19a8659CbF95d"
export const itemManager = "0xa370f2ADd2A9Fba8759147995d6A0641F8d7C119"
export const gameManager = "0xa370f2ADd2A9Fba8759147995d6A0641F8d7C119"
export const maticRealmDiamondAddress = "0x1D0360BaC7299C86Ec8E99d0c1C9A95FEfaF2a11"

export async function diamondOwner(address, ethers) {
  return await (await ethers.getContractAt("OwnershipFacet", address)).owner()
}

export async function getFunctionsForFacet(facetAddress, ethers) {
  const Loupe = (await ethers.getContractAt(
    "DiamondLoupeFacet",
    maticDiamondAddress
  ))
  const functions = await Loupe.facetFunctionSelectors(facetAddress)
  return functions
}

export async function getDiamondSigner(
  hre,
  override,
  useLedger
) {
  //Instantiate the Signer
  let signer;
  const owner = await (
    (await hre.ethers.getContractAt(
      "OwnershipFacet",
      maticDiamondAddress
    ))
  ).owner()
  const testing = ["hardhat", "localhost"].includes(hre.network.name);

  if (testing) {
    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [override ? override : owner],
    });
    return await hre.ethers.getSigner(override ? override : owner)
  } else if (hre.network.name === "matic") {
    return (await hre.ethers.getSigners())[0]
  } else {
    throw Error("Incorrect network selected")
  }
}

export function addCommas(nStr) {
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

export function strDisplay (str) {
  return addCommas(str.toString())
}

export function sixteenBitArrayToUint (array) {
  const uint = []
  for (let item of array) {
    if (typeof item === 'string') {
      item = parseInt(item)
    }
    uint.unshift(item.toString(16).padStart(4, '0'))
  }
  if (array.length > 0) return ethers.BigNumber.from('0x' + uint.join(''))
  return ethers.BigNumber.from(0)
}

export function eightBitIntArrayToUint (array) {
  if (array.length === 0) {
    return ethers.BigNumber.from(0)
  }
  const uint = []
  for (const num of array) {
    if (num > 127) {
      throw (Error('Value beyond signed 8 int '))
    }
    const value = ethers.BigNumber.from(num).toTwos(8)
    uint.unshift(value.toHexString().slice(2))
  }
  return ethers.BigNumber.from('0x' + uint.join(''))
}

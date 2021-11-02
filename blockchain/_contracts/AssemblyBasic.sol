pragma solidity =0.8.7;

contract AssemblyBasic {
  function addition(uint x, uint y) public pure returns (uint) {
    assembly {
      let z := add(keccak256(0x0, 0x20), div(64, 32))
      let s := "The max character count is 32"
      let result := add(x, y)
      mstore(0x0, result)
      return(0x0, 32)
    }
  }

  function scopes() public pure returns (uint) { 
    assembly {
      let x := 3
      {
        let y := x
      }

      let v := 0
      let t := 0

      // Example of a while loop
      for { } lt(v, 0x100) {} {
        t := add(t, mload(v))
      }

      // Example of a for loop
      for { let i := 0 } lt(i, 5) { i := add(i, 1) } {
        t := mul(2, t)
      }
      mstore(0x0, t)
      return(0x0, 32)
    }
  }
}
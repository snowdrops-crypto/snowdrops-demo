// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Snowdrops {
  string name = "Snowdrops";
  string symbol = "SNOW";
  string description = "NFT greeting cards.";
  uint public totalSupply = 100000;
  address public owner;
  mapping(address => uint) balances;

  uint value;

  event ValueChanged(uint newValue);

  function store(uint newValue) public {
    value = newValue;
    emit ValueChanged(newValue);
  }

  // view (constant) indicates that the function will not alter the storage state in any way.
  // results in faster returns

  // Example of defined variable being set to return at the end of the function
  function retrieve() public view returns (uint nval) {
    nval = value;
  }

  function sellers() public payable returns (uint addrBal) {
    addrBal = address(this).balance;
  }
}


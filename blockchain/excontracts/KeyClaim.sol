// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Keyed {
  address owner;
  bytes32 key;

  constructor() {
    owner = msg.sender;
  }

  function createClaim(string calldata _hash) external {
    key = keccak256(abi.encodePacked(_hash));
  }

  function verifyKey(string calldata _hash) external view returns(bool verified) {
    return keccak256(abi.encodePacked(_hash)) == key;
  }
}

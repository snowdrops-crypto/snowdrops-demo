// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

struct AppStorage {
  address contractOwner;
  uint96 totalSupply;
  address[] approvedContracts;
  mapping(address => mapping(address => uint256)) allowances;
  mapping(address => uint256) balances;
  mapping(address => uint256) approvedContractIndexes;
}

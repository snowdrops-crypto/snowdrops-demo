pragma solidity 0.8.4;

import {AppStorage} from "./libraries/LibAppStorage.sol";

contract InitDiamond {
  struct Args {
    string name;
    string symbol;
  }

  function init(Args memory _args) external {

  }
}
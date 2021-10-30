// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import {AppStorage} from "./libraries/LibAppStorage.sol";

struct Args {
  address swdpContract;
  address linkAddress;
  address childChainManager;
  string name;
  string symbol;
}

contract InitDiamond {
  AppStorage internal s;
}

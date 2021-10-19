// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import {AppStorage} from "./libraries/LibAppStorage.sol";

struct Args {
  string name;
  string symbol;
}

contract InitDiamond {
  AppStorage internal s;
}
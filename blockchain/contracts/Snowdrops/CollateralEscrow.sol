// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import {IERC20} from "../shared/interfaces/IERC20.sol";
import {LibMeta} from "../shared/libraries/LibMeta.sol";

contract CollateralEscrow {
    struct AppStorage {
        address owner;
    }
    AppStorage internal s;

    constructor(address _aTokenContract) {
        s.owner = LibMeta.msgSender();
        approveSnowdropsDiamond(_aTokenContract);
    }

    function approveSnowdropsDiamond(address _aTokenContract) public {
        require(LibMeta.msgSender() == s.owner, "CollateralEscrow: Not owner of contract");
        require(IERC20(_aTokenContract).approve(s.owner, type(uint256).max), "CollateralEscrow: token not approved for transfer");
    }
}
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import {LudoWhiz} from "../src/LudoWhiz.sol";

contract DeployLudoWhiz is Script {
    function setUp() public {}

    function run() external returns (LudoWhiz) {
        vm.startBroadcast();
        LudoWhiz ludoWhiz = new LudoWhiz();
        vm.stopBroadcast();

        return ludoWhiz;
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./MyTokenV1.sol";

contract MyTokenV2 is MyTokenV1 {
    string public tokenNameV2;

    function initializeV2(string memory newName) public reinitializer(2) {
        tokenNameV2 = newName;
    }

    function version() public pure returns (string memory) {
        return "V2";
    }
}

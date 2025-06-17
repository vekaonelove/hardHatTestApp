// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Greeting {
    string private name;

    constructor(string memory _name) {
        name = _name;
    }

    function greet() public view returns (string memory) {
        return string(abi.encodePacked("Hello, ", name, "!"));
    }
}
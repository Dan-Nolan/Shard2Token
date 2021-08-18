// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SH2Token is ERC20 {
    constructor(uint256 initialSupply) ERC20("Shard2", "SH2") {
        _mint(msg.sender, initialSupply);
    }
}

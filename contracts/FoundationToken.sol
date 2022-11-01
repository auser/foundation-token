// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FoundationToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("FoundationToken", "ZFT") {
        _mint(msg.sender, initialSupply);
    }
}

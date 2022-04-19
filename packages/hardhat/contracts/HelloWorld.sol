// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.13;

contract HelloWorld {

    //Events
    event Message(string message);
    //------

    constructor() {}

    function hello() external {
        emit Message("Hello World!");
    }
}
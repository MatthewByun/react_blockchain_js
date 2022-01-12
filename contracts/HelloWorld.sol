// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract HelloWorld {
    uint256 public count = 0; // state variable

    struct Contact {
        uint256 id;
        string name;
        string phone;
    }

    event ContactCreated(uint256 id, string name, string phone);

    constructor() {
        createContact("Zafar Saleem", "123123123");
    }

    mapping(uint256 => Contact) public contacts;

    function createContact(string memory _name, string memory _phone) public {
        count++;
        contacts[count] = Contact(count, _name, _phone);
        emit ContactCreated(count, _name, _phone);
    }
}

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract TestContract {
    string public message;

    struct Collection {
        uint id;
        string name;
    }

    Collection[] public collections;

    constructor(string memory initialMessage) {
        message = initialMessage;
    }
    
    function setMessage(string memory newMessage) public {
        message = newMessage;
    }

    function addCollection(uint id, string memory name) public {
       Collection memory newCollection = Collection({
            id:id,
            name:name
        });
       collections.push(newCollection);
    }

    function getCollection() public view returns ( Collection[] memory) {
        return collections;
    }

}


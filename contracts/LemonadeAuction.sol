pragma solidity ^0.4.24;

import "./LemonadeToken.sol";

contract LemonadeAuction is LemonadeToken {

    struct Auction {
        address seller;
        uint128 price;
    }

    mapping (uint256 => Auction) public lemonadeIdToAuction;

    function createAuction( uint256 _lemonadeId, uint128 _price ) public {
        require(ownerOf(_lemonadeId) == msg.sender, "You must own the lemonade to sell it.");
        Auction memory _auction = Auction({
            seller: msg.sender,
            price: uint128(_price)
        });
        lemonadeIdToAuction[_lemonadeId] = _auction;
    }

    function bid( uint256 _lemonadeId ) public payable {
        Auction memory auction = lemonadeIdToAuction[_lemonadeId];
        require(auction.seller != address(0), "Can't bid on your own Lemonade");
        require(msg.value >= auction.price, "Bid is to low");

        address seller = auction.seller;
        uint128 price = auction.price;

        delete lemonadeIdToAuction[_lemonadeId];

        seller.transfer(price);
        emit Transfer(seller, msg.sender, _lemonadeId);
    }

    function cancel( uint256 _lemonadeId ) public {
        Auction memory auction = lemonadeIdToAuction[_lemonadeId];
        require(auction.seller == msg.sender, "Only owner can cancel");

        delete lemonadeIdToAuction[_lemonadeId];
    }
}
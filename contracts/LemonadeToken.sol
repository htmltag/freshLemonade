pragma solidity ^0.4.24;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract LemonadeToken is ERC721, Ownable {
    string public constant name = "LemonadeToken";
    string public constant symbol = "LEMT";

    struct Lemonade {
        string name;
        uint8 ingredients; //0-255: water, sugar, lemon
    }

    Lemonade[] public lemonades;

    //Creates a new Lemonade. Only owner is allowed to create new lemonades.
    function mint(string _name, uint8 _ingredients) public onlyOwner{
        Lemonade memory _lemonade = Lemonade({ name: _name, ingredients: _ingredients });
        uint _lemonadeId = lemonades.push(_lemonade) - 1;

        _mint(msg.sender, _lemonadeId);
    }

    //Returns the requested lemonade by id.
    function getLemonade( uint _lemonadeId ) public view returns(string lemonadename, uint8 ingredients){
        Lemonade memory _lem = lemonades[_lemonadeId];

        lemonadename = _lem.name;
        ingredients = _lem.ingredients;
    }
}


pragma solidity ^0.4.0;


contract Register {

    address public owner;
    mapping(bytes32 => address) ai;

    function Register(){
        owner = msg.sender;
    }

    modifier onlyAdmin() {
        if(msg.sender == owner) _;
    }

    function register(bytes32 AI_id, address price_addr) onlyAdmin {
        ai[AI_id] = price_addr;
    }

    function get_price_addr(bytes32 AI_id) constant returns (address) {
        return ai[AI_id];
    }

    function deleteAI(bytes32 AI_id) onlyAdmin {
        delete ai[AI_id];
    }

    function set_price_addr(bytes32 AI_id, address price_addr) onlyAdmin {
        ai[AI_id] = price_addr;
    }

    function isRegistered(bytes32 AI_id) onlyAdmin constant returns (bool){
        if(ai[AI_id] == 0x0000000000000000000000000000000000000000)return false;
        return true;
    }

}

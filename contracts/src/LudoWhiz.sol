// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract LudoWhiz {
    /** Error codes */
    error LudoWhiz__WrongUserToFinishGame();

    /** Type declarations */
    struct Game {
        bytes32 gameId;
        address player;
        uint256 gameAmount;
        uint256 playerAmount;
    }

    /** State variables */
    address private immutable i_whiz;

    uint256 private s_whizBalance;
    mapping(bytes32 => Game) private s_games;

    /** Events */
    event GameInitialized(
        bytes32 indexed gameId,
        address indexed player,
        uint256 gameAmount,
        uint256 playerAmount
    );

    event GameFinished(bytes32 indexed gameId, Game game);

    /** Modifiers */
    modifier onlyWhiz() {
        require(msg.sender == i_whiz, "Only Whiz can do this!");
        _;
    }

    constructor() {
        i_whiz = msg.sender;
    }

    /** Functions */
    function generateRandomId() public view returns (bytes32) {
        bytes32 hash = keccak256(abi.encodePacked(block.timestamp, msg.sender));
        return hash;
    }

    function initializeGame() public payable {
        uint256 playerAmount = msg.value;
        uint256 gameAmount = playerAmount * 2;
        s_whizBalance -= playerAmount;
        bytes32 gameId = generateRandomId();
        Game memory game = Game(gameId, msg.sender, gameAmount, playerAmount);
        s_games[gameId] = game;
        emit GameInitialized(
            game.gameId,
            game.player,
            gameAmount,
            playerAmount
        );
    }

    function finishGame(uint256 playerAmount, bytes32 gameId) public {
        Game memory currentGame = s_games[gameId];
        if (currentGame.player != msg.sender) {
            revert LudoWhiz__WrongUserToFinishGame();
        }
        uint256 remainingAmount = currentGame.gameAmount - playerAmount;
        payable(msg.sender).transfer(playerAmount);
        s_whizBalance += remainingAmount;
        emit GameFinished(gameId, currentGame);
        delete currentGame;
    }

    function withdrawwhizBalance() public onlyWhiz {
        payable(i_whiz).transfer(s_whizBalance);
        s_whizBalance = 0;
    }

    function fundWhiz() public payable {
        uint256 amount = msg.value;
        s_whizBalance += amount;
    }

    /** Getters */
    function getWhizAddress() public view returns (address) {
        return i_whiz;
    }

    function getWhizBalance() public view returns (uint256) {
        return s_whizBalance;
    }

    function getGame(bytes32 gameId) public view returns (Game memory) {
        return s_games[gameId];
    }
}

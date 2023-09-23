// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {LudoWhiz} from "../src/LudoWhiz.sol";
import {DeployLudoWhiz} from "../script/DeployLudoWhiz.s.sol";

contract LudoWhizTest is Test {
    LudoWhiz ludoWhiz;

    address public PLAYER = makeAddr("player");
    address public ANOTHER = makeAddr("another");
    uint256 public constant PLAYER_BALANCE = 100 ether;
    uint256 public constant FUNDING_BALANCE = 20 ether;
    uint256 public constant GAME_INIT_AMOUNT = 10 ether;
    uint256 public constant LOSS_GAME_FINISH_AMOUNT = 5 ether;
    uint256 public constant WIN_GAME_FINISH_AMOUNT = 15 ether;

    event GameInitialized(
        bytes32 indexed gameId,
        address indexed player,
        uint256 gameAmount,
        uint256 playerAmount
    );

    event GameFinished(bytes32 indexed gameId, LudoWhiz.Game game);

    function setUp() public {
        DeployLudoWhiz deployLudoWhiz = new DeployLudoWhiz();
        ludoWhiz = deployLudoWhiz.run();
        vm.deal(PLAYER, PLAYER_BALANCE);
        vm.deal(ANOTHER, PLAYER_BALANCE);
    }

    function _helperConvertBalanceToEth(
        uint256 balance
    ) public pure returns (uint256) {
        if (balance == 0) return 0;
        return balance / 10 ** 18;
    }

    function _helperShowPlayerBalance() public view {
        uint256 playerBalance = address(PLAYER).balance;
        console.log(
            "PLAYER balance: ",
            _helperConvertBalanceToEth(playerBalance)
        );
    }

    function _helperShowWhizBalance(uint256 whizBalance) public view {
        console.log("Whiz balance: ", _helperConvertBalanceToEth(whizBalance));
    }

    function _helperShowBothBalance() public view {
        uint256 whizBalance = ludoWhiz.getWhizBalance();
        _helperShowWhizBalance(whizBalance);
        _helperShowPlayerBalance();
    }

    function _helperFundWhiz() public {
        ludoWhiz.fundWhiz{value: FUNDING_BALANCE}();
        uint256 whizBalance = ludoWhiz.getWhizBalance();
        _helperShowWhizBalance(whizBalance);
        _helperShowPlayerBalance();
    }

    function _helperInitializeGame(bytes32 gameId) public {
        vm.expectEmit(true, true, false, true);
        emit GameInitialized(
            gameId,
            address(PLAYER),
            GAME_INIT_AMOUNT * 2,
            GAME_INIT_AMOUNT
        );
        ludoWhiz.initializeGame{value: GAME_INIT_AMOUNT}();
    }

    function _helperFinishGame(
        bytes32 gameId,
        uint256 amount,
        address sender
    ) public {
        LudoWhiz.Game memory game = ludoWhiz.getGame(gameId);
        console.log(
            "Game player amount: ",
            _helperConvertBalanceToEth(game.playerAmount)
        );
        console.log(
            "Game amount: ",
            _helperConvertBalanceToEth(game.gameAmount)
        );
        console.log("Game player: ", game.player);
        console.log("Message sender: ", address(sender));
        uint256 whizBalance = ludoWhiz.getWhizBalance();
        _helperShowWhizBalance(whizBalance);
        _helperShowPlayerBalance();

        if (game.player == address(sender)) {
            vm.expectEmit(true, false, false, true);
            emit GameFinished(game.gameId, game);
        } else {
            vm.expectRevert(LudoWhiz.LudoWhiz__WrongUserToFinishGame.selector);
        }
        ludoWhiz.finishGame(amount, game.gameId);
    }

    function testWhizInitialBalance() public {
        uint256 whizBalance = ludoWhiz.getWhizBalance();
        _helperShowWhizBalance(whizBalance);
        assertTrue(whizBalance == 0, "Whiz balance should be 0");
    }

    function testFundWhizByAnyone() public {
        uint256 whizBalance = ludoWhiz.getWhizBalance();
        _helperShowWhizBalance(whizBalance);
        ludoWhiz.fundWhiz{value: FUNDING_BALANCE}();
        whizBalance = ludoWhiz.getWhizBalance();
        _helperShowWhizBalance(whizBalance);
        assertTrue(whizBalance == FUNDING_BALANCE, "Wrong Whiz balance");
    }

    function testFundWhizByPlayer() public {
        _helperShowBothBalance();
        vm.prank(PLAYER);
        ludoWhiz.fundWhiz{value: FUNDING_BALANCE}();
        uint256 whizBalance = ludoWhiz.getWhizBalance();
        _helperShowBothBalance();
        assertTrue(whizBalance == FUNDING_BALANCE, "Wrong Whiz balance");
    }

    function testInitializeGame() public {
        _helperShowBothBalance();

        vm.startPrank(PLAYER);

        _helperFundWhiz();

        bytes32 gameId = ludoWhiz.generateRandomId();

        _helperInitializeGame(gameId);

        vm.stopPrank();

        _helperShowBothBalance();

        uint256 whizBalance = ludoWhiz.getWhizBalance();
        assertTrue(
            whizBalance == (FUNDING_BALANCE - GAME_INIT_AMOUNT),
            "Wrong Whiz balance"
        );
        assertTrue(
            address(PLAYER).balance ==
                (PLAYER_BALANCE - FUNDING_BALANCE - GAME_INIT_AMOUNT),
            "Wrong player balance"
        );
    }

    function testFinishLoosingGame() public {
        _helperShowBothBalance();

        vm.startPrank(PLAYER);

        _helperFundWhiz();

        bytes32 gameId = ludoWhiz.generateRandomId();

        _helperInitializeGame(gameId);

        _helperFinishGame(gameId, LOSS_GAME_FINISH_AMOUNT, PLAYER);

        _helperShowBothBalance();

        vm.stopPrank();

        uint256 whizBalance = ludoWhiz.getWhizBalance();
        assertTrue(
            whizBalance ==
                (FUNDING_BALANCE -
                    GAME_INIT_AMOUNT +
                    GAME_INIT_AMOUNT +
                    LOSS_GAME_FINISH_AMOUNT),
            "Wrong Whiz balance after loosing game"
        );
        assertTrue(
            address(PLAYER).balance ==
                (PLAYER_BALANCE -
                    FUNDING_BALANCE -
                    GAME_INIT_AMOUNT +
                    LOSS_GAME_FINISH_AMOUNT),
            "Wrong player balance after loosing game"
        );
    }

    function testFinishWinigGame() public {
        _helperShowBothBalance();

        vm.startPrank(PLAYER);

        _helperFundWhiz();

        bytes32 gameId = ludoWhiz.generateRandomId();

        _helperInitializeGame(gameId);

        _helperFinishGame(gameId, WIN_GAME_FINISH_AMOUNT, PLAYER);

        _helperShowBothBalance();

        vm.stopPrank();

        uint256 whizBalance = ludoWhiz.getWhizBalance();
        assertTrue(
            whizBalance ==
                (FUNDING_BALANCE -
                    GAME_INIT_AMOUNT +
                    WIN_GAME_FINISH_AMOUNT -
                    GAME_INIT_AMOUNT),
            "Wrong Whiz balance after winnig game"
        );
        assertTrue(
            address(PLAYER).balance ==
                (PLAYER_BALANCE -
                    FUNDING_BALANCE -
                    GAME_INIT_AMOUNT +
                    WIN_GAME_FINISH_AMOUNT),
            "Wrong player balance after winning game"
        );
    }

    function testFinishGameByAnotherUser() public {
        _helperShowBothBalance();

        vm.startPrank(PLAYER);
        _helperFundWhiz();
        bytes32 gameId = ludoWhiz.generateRandomId();
        _helperInitializeGame(gameId);
        vm.stopPrank();

        vm.startPrank(ANOTHER);
        _helperFinishGame(gameId, WIN_GAME_FINISH_AMOUNT, ANOTHER);
        _helperShowBothBalance();
        vm.stopPrank();
    }
}

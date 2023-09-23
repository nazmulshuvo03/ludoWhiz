export const CONTRACT_ADDRESS = "0x0C8E79F3534B00D9a3D4a856B665Bf4eBC22f2ba";
export const CONTRACT_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "gameId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "gamePlayer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "GameFinished",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "gameId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "gameAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "playerAmount",
        type: "uint256",
      },
    ],
    name: "GameInitialized",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "playerAmount",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "gameId",
        type: "bytes32",
      },
    ],
    name: "finishGame",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "fundWhiz",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "generateRandomId",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "gameId",
        type: "bytes32",
      },
    ],
    name: "getGame",
    outputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "gameId",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "player",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "gameAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "playerAmount",
            type: "uint256",
          },
        ],
        internalType: "struct LudoWhiz.Game",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getWhizAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getWhizBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "initializeGame",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawwhizBalance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

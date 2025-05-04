
// This file contains mock functions for Web3 interactions
// In a real application, these would connect to actual Web3 providers

export interface Web3Provider {
  isConnected: boolean;
  address: string | null;
  chainId: number | null;
  balance: string;
  connect: () => Promise<void>;
  disconnect: () => void;
  switchChain: (chainId: number) => Promise<void>;
}

// Chiliz Chain Network Constants
export const NETWORKS = {
  CHILIZ_MAINNET: {
    chainId: 8895,
    name: "Chiliz Chain",
    rpcUrl: "https://rpc.ankr.com/chiliz",
    blockExplorer: "https://chiliscan.com",
    symbol: "CHZ",
    decimals: 18,
  },
  CHILIZ_TESTNET: {
    chainId: 88882,
    name: "Chiliz Spicy Testnet",
    rpcUrl: "https://spicy-rpc.chiliz.com/",
    blockExplorer: "https://testnet.chiliscan.com/",
    symbol: "CHZ",
    decimals: 18,
  },
};

// Mock Web3 provider with simulated behavior
export const createMockWeb3Provider = (): Web3Provider => {
  let _isConnected = false;
  let _address: string | null = null;
  let _chainId: number | null = null;
  let _balance = "0.00";

  return {
    get isConnected() {
      return _isConnected;
    },
    get address() {
      return _address;
    },
    get chainId() {
      return _chainId;
    },
    get balance() {
      return _balance;
    },
    connect: async () => {
      // Simulate connection delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // Mock successful connection
      _isConnected = true;
      _address = "0x" + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
      _chainId = NETWORKS.CHILIZ_MAINNET.chainId;
      _balance = (Math.random() * 100).toFixed(2);
      
      console.log("Connected to wallet", { address: _address, chainId: _chainId });
      
      return;
    },
    disconnect: () => {
      _isConnected = false;
      _address = null;
      _chainId = null;
      _balance = "0.00";
      console.log("Disconnected from wallet");
    },
    switchChain: async (chainId: number) => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      _chainId = chainId;
      console.log("Switched to chain", chainId);
    },
  };
};

// src/mock/MockData.ts
export interface FanTokenProps {
  id: string;
  name: string;
  symbol: string;
  teamLogo: string;
  supply: string;
  price: number;
  change24h: number;
  holders: number;
  category: "football" | "basketball" | "baseball" | "hockey" | "soccer";
}

export const mockFanTokens: FanTokenProps[] = [
  {
    id: "0x123456789abcdef123456789abcdef123456789a",
    name: "Barcelona Fan Token",
    symbol: "BAR",
    teamLogo: "/images/barcelona.png",
    supply: "10,000,000",
    price: 2.34,
    change24h: 5.67,
    holders: 25678,
    category: "soccer",
  },
  {
    id: "0x223456789abcdef123456789abcdef123456789b",
    name: "Los Angeles Lakers Fan Token",
    symbol: "LAK",
    teamLogo: "/images/lakers.png",
    supply: "5,000,000",
    price: 3.21,
    change24h: -2.14,
    holders: 18945,
    category: "basketball",
  },
  {
    id: "0x323456789abcdef123456789abcdef123456789c",
    name: "New York Yankees Fan Token",
    symbol: "YNK",
    teamLogo: "/images/yankees.png",
    supply: "8,000,000",
    price: 1.87,
    change24h: 3.25,
    holders: 15789,
    category: "baseball",
  },
  {
    id: "0x423456789abcdef123456789abcdef123456789d",
    name: "Detroit Red Wings Fan Token",
    symbol: "RDW",
    teamLogo: "/images/redwings.png",
    supply: "3,000,000",
    price: 4.56,
    change24h: 1.23,
    holders: 9876,
    category: "hockey",
  },
  {
    id: "0x523456789abcdef123456789abcdef123456789e",
    name: "Manchester United Fan Token",
    symbol: "MNU",
    teamLogo: "/images/manchesterunited.png",
    supply: "12,000,000",
    price: 5.67,
    change24h: -1.45,
    holders: 34567,
    category: "soccer",
  },
  {
    id: "0x623456789abcdef123456789abcdef123456789f",
    name: "Real Madrid Fan Token",
    symbol: "RMA",
    teamLogo: "/images/realmadrid.png",
    supply: "15,000,000",
    price: 6.78,
    change24h: 2.34,
    holders: 45678,
    category: "soccer",
  },
];




// Mock transaction data
export interface Transaction {
  hash: string;
  status: 'pending' | 'confirmed' | 'failed' | 'success';
  timestamp: string;
  message: string;
}

export const mockTransactions: Transaction[] = [
  {
    hash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    status: "success",
    timestamp: "2025-04-26 14:32:15",
    message: "Purchased 10 BAR Tokens",
  },
  {
    hash: "0x2345678901abcdef2345678901abcdef2345678901abcdef2345678901abcdef",
    status: "pending",
    timestamp: "2025-04-26 14:45:30",
    message: "Voting on team decision",
  },
  {
    hash: "0x3456789012abcdef3456789012abcdef3456789012abcdef3456789012abcdef",
    status: "failed",
    timestamp: "2025-04-25 18:12:45",
    message: "Transfer to wallet",
  },
  {
    hash: "0x4567890123abcdef4567890123abcdef4567890123abcdef4567890123abcdef",
    status: "confirmed",
    timestamp: "2025-04-25 10:05:22",
    message: "Staking tokens",
  },
];

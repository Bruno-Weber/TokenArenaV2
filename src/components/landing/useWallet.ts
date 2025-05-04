import { useState, useEffect } from "react";
import { ethers } from "ethers";

const CHZ_CONTRACT = "0x3506424F91fFC5eBf2cD5F3aD5e437cD8B09038d1";
const CHZ_DECIMALS = 18;
const CHILIZ_CHAIN_ID_HEX = "0x15B38"; // 888888
const CHILIZ_CHAIN_ID = 888888;

const CHILIZ_PARAMS = {
  chainId: CHILIZ_CHAIN_ID_HEX,
  chainName: "Chiliz Chain",
  nativeCurrency: {
    name: "CHZ",
    symbol: "CHZ",
    decimals: 18,
  },
  rpcUrls: ["https://rpc.ankr.com/chiliz"],
  blockExplorerUrls: ["https://chiliscan.com"],
};

const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)"
];

export type WalletType = "rabby" | "metamask";

interface PersistedWallet {
  address: string;
  balance: string;
  timestamp: number;
}

export function useWallet() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [chzBalance, setChzBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);

  useEffect(() => {
    loadSavedWalletData();
  }, []);

  const loadSavedWalletData = () => {
    try {
      const savedWallet = localStorage.getItem("walletConnection");
      if (savedWallet) {
        const walletData: PersistedWallet = JSON.parse(savedWallet);
        const currentTime = new Date().getTime();
        if (currentTime - walletData.timestamp < 1800000) {
          setWalletAddress(walletData.address);
          setChzBalance(walletData.balance);
          reconnectProvider();
        } else {
          localStorage.removeItem("walletConnection");
        }
      }
    } catch (e) {
      console.error("Erro ao carregar dados salvos:", e);
      localStorage.removeItem("walletConnection");
    }
  };

  const saveWalletData = (address: string, balance: string) => {
    try {
      const walletData: PersistedWallet = {
        address,
        balance,
        timestamp: new Date().getTime(),
      };
      localStorage.setItem("walletConnection", JSON.stringify(walletData));
    } catch (e) {
      console.error("Erro ao salvar dados:", e);
    }
  };

  const reconnectProvider = async () => {
    try {
      if (window.ethereum) {
        const browserProvider = new ethers.BrowserProvider(window.ethereum);
        setProvider(browserProvider);
        return browserProvider;
      }
    } catch (e) {
      console.error("Erro ao reconectar:", e);
    }
    return null;
  };

  async function connect(wallet: WalletType) {
    setError(null);
    setLoading(true);
    try {
      const ethereum = (window as any).ethereum;
      if (!ethereum) throw new Error("Wallet não encontrada.");

      const isValid =
        (wallet === "metamask" && ethereum.isMetaMask) ||
        (wallet === "rabby" && ethereum.isRabby) ||
        (!wallet && ethereum);

      if (!isValid) throw new Error("Tipo de carteira inválido ou não suportado.");

      // Força a rede Chiliz
      const currentChainId = await ethereum.request({ method: "eth_chainId" });
      if (currentChainId !== CHILIZ_CHAIN_ID_HEX) {
        try {
          await ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: CHILIZ_CHAIN_ID_HEX }],
          });
        } catch (switchError: any) {
          if (switchError.code === 4902) {
            await ethereum.request({
              method: "wallet_addEthereumChain",
              params: [CHILIZ_PARAMS],
            });
          } else {
            throw switchError;
          }
        }
      }

      const browserProvider = new ethers.BrowserProvider(ethereum);
      setProvider(browserProvider);
      const accounts = await browserProvider.send("eth_requestAccounts", []);
      const address = accounts[0];
      setWalletAddress(address);
      await fetchChzBalance(address, browserProvider);
    } catch (e: any) {
      setError("Erro ao conectar: " + (e.message || e));
    }
    setLoading(false);
  }

  async function fetchChzBalance(address: string, prov?: ethers.BrowserProvider) {
    setChzBalance(null);
    try {
      const usedProvider = prov || provider;
      if (!usedProvider) {
        setError("Provider não disponível.");
        return;
      }
  
      const network = await usedProvider.getNetwork();
      console.log("🌐 Conectado na rede:", network.chainId);
      
      if (network.chainId !== 88888n) {
        setError("Conecte-se à Chiliz Chain para visualizar o saldo CHZ.");
        return;
      }
  
      const rawBalance = await usedProvider.getBalance(address);
      const formatted = ethers.formatEther(rawBalance); // 18 casas decimais
      console.log("✅ Saldo CHZ (nativo):", formatted);
  
      setChzBalance(formatted);
      saveWalletData(address, formatted);
    } catch (e) {
      console.error("❌ Erro ao buscar saldo CHZ:", e);
      setError("Erro ao buscar saldo CHZ.");
      setChzBalance("0.00");
      saveWalletData(address, "0.00");
    }
  }

  function disconnect() {
    setWalletAddress("");
    setChzBalance("0.00");
    setProvider(null);
    setError(null);
    localStorage.removeItem("walletConnection");
  }

  return {
    walletAddress,
    chzBalance,
    loading,
    error,
    connect,
    disconnect,
    fetchChzBalance,
  };
}


import { useState, useEffect } from "react";
import { ethers } from "ethers";

const CHZ_CONTRACT = "0x3506424F91fC5eBf2cD5F3aD5e437cD8B09038d1";
const CHZ_DECIMALS = 18;
const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)"
];

export type WalletType = "rabby" | "metamask";

// Define o formato dos dados persistidos
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

  // Carrega os dados salvos ao inicializar
  useEffect(() => {
    const savedWallet = localStorage.getItem('walletConnection');
    if (savedWallet) {
      try {
        const walletData: PersistedWallet = JSON.parse(savedWallet);
        const currentTime = new Date().getTime();
        
        // Se os dados tiverem menos de 30 minutos (1800000 ms), use-os
        if (currentTime - walletData.timestamp < 1800000) {
          setWalletAddress(walletData.address);
          setChzBalance(walletData.balance);
          
          // Reconectar ao provider se temos um endereço salvo
          if (walletData.address) {
            reconnectProvider();
          }
        } else {
          // Se os dados forem antigos, limpe-os
          localStorage.removeItem('walletConnection');
        }
      } catch (e) {
        console.error("Erro ao carregar dados salvos da carteira:", e);
        localStorage.removeItem('walletConnection');
      }
    }
  }, []);

  // Função para reconectar ao provider
  const reconnectProvider = async () => {
    try {
      if (window.ethereum) {
        const browserProvider = new ethers.BrowserProvider(window.ethereum);
        setProvider(browserProvider);
        return browserProvider;
      }
    } catch (e) {
      console.error("Erro ao reconectar ao provider:", e);
    }
    return null;
  };

  async function connect(wallet: WalletType) {
    setError(null);
    setLoading(true);
    try {
      let ethereum;
      if (wallet === "rabby" && (window as any).ethereum?.isRabby) {
        ethereum = (window as any).ethereum;
      } else if (wallet === "metamask" && (window as any).ethereum?.isMetaMask) {
        ethereum = (window as any).ethereum;
      } else if ((window as any).ethereum) {
        // fallback: use whatever is injected
        ethereum = (window as any).ethereum;
      } else {
        setError("Wallet não encontrada. Instale Rabby ou MetaMask.");
        setLoading(false);
        return;
      }
      const browserProvider = new ethers.BrowserProvider(ethereum);
      setProvider(browserProvider);
      const accounts = await browserProvider.send("eth_requestAccounts", []);
      const address = accounts[0];
      setWalletAddress(address);
      await fetchChzBalance(address, browserProvider);
    } catch (e: any) {
      setError("Erro ao conectar ou buscar saldo: " + (e.message || e));
    }
    setLoading(false);
  }

  async function fetchChzBalance(address: string, prov?: any) {
    setChzBalance(null);
    try {
      const usedProvider = prov || provider;
      if (!usedProvider) return;
      
      const chzContract = new ethers.Contract(CHZ_CONTRACT, ERC20_ABI, usedProvider);
      
      try {
        const rawBalance = await chzContract.balanceOf(address);
        const formatted = ethers.formatUnits(rawBalance, CHZ_DECIMALS);
        
        // Salva os dados da carteira no localStorage
        const walletData: PersistedWallet = {
          address,
          balance: formatted,
          timestamp: new Date().getTime()
        };
        
        localStorage.setItem('walletConnection', JSON.stringify(walletData));
        
        setChzBalance(formatted);
      } catch (error) {
        console.error("Erro ao buscar saldo CHZ:", error);
        // Se não conseguirmos ler o contrato CHZ, definimos um valor padrão para não quebrar a UI
        setChzBalance("0.00");
      }
    } catch (e: any) {
      console.error("Erro geral ao buscar saldo:", e);
      setError("Erro ao buscar saldo: " + (e.message || e));
      setChzBalance("0.00");
    }
  }

  function disconnect() {
    setWalletAddress(null);
    setChzBalance(null);
    setProvider(null);
    setError(null);
    // Remove os dados salvos
    localStorage.removeItem('walletConnection');
  }

  return {
    walletAddress,
    chzBalance,
    loading,
    error,
    connect,
    disconnect,
    fetchChzBalance
  };
}

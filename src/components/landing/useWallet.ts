import { useState } from "react";
import { ethers } from "ethers";

const CHZ_CONTRACT = "0x3506424F91fC5eBf2cD5F3aD5e437cD8B09038d1";
const CHZ_DECIMALS = 18;
const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)"
];

export type WalletType = "rabby" | "metamask";

export function useWallet() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [chzBalance, setChzBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [provider, setProvider] = useState<any>(null);

  async function connect(wallet: WalletType) {
    setError(null);
    setLoading(true);
    try {
      let chiliz;
      if (wallet === "rabby" && (window as any).chiliz?.isRabby) {
        chiliz = (window as any).chiliz;
      } else if (wallet === "metamask" && (window as any).chiliz?.isMetaMask) {
        chiliz = (window as any).chiliz;
      } else if ((window as any).chiliz) {
        // fallback: use whatever is injected
        chiliz = (window as any).chiliz;
      } else {
        setError("Wallet não encontrada. Instale Rabby ou MetaMask.");
        setLoading(false);
        return;
      }
      const browserProvider = new ethers.BrowserProvider(chiliz);
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
      const rawBalance = await chzContract.balanceOf(address);
      const formatted = ethers.formatUnits(rawBalance, CHZ_DECIMALS);
      setChzBalance(formatted);
    } catch (e: any) {
      setError("Erro ao buscar saldo: " + (e.message || e));
    }
  }

  function disconnect() {
    setWalletAddress(null);
    setChzBalance(null);
    setProvider(null);
    setError(null);
  }

  return {
    walletAddress,
    chzBalance,
    loading,
    error,
    connect,
    disconnect,
  };
}
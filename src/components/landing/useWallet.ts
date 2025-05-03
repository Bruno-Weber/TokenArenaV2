import { useState } from "react";
import { ethers } from "ethers";

const CHZ_CONTRACT = "0x3506424F91fC5eBf2cD5F3aD5e437cD8B09038d1";
const CHZ_DECIMALS = 18;
const CHILIZ_CHAIN_ID = 88882;

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
      let ethereum: any;

      // Seleciona o provider correto se houver múltiplos injetados
      if ((window as any).ethereum?.providers) {
        ethereum = (window as any).ethereum.providers.find((p: any) =>
          wallet === "metamask" ? p.isMetaMask : p.isRabby
        );
      }

      // Fallback se só houver um provider
      if (!ethereum && (window as any).ethereum) {
        ethereum = (window as any).ethereum;
      }

      if (!ethereum) {
        setError("Carteira não encontrada. Instale Rabby ou MetaMask.");
        setLoading(false);
        return;
      }

      const browserProvider = new ethers.BrowserProvider(ethereum, "any");

      // Verifica e troca para a rede Chiliz
      const network = await browserProvider.getNetwork();
      if (network.chainId !== BigInt(CHILIZ_CHAIN_ID)) {
        try {
          await ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x15B92" }], // 88882 em hexadecimal
          });
        } catch (switchError: any) {
          // Se a rede não existir, tenta adicionar
          if (switchError.code === 4902) {
            await ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x15B92",
                  chainName: "Chiliz Chain",
                  nativeCurrency: {
                    name: "Chiliz",
                    symbol: "CHZ",
                    decimals: 18,
                  },
                  rpcUrls: ["https://rpc.ankr.com/chiliz"],
                  blockExplorerUrls: ["https://explorer.chiliz.com"],
                },
              ],
            });
          } else {
            throw switchError;
          }
        }
      }

      setProvider(browserProvider);
      const accounts = await browserProvider.send("eth_requestAccounts", []);
      const address = accounts[0];
      setWalletAddress(address);
      await fetchChzBalance(address, browserProvider);
    } catch (e: any) {
      setError("Erro ao conectar ou buscar saldo: " + (e.message || e));
    } finally {
      setLoading(false);
    }
  }

  async function fetchChzBalance(address: string, prov?: any) {
    setChzBalance(null);
    try {
      const usedProvider = prov || provider;
      if (!usedProvider) {
        setError("Provider não disponível.");
        return;
      }

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

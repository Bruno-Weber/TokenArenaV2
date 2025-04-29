
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Wallet, AlertCircle } from "lucide-react";
import { NETWORKS } from "@/lib/web3";
import WalletOption from "./wallet/WalletOption";
import ConnectedWallet from "./wallet/ConnectedWallet";

import type { WalletType } from "@/components/landing/useWallet";
import NotificationDropdown from "./notifications/NotificationDropdown";

interface WalletConnectProps {
  isConnected: boolean;
  address: string | null;
  onConnect: (walletType: WalletType) => void;
  onDisconnect: () => void;
  balance: string;
}

const WalletConnect = ({
  isConnected,
  address,
  onConnect,
  onDisconnect,
  balance
}: WalletConnectProps) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasProvider, setHasProvider] = useState(false);

  useEffect(() => {
    setHasProvider(window.ethereum !== undefined);
  }, []);

  const handleConnectWallet = async (walletType: WalletType) => {
    setIsLoading(true);
    try {
      if (!window.ethereum) {
        throw new Error("No Ethereum provider found. Please install MetaMask.");
      }
      // Aqui você pode customizar a lógica para cada carteira se necessário
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      
      if (chainId !== '0x15B38') {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x15B38' }],
          });
        } catch (switchError: any) {
          if (switchError.code === 4902) {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: '0x15B38',
                chainName: NETWORKS.CHILIZ_MAINNET.name,
                nativeCurrency: {
                  name: 'CHZ',
                  symbol: 'CHZ',
                  decimals: 18
                },
                rpcUrls: [NETWORKS.CHILIZ_MAINNET.rpcUrl],
                blockExplorerUrls: [NETWORKS.CHILIZ_MAINNET.blockExplorer]
              }],
            });
          } else {
            throw switchError;
          }
        }
      }
      
      onConnect(walletType);
      setIsOpen(false);
      toast({
        title: "Wallet Connected",
        description: "Successfully connected to Chiliz Chain"
      });
    } catch (error: any) {
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect wallet",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <NotificationDropdown />
        <ConnectedWallet
          address={address}
          balance={balance}
          onDisconnect={onDisconnect}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <NotificationDropdown />
      <Button className="text-white flex items-center gap-2 bg-violet-800 hover:bg-violet-700" onClick={() => setIsOpen(true)}>
        <Wallet className="h-4 w-4" />
        Connect Wallet
      </Button>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center min-h-screen bg-black/60">
          <div className="bg-token-background rounded-lg shadow-xl p-16 min-w-[320px] relative">
            <button className="absolute top-2 right-2 text-white/60 hover:text-white text-xl" onClick={() => setIsOpen(false)}>&times;</button>
            <h2 className="text-xl font-bold mb-2 text-white">Conectar carteira</h2>
            <p className="text-white/70 mb-4">Escolha uma carteira para conectar à Chiliz Chain</p>
            <div className="flex flex-col gap-3 mt-4">
              <Button
                variant="outline"
                className="flex items-center gap-3 border-token-purple text-white font-medium text-base px-6 py-3"
                onClick={() => { onConnect('metamask'); setIsOpen(false); }}
                disabled={isLoading}
              >
                <img src="/metamask.svg" alt="MetaMask" className="w-6 h-6 mr-2" />
                {isLoading ? 'Conectando...' : 'MetaMask'}
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-3 border-token-purple text-white font-medium text-base px-6 py-3"
                onClick={() => { onConnect('rabby'); setIsOpen(false); }}
                disabled={isLoading}
              >
                <img src="/images/rabby.png" alt="Rabby" className="w-6 h-6 mr-2" />
                {isLoading ? 'Conectando...' : 'Rabby'}
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-3 border-token-purple text-white font-medium text-base px-6 py-3 opacity-60 cursor-not-allowed"
                onClick={() => toast({ title: 'Em breve', description: 'WalletConnect estará disponível em breve.' })}
                disabled
              >
                <img src="/walletconnect.svg" alt="WalletConnect" className="w-6 h-6 mr-2" />
                WalletConnect <span className="ml-2 text-xs">(em breve)</span>
              </Button>
            </div>
          </div>
        </div>
      )}
      {isLoading && (
        <span className="text-white text-sm font-medium ml-2 animate-fade-in">Conectando...</span>
      )}
      {/* Se quiser mostrar erro, passe error como prop para WalletConnect e exiba aqui:
      {error && (
        <span className="text-red-400 text-sm font-medium ml-2 animate-fade-in">{error}</span>
      )}
      */}
    </div>
  );
};

export default WalletConnect;
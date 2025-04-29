
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Wallet, AlertCircle } from "lucide-react";
import { NETWORKS } from "@/lib/web3";
import WalletOption from "./wallet/WalletOption";
import ConnectedWallet from "./wallet/ConnectedWallet";
import NotificationDropdown from "./notifications/NotificationDropdown";

interface WalletConnectProps {
  isConnected: boolean;
  address: string | null;
  onConnect: () => void;
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

  const handleConnectWallet = async () => {
    setIsLoading(true);
    try {
      if (!window.ethereum) {
        throw new Error("No Ethereum provider found. Please install MetaMask.");
      }
      
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
      
      onConnect();
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
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="text-white flex items-center gap-2 bg-violet-800 hover:bg-violet-700">
            <Wallet className="h-4 w-4" />
            Connect Wallet
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Connect to Chiliz Chain</DialogTitle>
            <DialogDescription>
              Choose a wallet to connect to the Chiliz Chain network
            </DialogDescription>
          </DialogHeader>
          {!hasProvider && (
            <div className="bg-amber-500/20 border border-amber-500/50 rounded-md p-3 flex items-center gap-2 mb-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              <p className="text-sm">
                No Ethereum wallet detected. Please install{" "}
                <a 
                  href="https://metamask.io" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  MetaMask
                </a>.
              </p>
            </div>
          )}
          <div className="grid grid-cols-1 gap-4 py-4">
            <WalletOption 
              name="MetaMask" 
              icon="/metamask.svg" 
              onClick={handleConnectWallet}
              isLoading={isLoading}
              disabled={!hasProvider}
            />
            <WalletOption 
              name="WalletConnect" 
              icon="/walletconnect.svg" 
              onClick={() => {
                toast({
                  title: "Coming Soon",
                  description: "WalletConnect integration will be available soon."
                });
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WalletConnect;

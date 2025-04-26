import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Wallet, ExternalLink, Copy, Check, AlertCircle } from "lucide-react";
import { NETWORKS } from "@/lib/web3";

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
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasProvider, setHasProvider] = useState(false);

  useEffect(() => {
    setHasProvider(window.ethereum !== undefined);
  }, []);

  const shortenAddress = (addr: string | null) => {
    if (!addr) return "";
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  const copyToClipboard = () => {
    if (!address) return;
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Address copied",
      description: "Your wallet address has been copied to the clipboard."
    });
  };

  const viewOnExplorer = () => {
    if (!address) return;
    window.open(`https://chiliscan.com/address/${address}`, "_blank");
    toast({
      title: "Opening explorer",
      description: "Viewing your address on Chiliz explorer."
    });
  };

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

  return (
    <div>
      {!isConnected ? (
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
      ) : (
        <Card className="sports-border">
          <CardContent className="p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse-glow"></div>
                <span className="text-sm font-medium">Connected</span>
              </div>
              <Button variant="outline" size="sm" onClick={onDisconnect} className="h-8 px-2 text-xs">
                Disconnect
              </Button>
            </div>
            
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{shortenAddress(address)}</span>
                <button onClick={copyToClipboard} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
              <button onClick={viewOnExplorer} className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-300">
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
            
            <div className="mt-2 text-xs flex items-center justify-between border-t pt-2 border-dashed">
              <span>Balance:</span>
              <span className="font-bold">{balance} CHZ</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

interface WalletOptionProps {
  name: string;
  icon: string;
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

const WalletOption = ({ name, icon, onClick, isLoading, disabled }: WalletOptionProps) => {
  return (
    <Button 
      variant="outline" 
      className="flex items-center justify-between p-4 h-auto sports-border hover:border-chiliz-primary"
      onClick={onClick}
      disabled={isLoading || disabled}
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 relative">
          <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-400">
            {name.substring(0, 1)}
          </div>
          <img 
            src={icon} 
            alt={`${name} logo`} 
            className="w-full h-full object-contain relative z-10" 
            onError={e => {
              e.currentTarget.style.display = 'none';
            }} 
          />
        </div>
        <span className="font-medium">{name}</span>
      </div>
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <span className="text-gray-400 text-sm">Connect</span>
      )}
    </Button>
  );
};

export default WalletConnect;

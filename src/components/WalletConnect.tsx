import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Wallet, ExternalLink, Copy, Check } from "lucide-react";

interface WalletConnectProps {
  isConnected: boolean;
  address: string | null;
  onConnect: () => void;
  onDisconnect: () => void;
  balance: string;
}

const WalletConnect = ({ isConnected, address, onConnect, onDisconnect, balance }: WalletConnectProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Format the address for display
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
      description: "Your wallet address has been copied to the clipboard.",
    });
  };

  // Simulated external link to explorer
  const viewOnExplorer = () => {
    if (!address) return;
    window.open(`https://chiliscan.com/address/${address}`, "_blank");
    toast({
      title: "Opening explorer",
      description: "Viewing your address on Chiliz explorer.",
    });
  };

  // Display the wallet button or connected info
  return (
    <div>
      {!isConnected ? (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-chiliz-primary hover:bg-chiliz-primary/90 text-white flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              Connect Wallet
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Connect Wallet</DialogTitle>
              <DialogDescription>
                Choose a wallet to connect to Chiliz Chain
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 gap-4 py-4">
              <WalletOption 
                name="MetaMask" 
                icon="/metamask.svg" 
                onClick={() => {
                  onConnect();
                  setIsOpen(false);
                  toast({
                    title: "Wallet connected",
                    description: "MetaMask wallet has been connected successfully.",
                  });
                }} 
              />
              <WalletOption 
                name="WalletConnect" 
                icon="/walletconnect.svg" 
                onClick={() => {
                  toast({
                    title: "Coming Soon",
                    description: "WalletConnect integration will be available soon.",
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
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onDisconnect}
                className="h-8 px-2 text-xs"
              >
                Disconnect
              </Button>
            </div>
            
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{shortenAddress(address)}</span>
                <button 
                  onClick={copyToClipboard} 
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
              <button 
                onClick={viewOnExplorer}
                className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-300"
              >
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
}

const WalletOption = ({ name, icon, onClick }: WalletOptionProps) => {
  return (
    <Button
      variant="outline"
      className="flex items-center justify-between p-4 h-auto sports-border hover:border-chiliz-primary"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 relative">
          {/* Fallback if SVG doesn't load */}
          <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-400">
            {name.substring(0, 1)}
          </div>
          <img 
            src={icon} 
            alt={`${name} logo`}
            className="w-full h-full object-contain relative z-10" 
            onError={(e) => {
              // Keep the fallback visible if image fails to load
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
        <span className="font-medium">{name}</span>
      </div>
      <span className="text-gray-400 text-sm">Connect</span>
    </Button>
  );
};

export default WalletConnect;

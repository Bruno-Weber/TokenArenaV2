
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ExternalLink, Copy, Check } from "lucide-react";

interface ConnectedWalletProps {
  address: string;
  balance: string;
  onDisconnect: () => void;
}

const ConnectedWallet = ({ address, balance, onDisconnect }: ConnectedWalletProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const shortenAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Address copied",
      description: "Your wallet address has been copied to the clipboard."
    });
  };

  const viewOnExplorer = () => {
    window.open(`https://chiliscan.com/address/${address}`, "_blank");
    toast({
      title: "Opening explorer",
      description: "Viewing your address on Chiliz explorer."
    });
  };

  return (
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
  );
};

export default ConnectedWallet;

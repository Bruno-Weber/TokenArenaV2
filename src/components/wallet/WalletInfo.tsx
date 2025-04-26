
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, ExternalLink, QrCode, Send, ArrowDownUp, Wallet as WalletIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface WalletInfoProps {
  address: string;
  balance: string;
  onCopy: () => void;
}

const WalletInfo = ({ address, balance }: WalletInfoProps) => {
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Address Copied",
      description: "Wallet address has been copied to clipboard",
    });
  };

  return (
    <Card className="relative overflow-hidden backdrop-blur-xl bg-black/10 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.12)]
                   before:absolute before:inset-0 before:bg-gradient-to-r before:from-violet-500/10 before:to-fuchsia-500/10 before:opacity-0 
                   hover:before:opacity-100 before:transition-opacity">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5" />
      <CardHeader className="pb-2 relative">
        <CardTitle className="flex items-center gap-2 text-gradient">
          <WalletIcon className="h-5 w-5" />
          My Wallet
        </CardTitle>
        <CardDescription className="text-white/60">Connected to Chiliz Chain</CardDescription>
      </CardHeader>
      <CardContent className="pb-2 relative">
        <div className="flex items-center justify-between mb-4">
          <div className="font-mono text-sm bg-black/30 p-2 rounded-md overflow-hidden overflow-ellipsis backdrop-blur-sm border border-white/10">
            {address}
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-white/10" onClick={handleCopy}>
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-white/10">
              <QrCode className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 hover:bg-white/10"
              onClick={() => window.open(`https://chiliscan.com/address/${address}`, "_blank")}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div>
          <div className="text-white/60 text-sm mb-1">Balance</div>
          <div className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            {balance} CHZ
          </div>
          <div className="text-sm text-white/60 mt-1">≈ $45.74 USD</div>
        </div>
      </CardContent>
      <CardFooter className="relative">
        <div className="w-full grid grid-cols-2 gap-2">
          <Button variant="outline" className="flex items-center gap-2 bg-white/5 border-white/10 hover:bg-white/10 backdrop-blur-sm">
            <ArrowDownUp className="h-4 w-4" />
            Swap
          </Button>
          <Button className="flex items-center gap-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:opacity-90">
            <Send className="h-4 w-4" />
            Send
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default WalletInfo;

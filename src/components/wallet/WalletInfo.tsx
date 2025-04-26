
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
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <WalletIcon className="h-5 w-5" />
          My Wallet
        </CardTitle>
        <CardDescription>Connected to Chiliz Chain</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center justify-between mb-4">
          <div className="font-mono text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded-md overflow-hidden overflow-ellipsis">
            {address}
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleCopy}>
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <QrCode className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={() => window.open(`https://chiliscan.com/address/${address}`, "_blank")}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div>
          <div className="text-muted-foreground text-sm mb-1">Balance</div>
          <div className="text-3xl font-bold">{balance} CHZ</div>
          <div className="text-sm text-muted-foreground mt-1">≈ $45.74 USD</div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full grid grid-cols-2 gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowDownUp className="h-4 w-4" />
            Swap
          </Button>
          <Button className="flex items-center gap-2 bg-chiliz-primary hover:bg-chiliz-primary/90">
            <Send className="h-4 w-4" />
            Send
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default WalletInfo;

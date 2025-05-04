import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, ExternalLink, QrCode, Send, ArrowDownUp, Wallet as WalletIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useWallet } from "../landing/useWallet";

interface WalletInfoProps {
  onCopy: () => void;
}

const WalletInfo = ({ }: WalletInfoProps) => {
  const { toast } = useToast();
  const { chzBalance, walletAddress } = useWallet();

  const [balance, setBalance] = useState("0.00");
  const [usdValue, setUsdValue] = useState("0.00");
  const [address, setAddress] = useState(walletAddress || "Connect your wallet");

  const handleCopy = () => {
    if (!walletAddress) return;

    navigator.clipboard.writeText(walletAddress);
    toast({
      title: "Address Copied",
      description: "Wallet address has been copied to clipboard",
    });
  };

  useEffect(() => {
    setBalance(chzBalance || "0.00");
    setAddress(walletAddress || "Connect your wallet");
    fetchUsdValue();
  }, [chzBalance, walletAddress]);

  const fetchUsdValue = async () => {
    const balanceNumber = parseFloat(chzBalance) || 0;

    if (!walletAddress || balanceNumber === 0) {
      setUsdValue("0.00");
      return;
    }

    try {
      const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=chiliz&vs_currencies=usd");
      const data = await res.json();
      const price = data?.chiliz?.usd ?? 0;
      const value = (balanceNumber * price).toFixed(2);
      setUsdValue(value);
    } catch (error) {
      console.error("Failed to fetch CHZ price:", error);
      setUsdValue("0.00");
    }
  };

  return (
    <Card className="relative overflow-hidden backdrop-blur-xl bg-black/10 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.12)]
                   before:absolute before:inset-0 before:bg-gradient-to-r before:from-violet-500/10 before:to-fuchsia-500/10 before:opacity-0 
                   hover:before:opacity-100 before:transition-opacity">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5" />
      <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
      <CardHeader className="pb-2 relative">
        <CardTitle className="flex items-center gap-2 text-gradient bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
          <WalletIcon className="h-5 w-5" />
          My Wallet
        </CardTitle>
        <CardDescription className="text-white/60">
          {walletAddress ? "Connected to Chiliz Chain" : "Not connected"}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2 relative">
        {walletAddress ? (
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
                onClick={() => window.open(`https://chiliscan.com/address/${walletAddress}`, "_blank")}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center mb-4 py-2">
            <div className="font-mono text-sm bg-black/30 p-2 rounded-md backdrop-blur-sm border border-white/10">
              Connect wallet to view address
            </div>
          </div>
        )}
        
        <div>
          <div className="text-white/60 text-sm mb-1">Balance</div>
          <div className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            {balance} CHZ
          </div>
          <div className="text-sm text-white/60 mt-1">≈ ${usdValue} USD</div>
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

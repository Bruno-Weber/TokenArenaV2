
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SendTokensProps {
  mockBalance: string;
}

const SendTokens = ({ mockBalance }: SendTokensProps) => {
  const [amount, setAmount] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const handleSend = () => {
    if (!amount || !recipientAddress) {
      toast({
        title: "Missing Information",
        description: "Please enter both amount and recipient address",
        variant: "destructive",
      });
      return;
    }
    
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setAmount("");
      setRecipientAddress("");
      toast({
        title: "Transaction Initiated",
        description: "Your transaction has been submitted to the network",
      });
    }, 2000);
  };

  return (
    <Card className="mt-6 relative overflow-hidden backdrop-blur-xl bg-black/10 border border-white/20
                    before:absolute before:inset-0 before:bg-gradient-to-r before:from-violet-500/10 before:to-fuchsia-500/10 
                    before:opacity-0 hover:before:opacity-100 before:transition-opacity">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-fuchsia-500/5" />
      <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
      
      <CardHeader className="pb-2 relative">
        <CardTitle className="flex items-center gap-2 text-gradient bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
          <Send className="h-5 w-5" />
          Send Tokens
        </CardTitle>
        <CardDescription className="text-white/60">Transfer tokens to another wallet</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4 relative">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/80">Recipient Address</label>
          <Input
            placeholder="0x..."
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            className="bg-black/30 border-white/10 backdrop-blur-sm placeholder:text-white/30
                      focus-visible:ring-violet-500/50 focus-visible:border-violet-500/50"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/80">Amount</label>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-black/30 border-white/10 backdrop-blur-sm placeholder:text-white/30
                        focus-visible:ring-violet-500/50 focus-visible:border-violet-500/50"
            />
            <Button 
              variant="outline" 
              className="whitespace-nowrap border border-white/10 bg-black/30 backdrop-blur-sm
                       hover:bg-white/10 hover:border-violet-500/50"
            >
              Max
            </Button>
          </div>
          <div className="flex justify-between text-xs text-white/60">
            <span>Available: {mockBalance} CHZ</span>
            <span>Gas: ~0.02 CHZ</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="relative">
        <Button 
          className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:opacity-90 transition-opacity
                     text-white font-medium"
          onClick={handleSend}
          disabled={isSending || !amount || !recipientAddress}
        >
          {isSending ? (
            <>
              <span className="animate-spin mr-2">⭮</span>
              Processing...
            </>
          ) : (
            <>Send Tokens</>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SendTokens;

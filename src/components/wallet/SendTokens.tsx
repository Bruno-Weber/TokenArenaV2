
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="h-5 w-5" />
          Send Tokens
        </CardTitle>
        <CardDescription>Transfer tokens to another wallet</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Recipient Address</label>
          <Input
            placeholder="0x..."
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Amount</label>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <Button variant="outline" className="whitespace-nowrap">Max</Button>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Available: {mockBalance} CHZ</span>
            <span>Gas: ~0.02 CHZ</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-chiliz-primary hover:bg-chiliz-primary/90"
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

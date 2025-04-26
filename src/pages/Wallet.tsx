
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import AppLayout from "@/components/AppLayout";
import { mockFanTokens } from "@/lib/web3";
import { Copy, ExternalLink, QrCode, Send, ArrowDownUp, History, Wallet as WalletIcon } from "lucide-react";

const Wallet = () => {
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [isSending, setIsSending] = useState(false);
  
  const mockAddress = "0x1234567890abcdef1234567890abcdef12345678";
  const mockBalance = "152.45";
  
  const handleCopy = () => {
    navigator.clipboard.writeText(mockAddress);
    toast({
      title: "Address Copied",
      description: "Wallet address has been copied to clipboard",
    });
  };
  
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
    <AppLayout>
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-2">Wallet Management</h1>
        <p className="text-muted-foreground mb-8">View and manage your crypto assets on Chiliz Chain</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            {/* Wallet Info Card */}
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
                    {mockAddress}
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
                      onClick={() => window.open(`https://chiliscan.com/address/${mockAddress}`, "_blank")}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div>
                  <div className="text-muted-foreground text-sm mb-1">Balance</div>
                  <div className="text-3xl font-bold">{mockBalance} CHZ</div>
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
            
            {/* Send Token Card */}
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
          </div>
          
          <div className="lg:col-span-2">
            {/* Asset Tabs */}
            <Tabs defaultValue="tokens" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="tokens">Fan Tokens</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="staking">Staking</TabsTrigger>
              </TabsList>
              
              <TabsContent value="tokens">
                <div className="space-y-4">
                  {mockFanTokens.slice(0, 3).map(token => (
                    <AssetItem 
                      key={token.id}
                      name={token.name}
                      symbol={token.symbol}
                      logo={token.teamLogo}
                      balance={"25.00"}
                      value={token.price * 25}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="history">
                <div className="text-center py-12">
                  <History className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">Transaction History</h3>
                  <p className="text-muted-foreground mb-4">
                    View all your transactions in the Activity section
                  </p>
                  <Button variant="outline">Go to Activity</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="staking">
                <div className="text-center py-12">
                  <WalletIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">Staking Coming Soon</h3>
                  <p className="text-muted-foreground mb-4">
                    Earn rewards by staking your fan tokens
                  </p>
                  <Button disabled>Join Waitlist</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

interface AssetItemProps {
  name: string;
  symbol: string;
  logo: string;
  balance: string;
  value: number;
}

const AssetItem = ({ name, symbol, logo, balance, value }: AssetItemProps) => {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
            <img
              src={logo}
              alt={`${name} logo`}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg";
              }}
            />
          </div>
          <div>
            <div className="font-medium">{name}</div>
            <div className="text-sm text-muted-foreground">${symbol}</div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="font-medium">{balance} {symbol}</div>
          <div className="text-sm text-muted-foreground">≈ ${value.toFixed(2)} USD</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Wallet;

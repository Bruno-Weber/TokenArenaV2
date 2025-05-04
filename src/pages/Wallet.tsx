
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { History } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { mockFanTokens } from "@/lib/web3";
import WalletInfo from "@/components/wallet/WalletInfo";
import SendTokens from "@/components/wallet/SendTokens";
import AssetItem from "@/components/wallet/AssetList";
import StakingSection from "@/components/wallet/StakingSection";
import { useWallet } from "@/components/landing/useWallet";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const Wallet = () => {
  const { walletAddress, chzBalance } = useWallet();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const handleCopyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      toast({
        title: "Endereço copiado",
        description: "O endereço da carteira foi copiado para a área de transferência"
      });
    }
  };
  
  return (
    <AppLayout>
      <div className="py-4 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Wallet Management</h1>
        <p className="text-muted-foreground mb-4 sm:mb-8">View and manage your crypto assets on Chiliz Chain</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          <div className="lg:col-span-1">
            <WalletInfo 
              onCopy={handleCopyAddress}
            />
            <SendTokens mockBalance={chzBalance || "0.00"} />
          </div>
          
          <div className="lg:col-span-2">
            <Tabs defaultValue="tokens" className="w-full">
              <TabsList className={`grid ${isMobile ? 'grid-cols-1 gap-2' : 'grid-cols-3'} mb-6`}>
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
                <div className="text-center py-8 sm:py-12">
                  <History className="h-12 sm:h-16 w-12 sm:w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg sm:text-xl font-medium mb-2">Transaction History</h3>
                  <p className="text-muted-foreground mb-4">
                    View all your transactions in the Activity section
                  </p>
                  <Button variant="outline">Go to Activity</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="staking">
                <StakingSection tokens={mockFanTokens} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Wallet;

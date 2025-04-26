
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import AppLayout from "@/components/AppLayout";
import WalletConnect from "@/components/WalletConnect";
import FanTokenCard from "@/components/FanTokenCard";
import TransactionStatus from "@/components/TransactionStatus";
import { createMockWeb3Provider, mockFanTokens, mockTransactions } from "@/lib/web3";
import { ArrowRight, Trophy, TrendingUp, Users, Zap } from "lucide-react";

const Index = () => {
  const { toast } = useToast();
  const [web3Provider] = useState(createMockWeb3Provider());
  const [isConnected, setIsConnected] = useState(web3Provider.isConnected);
  const [address, setAddress] = useState<string | null>(web3Provider.address);
  const [balance, setBalance] = useState(web3Provider.balance);

  // Handle wallet connection
  const handleConnect = async () => {
    try {
      await web3Provider.connect();
      setIsConnected(true);
      setAddress(web3Provider.address);
      setBalance(web3Provider.balance);
      toast({
        title: "Wallet Connected",
        description: "Successfully connected to your wallet.",
      });
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      toast({
        title: "Connection Failed",
        description: "Could not connect to your wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle wallet disconnection
  const handleDisconnect = () => {
    web3Provider.disconnect();
    setIsConnected(false);
    setAddress(null);
    setBalance("0.00");
    toast({
      title: "Wallet Disconnected",
      description: "You have disconnected your wallet.",
    });
  };

  // Insert wallet connect component into its container
  useEffect(() => {
    const walletContainer = document.getElementById("wallet-container");
    if (walletContainer) {
      const root = document.createElement("div");
      walletContainer.appendChild(root);

      // Render the wallet component
      const renderWalletConnect = () => {
        return (
          <WalletConnect
            isConnected={isConnected}
            address={address}
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
            balance={balance}
          />
        );
      };

      // Update the component when state changes
      const updateWalletConnect = () => {
        root.innerHTML = "";
        const walletElement = renderWalletConnect();
        // In a real implementation, you would use ReactDOM.render here
        // For now, we'll just rely on the parent component re-rendering
      };

      updateWalletConnect();
      
      // Cleanup
      return () => {
        if (walletContainer.contains(root)) {
          walletContainer.removeChild(root);
        }
      };
    }
  }, [isConnected, address, balance]);

  return (
    <AppLayout>
      {/* Hero section */}
      <section className="py-8 animate-fade-in">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gradient">Sports Chain Architect</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with your favorite sports teams through the power of blockchain
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <FeatureCard 
            title="Fan Tokens"
            description="Own a piece of your favorite team"
            icon={<Trophy className="h-6 w-6" />}
            color="bg-chiliz-primary"
          />
          <FeatureCard 
            title="Team Voting"
            description="Participate in team decisions"
            icon={<Users className="h-6 w-6" />}
            color="bg-chiliz-secondary"
          />
          <FeatureCard 
            title="Live Stats"
            description="Real-time team performance data"
            icon={<TrendingUp className="h-6 w-6" />}
            color="bg-chiliz-accent"
          />
          <FeatureCard 
            title="Fast Transactions"
            description="Powered by Chiliz Chain"
            icon={<Zap className="h-6 w-6" />}
            color="bg-chiliz-dark"
          />
        </div>
      </section>

      {/* Main content with tabs */}
      <section className="py-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <Tabs defaultValue="tokens" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="tokens">Fan Tokens</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="votes">Team Votes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tokens">
            {!isConnected ? (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
                <p className="text-muted-foreground mb-6">
                  Connect your wallet to view and interact with fan tokens
                </p>
                <Button 
                  onClick={handleConnect}
                  className="bg-chiliz-primary hover:bg-chiliz-primary/90"
                >
                  Connect Wallet
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
                {mockFanTokens.map((token) => (
                  <FanTokenCard key={token.id} {...token} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="activity">
            {!isConnected ? (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
                <p className="text-muted-foreground mb-6">
                  Connect your wallet to view your activity
                </p>
                <Button 
                  onClick={handleConnect}
                  className="bg-chiliz-primary hover:bg-chiliz-primary/90"
                >
                  Connect Wallet
                </Button>
              </div>
            ) : (
              <div className="space-y-4 animate-slide-up">
                {mockTransactions.map((tx) => (
                  <TransactionStatus key={tx.hash} {...tx} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="votes">
            {!isConnected ? (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
                <p className="text-muted-foreground mb-6">
                  Connect your wallet to view and participate in team votes
                </p>
                <Button 
                  onClick={handleConnect}
                  className="bg-chiliz-primary hover:bg-chiliz-primary/90"
                >
                  Connect Wallet
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up">
                <VoteCard 
                  title="New Team Jersey Design"
                  team="Barcelona"
                  endTime="12 hours"
                  participants={1482}
                  isActive={true}
                />
                <VoteCard 
                  title="Team Captain Selection"
                  team="Manchester United"
                  endTime="2 days"
                  participants={3254}
                  isActive={true}
                />
                <VoteCard 
                  title="Fan Zone Upgrade Options"
                  team="Lakers"
                  endTime="5 days"
                  participants={972}
                  isActive={true}
                />
                <VoteCard 
                  title="Pre-Season Match Location"
                  team="Yankees"
                  endTime="8 hours"
                  participants={2145}
                  isActive={true}
                />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </section>
    </AppLayout>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const FeatureCard = ({ title, description, icon, color }: FeatureCardProps) => {
  return (
    <Card className="card-sports">
      <CardContent className="p-6">
        <div className={`rounded-full w-12 h-12 flex items-center justify-center mb-4 ${color}`}>
          <div className="text-white">{icon}</div>
        </div>
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

interface VoteCardProps {
  title: string;
  team: string;
  endTime: string;
  participants: number;
  isActive: boolean;
}

const VoteCard = ({ title, team, endTime, participants, isActive }: VoteCardProps) => {
  const { toast } = useToast();
  
  const handleVote = () => {
    toast({
      title: "Coming Soon!",
      description: "Voting functionality will be available in the next update.",
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>by {team}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between text-sm mb-4">
          <div className="text-muted-foreground">Ends in: <span className="font-medium text-foreground">{endTime}</span></div>
          <div className="text-muted-foreground">
            <Users className="inline h-4 w-4 mr-1" />
            {participants.toLocaleString()} participants
          </div>
        </div>
        
        <Button 
          variant="default" 
          className="w-full bg-chiliz-primary hover:bg-chiliz-primary/90"
          onClick={handleVote}
        >
          Vote Now <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default Index;

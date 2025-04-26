import React, { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import NFTCard from "@/components/nft/NFTCard";
import RandomMint from "@/components/nft/RandomMint";
import { mockNFTs } from "@/lib/mockNFTData";
import { NFT } from "@/types/nft";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import WalletConnect from "@/components/WalletConnect";
import { Trophy } from "lucide-react";

const NFTMarket = () => {
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState("0.00");
  const { toast } = useToast();

  const handleConnect = () => {
    setIsConnected(true);
    setWalletAddress("0x1234...5678"); // Mock address
    setBalance("100.00"); // Mock balance
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setWalletAddress(null);
    setBalance("0.00");
  };

  const handleMint = (nft: NFT) => {
    if (!isConnected) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet to mint NFTs",
      });
      return;
    }
    setSelectedNFT(nft);
  };

  const handleConfirmMint = () => {
    toast({
      title: "NFT Purchase Initiated",
      description: `Starting to purchase ${selectedNFT?.name}. Please wait for confirmation.`,
    });
    setSelectedNFT(null);
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8 min-h-screen relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="flex justify-between items-center mb-12 relative">
          <h1 className="text-4xl font-bold text-center relative">
            <span className="inline-block animate-text-shimmer bg-[linear-gradient(110deg,#b388ff,#8c9eff,#82b1ff,#b388ff)] bg-[length:200%_auto] bg-clip-text text-transparent">
              NFT Marketplace
            </span>
          </h1>

          <div className="absolute top-0 right-0">
            <WalletConnect
              isConnected={isConnected}
              address={walletAddress}
              onConnect={handleConnect}
              onDisconnect={handleDisconnect}
              balance={balance}
            />
          </div>
        </div>

        <div className="relative backdrop-blur-sm bg-black/40 border border-white/10 rounded-xl p-8 mb-12 group transition-all duration-300 hover:bg-black/50">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity" />
          <RandomMint />
        </div>

        <h2 className="text-2xl font-bold mb-6 text-white/90 relative inline-block">
          Market Listings
          <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-purple-500/50 to-blue-500/50" />
        </h2>

        <div className="relative">
          <Carousel className="w-full max-w-6xl mx-auto">
            <CarouselContent className="-ml-4">
              {mockNFTs.map((nft) => (
                <CarouselItem key={nft.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <NFTCard nft={nft} onMint={handleMint} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 bg-white/5 hover:bg-white/10 border-white/10" />
            <CarouselNext className="hidden md:flex -right-12 bg-white/5 hover:bg-white/10 border-white/10" />
          </Carousel>
        </div>

        <Dialog open={!!selectedNFT} onOpenChange={() => setSelectedNFT(null)}>
          <DialogContent className="bg-black/90 border border-white/10 backdrop-blur-xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white">Buy NFT</DialogTitle>
              <DialogDescription className="text-gray-400">
                Are you sure you want to buy {selectedNFT?.name} for {selectedNFT?.price} ETH?
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end space-x-4 mt-4">
              <Button variant="outline" onClick={() => setSelectedNFT(null)}>
                Cancel
              </Button>
              <Button 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                onClick={handleConfirmMint}
              >
                Confirm Purchase
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default NFTMarket;

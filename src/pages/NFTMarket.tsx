
import React, { useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import NFTCard from "@/components/nft/NFTCard";
import { mockNFTs } from "@/lib/mockNFTData";
import { NFT } from "@/types/nft";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const NFTMarket = () => {
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const { toast } = useToast();

  const handleMint = (nft: NFT) => {
    setSelectedNFT(nft);
  };

  const handleConfirmMint = () => {
    toast({
      title: "NFT Minting Initiated",
      description: `Starting to mint ${selectedNFT?.name}. Please wait for confirmation.`,
    });
    setSelectedNFT(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-gradient animate-text-shimmer bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.purple.400),theme(colors.purple.600),theme(colors.blue.400),theme(colors.purple.400))] bg-[length:200%_auto]">
        NFT Marketplace
      </h1>

      <div className="mb-12">
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent className="-ml-4">
            {mockNFTs.map((nft) => (
              <CarouselItem key={nft.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <NFTCard nft={nft} onMint={handleMint} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>

      <Dialog open={!!selectedNFT} onOpenChange={() => setSelectedNFT(null)}>
        <DialogContent className="bg-black/90 border border-white/10 backdrop-blur-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">Mint NFT</DialogTitle>
            <DialogDescription className="text-gray-400">
              Are you sure you want to mint {selectedNFT?.name}?
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
              Confirm Mint
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NFTMarket;

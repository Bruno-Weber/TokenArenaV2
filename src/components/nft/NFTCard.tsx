
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NFT } from "@/types/nft";

interface NFTCardProps {
  nft: NFT;
  onMint: (nft: NFT) => void;
}

const NFTCard: React.FC<NFTCardProps> = ({ nft, onMint }) => {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500";
      case "rare":
        return "bg-purple-500/20 text-purple-500 border-purple-500";
      default:
        return "bg-blue-500/20 text-blue-500 border-blue-500";
    }
  };

  return (
    <Card className="relative group overflow-hidden transition-all duration-300 hover:scale-105 bg-black/40 border border-white/10 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold text-white">{nft.name}</CardTitle>
          <Badge variant="outline" className={`${getRarityColor(nft.rarity)} capitalize`}>
            {nft.rarity}
          </Badge>
        </div>
        <CardDescription className="text-gray-400">
          {nft.club}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <div className="relative aspect-square rounded-lg overflow-hidden border border-white/10">
          <img 
            src={nft.image} 
            alt={nft.name}
            className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-110"
          />
        </div>
      </CardContent>

      <CardFooter className="p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between w-full">
          <div className="text-sm">
            <span className="text-gray-400">Price</span>
            <p className="text-white font-bold">{nft.price} ETH</p>
          </div>
          <Button 
            onClick={() => onMint(nft)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
          >
            {nft.seller ? "Buy Now" : "Mint Now"}
          </Button>
        </div>
        
        {nft.seller && (
          <div className="flex items-center gap-2 w-full border-t border-white/10 pt-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src={nft.seller.profileNft} />
              <AvatarFallback>SF</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">{nft.seller.name}</span>
              <span className="text-xs text-gray-400">{nft.seller.address}</span>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default NFTCard;

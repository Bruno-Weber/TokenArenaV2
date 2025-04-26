
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { generateRandomNFT } from "@/lib/mockNFTData";
import { useToast } from "@/hooks/use-toast";
import NFTCard from "./NFTCard";
import { NFT } from "@/types/nft";

const RandomMint = () => {
  const [previewNFT, setPreviewNFT] = useState<NFT | null>(null);
  const { toast } = useToast();

  const handleGenerateRandom = () => {
    setPreviewNFT(generateRandomNFT());
  };

  const handleMint = () => {
    if (!previewNFT) return;
    
    toast({
      title: "NFT Minted Successfully!",
      description: `You've minted ${previewNFT.name}`,
    });
    setPreviewNFT(null);
  };

  return (
    <div className="bg-black/40 border border-white/10 backdrop-blur-lg rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-white">Mint Random NFT</h2>
      <div className="flex flex-col items-center gap-4">
        {previewNFT ? (
          <>
            <div className="w-full max-w-sm">
              <NFTCard nft={previewNFT} onMint={handleMint} />
            </div>
            <div className="flex gap-4">
              <Button variant="outline" onClick={handleGenerateRandom}>
                Generate Another
              </Button>
              <Button 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                onClick={handleMint}
              >
                Mint This NFT
              </Button>
            </div>
          </>
        ) : (
          <Button 
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            onClick={handleGenerateRandom}
          >
            Generate Random NFT
          </Button>
        )}
      </div>
    </div>
  );
};

export default RandomMint;

import { NFT } from "@/types/nft";

export const mockNFTs: NFT[] = [
  {
    id: "1",
    name: "Grêmio Player #1",
    image: "/lovable-uploads/084ee4bc-0d55-483e-a621-b27275889446.png",
    price: 0.5,
    status: "new",
    rarity: "rare",
    club: "Grêmio",
    seller: {
      address: "0x1234...5678",
      name: "GremioFan123",
      profileNft: "/lovable-uploads/961ed993-263c-4b01-b82a-d1bfa3989617.png"
    }
  },
  {
    id: "2",
    name: "Grêmio Legend #2",
    image: "/lovable-uploads/a72c4e1b-602c-431c-b2f3-9b01473dd103.png",
    price: 1.2,
    status: "new",
    rarity: "legendary",
    club: "Grêmio",
    seller: {
      address: "0x8765...4321",
      name: "TricolorMaster",
      profileNft: "/lovable-uploads/70d2e87c-8ddb-4295-a669-e43c17a409cd.png"
    }
  },
  {
    id: "3",
    name: "Grêmio Star #3",
    image: "/lovable-uploads/961ed993-263c-4b01-b82a-d1bfa3989617.png",
    price: 0.8,
    status: "new",
    rarity: "rare",
    club: "Grêmio",
    seller: {
      address: "0x5432...1234",
      name: "GremioGamer",
      profileNft: "/lovable-uploads/1e691277-1cdd-4566-a409-1d1a15740b74.png"
    }
  },
  {
    id: "4",
    name: "Soccer Action #4",
    image: "/lovable-uploads/1e691277-1cdd-4566-a409-1d1a15740b74.png",
    price: 0.3,
    status: "new",
    rarity: "common",
    club: "Grêmio",
    seller: {
      address: "0x9876...5432",
      name: "GremioFan",
      profileNft: "/lovable-uploads/70d2e87c-8ddb-4295-a669-e43c17a409cd.png"
    }
  },
  {
    id: "5",
    name: "Grêmio Celebration #5",
    image: "/lovable-uploads/70d2e87c-8ddb-4295-a669-e43c17a409cd.png",
    price: 2.0,
    status: "new",
    rarity: "legendary",
    club: "Grêmio",
    seller: {
      address: "0x2345...6789",
      name: "GremioLegend",
      profileNft: "/lovable-uploads/8d5523a0-6060-424a-b0a8-fff1555ab27e.png"
    }
  },
  {
    id: "6",
    name: "Grêmio Player #6",
    image: "/lovable-uploads/8d5523a0-6060-424a-b0a8-fff1555ab27e.png",
    price: 0.6,
    status: "new",
    rarity: "rare",
    club: "Grêmio",
    seller: {
      address: "0x3456...7890",
      name: "GremioFan2",
      profileNft: "/lovable-uploads/084ee4bc-0d55-483e-a621-b27275889446.png"
    }
  }
];

export const generateRandomNFT = (): NFT => {
  const id = Math.random().toString(36).substr(2, 9);
  const rarities = ["common", "rare", "legendary"] as const;
  const rarity = rarities[Math.floor(Math.random() * rarities.length)];
  const number = Math.floor(Math.random() * 1000);
  
  return {
    id,
    name: `Random Grêmio NFT #${number}`,
    image: mockNFTs[Math.floor(Math.random() * mockNFTs.length)].image,
    price: Number((Math.random() * 2 + 0.1).toFixed(2)),
    status: "new",
    rarity,
    club: "Grêmio"
  };
};

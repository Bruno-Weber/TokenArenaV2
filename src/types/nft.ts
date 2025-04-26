
export interface NFT {
  id: string;
  name: string;
  image: string;
  price: number;
  status: "new" | "sold_out";
  rarity: "common" | "rare" | "legendary";
  club: string;
}

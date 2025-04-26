
import { Club } from "@/types/club";

export const mockClubs: Record<string, Club> = {
  barcelona: {
    id: "barcelona",
    name: "FC Barcelona",
    symbol: "BAR",
    description: "Mais que um clube - uma instituição que representa a identidade e os valores catalães, agora com governança descentralizada através de Fan Tokens.",
    logo: "https://cryptologos.cc/logos/chiliz-chz-logo.png",
    bannerColor: "from-blue-600 to-red-600",
    stats: {
      totalStaked: 2500000,
      holders: 125789,
      availableRewards: 50000,
    },
    actions: [
      {
        type: "stake",
        title: "Stake BAR Tokens",
        description: "Faça stake dos seus tokens e ganhe recompensas exclusivas",
        buttonText: "Stake Tokens",
        active: true,
      },
      {
        type: "vote",
        title: "Votação Ativa",
        description: "Vote na arte do terceiro uniforme para a próxima temporada",
        buttonText: "Votar Agora",
        active: true,
      },
      {
        type: "mint",
        title: "NFTs Disponíveis",
        description: "Momentos históricos da Champions League 2015",
        buttonText: "Mint NFT",
        active: true,
      },
      {
        type: "feedback",
        title: "Feedback",
        description: "Compartilhe suas sugestões para melhorias no estádio",
        buttonText: "Dar Feedback",
        active: true,
      },
    ],
  },
};

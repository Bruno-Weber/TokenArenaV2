
import { ClubRanking } from "@/types/gamification";

// Mock data for club ranking
export const mockClubRankings: ClubRanking[] = [
  {
    id: "0x123456789abcdef123456789abcdef123456789a",
    name: "Barcelona",
    logo: "/images/barcelona.png",
    symbol: "BAR",
    interactions: 156789,
    holders: 25678,
    score: 9853,
    position: 1,
    change: 0,
    level: 9,
    achievements: [
      {
        id: "1",
        name: "Comunidade Ativa",
        description: "Mais de 100.000 interações em uma semana",
        icon: "activity",
        unlocked: true,
        points: 500,
      },
      {
        id: "2",
        name: "Hodlers Leais",
        description: "Mais de 20.000 hodlers por pelo menos 30 dias",
        icon: "users",
        unlocked: true,
        points: 300,
      },
      {
        id: "3",
        name: "Top da Liga",
        description: "Manteve-se no topo do ranking por 3 semanas",
        icon: "trophy",
        unlocked: true,
        points: 800,
      },
    ],
  },
  {
    id: "0x223456789abcdef123456789abcdef123456789b",
    name: "Manchester United",
    logo: "/images/manchesterunited.png",
    symbol: "MNU",
    interactions: 134502,
    holders: 22145,
    score: 8975,
    position: 2,
    change: 1,
    level: 8,
    achievements: [
      {
        id: "4",
        name: "Crescimento Explosivo",
        description: "Aumento de 30% no número de holders em uma semana",
        icon: "trending-up",
        unlocked: true,
        points: 400,
      },
      {
        id: "5",
        name: "Engajamento Máximo",
        description: "Mais de 50.000 votos em propostas",
        icon: "vote",
        unlocked: true,
        points: 350,
      },
    ],
  },
  {
    id: "0x323456789abcdef123456789abcdef123456789c",
    name: "Real Madrid",
    logo: "/images/realmadrid.png",
    symbol: "RMA",
    interactions: 128756,
    holders: 24567,
    score: 8732,
    position: 3,
    change: -1,
    level: 8,
    achievements: [
      {
        id: "6",
        name: "Popularidade Global",
        description: "Holders em mais de 50 países",
        icon: "globe",
        unlocked: true,
        points: 450,
      },
    ],
  },
  {
    id: "0x423456789abcdef123456789abcdef123456789d",
    name: "Los Angeles Lakers",
    logo: "/images/lakers.png",
    symbol: "LAK",
    interactions: 98765,
    holders: 18945,
    score: 6542,
    position: 4,
    change: 0,
    level: 7,
    achievements: [
      {
        id: "7",
        name: "Impulso de Crescimento",
        description: "Subiu 3 posições no ranking em um mês",
        icon: "trend-up",
        unlocked: true,
        points: 300,
      },
    ],
  },
  {
    id: "0x523456789abcdef123456789abcdef123456789e",
    name: "New York Yankees",
    logo: "/images/yankees.png",
    symbol: "YNK",
    interactions: 78954,
    holders: 15789,
    score: 5487,
    position: 5,
    change: 2,
    level: 6,
    achievements: [
      {
        id: "8",
        name: "Recém-chegado Promissor",
        description: "Entrou no top 5 em menos de 3 meses",
        icon: "star",
        unlocked: true,
        points: 350,
      },
    ],
  },
  {
    id: "0x623456789abcdef123456789abcdef123456789f",
    name: "Detroit Red Wings",
    logo: "/images/redwings.png",
    symbol: "RDW",
    interactions: 45678,
    holders: 9876,
    score: 3254,
    position: 6,
    change: -1,
    level: 5,
    achievements: [
      {
        id: "9",
        name: "Comunidade Engajada",
        description: "Mais de 10.000 comentários em propostas",
        icon: "message-square",
        unlocked: true,
        points: 200,
      },
    ],
  },
];

// Função para filtrar e ordenar os rankings com base nos filtros
export const getFilteredRankings = (
  filters: { period: string; category: string }
): ClubRanking[] => {
  let filteredRankings = [...mockClubRankings];
  
  // Simulando a filtragem com base no período (na vida real, isso viria do backend)
  if (filters.period === "week") {
    filteredRankings = filteredRankings.map(club => ({
      ...club,
      interactions: Math.floor(club.interactions * 0.2),
      holders: Math.floor(club.holders * 0.9),
      score: Math.floor(club.score * 0.8)
    }));
  } else if (filters.period === "month") {
    filteredRankings = filteredRankings.map(club => ({
      ...club,
      interactions: Math.floor(club.interactions * 0.6),
      holders: Math.floor(club.holders * 0.95),
      score: Math.floor(club.score * 0.9)
    }));
  }
  
  // Ordenar com base na categoria
  if (filters.category === "interactions") {
    filteredRankings.sort((a, b) => b.interactions - a.interactions);
  } else if (filters.category === "holders") {
    filteredRankings.sort((a, b) => b.holders - a.holders);
  } else {
    // Categoria geral - ordenar por pontuação
    filteredRankings.sort((a, b) => b.score - a.score);
  }
  
  // Atualizar posições após a ordenação
  return filteredRankings.map((club, index) => ({
    ...club,
    position: index + 1
  }));
};

// Benefícios para clubes em diferentes níveis do ranking
export const rankingBenefits = [
  {
    position: 1,
    benefits: [
      "Taxa zero para criação de NFTs",
      "Destaque na página inicial",
      "Eventos exclusivos para holders",
      "Badge de Clube Líder",
      "30% de desconto em taxas de transação"
    ]
  },
  {
    position: 2,
    benefits: [
      "50% de desconto na criação de NFTs",
      "Destaque na página de mercado",
      "Eventos especiais para holders",
      "Badge de Clube Elite",
      "20% de desconto em taxas de transação"
    ]
  },
  {
    position: 3,
    benefits: [
      "25% de desconto na criação de NFTs",
      "Destaque na página de clubes",
      "Badge de Clube Premium",
      "15% de desconto em taxas de transação"
    ]
  }
];

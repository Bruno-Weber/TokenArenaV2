
import { Vote } from "./types";
import barcelonaLogo from "@/assets/team-logos/barcelona.png";
import realMadridLogo from "@/assets/team-logos/real-madrid.png";
import lakersLogo from "@/assets/team-logos/lakers.png";
import yankeesLogo from "@/assets/team-logos/yankees.png";
import manUtdLogo from "@/assets/team-logos/man-utd.png";

export const mockActiveVotes: Vote[] = [
  {
    id: "1",
    title: "Novo design do uniforme para próxima temporada",
    description: "Escolha entre as propostas de uniformes para representar o clube na próxima temporada.",
    deadline: "3 dias",
    options: ["Design Tradicional", "Design Moderno"],
    results: {
      "Design Tradicional": 245,
      "Design Moderno": 178
    },
    clubId: "barcelona",
    clubName: "FC Barcelona",
    clubLogo: barcelonaLogo,
    tokenSymbol: "BAR"
  },
  {
    id: "2",
    title: "Local da festa de aniversário do clube",
    description: "Ajude a diretoria a decidir onde será realizada a comemoração de aniversário do clube.",
    deadline: "5 dias",
    options: ["Estádio do Clube", "Centro de Treinamento", "Hotel Parceiro"],
    results: {
      "Estádio do Clube": 342,
      "Centro de Treinamento": 156,
      "Hotel Parceiro": 203
    },
    clubId: "lakers",
    clubName: "Los Angeles Lakers",
    clubLogo: lakersLogo,
    tokenSymbol: "LAK"
  },
  {
    id: "3",
    title: "Música para entrada em campo",
    description: "Qual música deve tocar quando nossos jogadores entrarem em campo na próxima temporada?",
    deadline: "7 dias",
    options: ["Manter a atual", "Nova composição", "Clássico do rock"],
    results: {
      "Manter a atual": 198,
      "Nova composição": 243,
      "Clássico do rock": 187
    },
    clubId: "real-madrid",
    clubName: "Real Madrid",
    clubLogo: realMadridLogo,
    tokenSymbol: "RMA"
  }
];

export const mockPastVotes: Vote[] = [
  {
    id: "4",
    title: "Nome da mascote oficial",
    description: "Vote no nome da nova mascote que representará o clube em eventos e jogos.",
    deadline: "12/03/2025",
    options: ["Leão", "Tigre", "Águia"],
    results: {
      "Leão": 452,
      "Tigre": 318,
      "Águia": 570
    },
    comments: [
      "A águia venceu com 42.5% dos votos e será nossa nova mascote!",
      "Agradecemos a participação de todos os torcedores nesta decisão importante."
    ],
    clubId: "yankees",
    clubName: "New York Yankees",
    clubLogo: yankeesLogo,
    tokenSymbol: "YNK"
  },
  {
    id: "5",
    title: "Destino da pré-temporada",
    description: "Onde o time deve realizar a pré-temporada para melhor preparação?",
    deadline: "28/02/2025",
    options: ["Europa", "Estados Unidos", "Brasil"],
    results: {
      "Europa": 486,
      "Estados Unidos": 302,
      "Brasil": 413
    },
    comments: [
      "A diretoria acatou a decisão dos torcedores e a pré-temporada será na Europa.",
      "Os treinos acontecerão em centros esportivos de alto nível para maximizar a preparação do time."
    ],
    clubId: "man-utd",
    clubName: "Manchester United",
    clubLogo: manUtdLogo,
    tokenSymbol: "MNU"
  }
];

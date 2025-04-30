
import { Language } from "@/types/language";

export const languageOptions = [
  { value: 'pt', label: 'Português', flag: '🇧🇷' },
  { value: 'en', label: 'English', flag: '🇺🇸' },
  { value: 'fr', label: 'Français', flag: '🇫🇷' },
  { value: 'es', label: 'Español', flag: '🇪🇸' }
];

export const translations = {
  gamification: {
    title: {
      pt: 'Ranking dos Clubes',
      en: 'Club Rankings',
      fr: 'Classements des Clubs',
      es: 'Clasificación de Clubes'
    },
    description: {
      pt: 'Acompanhe os clubes com maior engajamento e quantidade de holders na plataforma. Clubes no topo do ranking receberão benefícios exclusivos!',
      en: 'Track the clubs with the highest engagement and number of holders on the platform. Top-ranked clubs will receive exclusive benefits!',
      fr: 'Suivez les clubs avec le plus grand engagement et le nombre de détenteurs sur la plateforme. Les clubs les mieux classés recevront des avantages exclusifs!',
      es: 'Sigue a los clubes con mayor participación y cantidad de holders en la plataforma. ¡Los clubes mejor clasificados recibirán beneficios exclusivos!'
    },
    howItWorks: {
      title: {
        pt: 'Como funciona o ranking?',
        en: 'How does the ranking work?',
        fr: 'Comment fonctionne le classement?',
        es: '¿Cómo funciona la clasificación?'
      },
      description: {
        pt: 'Pontos são calculados com base em:',
        en: 'Points are calculated based on:',
        fr: 'Les points sont calculés en fonction de:',
        es: 'Los puntos se calculan en base a:'
      },
      holders: {
        pt: 'Número total de holders (60%)',
        en: 'Total number of holders (60%)',
        fr: 'Nombre total de détenteurs (60%)',
        es: 'Número total de holders (60%)'
      },
      interactions: {
        pt: 'Volume de interações na plataforma (30%)',
        en: 'Volume of interactions on the platform (30%)',
        fr: 'Volume d\'interactions sur la plateforme (30%)',
        es: 'Volumen de interacciones en la plataforma (30%)'
      },
      voting: {
        pt: 'Participação em votações (10%)',
        en: 'Participation in voting (10%)',
        fr: 'Participation aux votes (10%)',
        es: 'Participación en votaciones (10%)'
      }
    },
    tabs: {
      leaderboard: {
        pt: 'Leaderboard',
        en: 'Leaderboard',
        fr: 'Classement',
        es: 'Tabla de Clasificación'
      },
      benefits: {
        pt: 'Benefícios',
        en: 'Benefits',
        fr: 'Avantages',
        es: 'Beneficios'
      }
    },
    top3Clubs: {
      pt: 'Top 3 Clubes',
      en: 'Top 3 Clubs',
      fr: 'Top 3 Clubs',
      es: 'Top 3 Clubes'
    },
    otherClubs: {
      pt: 'Outros Clubes no Ranking',
      en: 'Other Ranked Clubs',
      fr: 'Autres Clubs Classés',
      es: 'Otros Clubes en el Ranking'
    },
    points: {
      pt: 'pontos',
      en: 'points',
      fr: 'points',
      es: 'puntos'
    },
    holders: {
      pt: 'holders',
      en: 'holders',
      fr: 'détenteurs',
      es: 'holders'
    },
    benefits: {
      introduction: {
        pt: 'Os clubes no topo do ranking recebem benefícios especiais que incentivam ainda mais o engajamento da comunidade e a valorização do token.',
        en: 'Top-ranking clubs receive special benefits that further encourage community engagement and token appreciation.',
        fr: 'Les clubs les mieux classés reçoivent des avantages spéciaux qui encouragent davantage l\'engagement communautaire et l\'appréciation des tokens.',
        es: 'Los clubes mejor clasificados reciben beneficios especiales que fomentan aún más la participación de la comunidad y la apreciación del token.'
      },
      firstPlace: {
        pt: 'Primeiro Lugar',
        en: 'First Place',
        fr: 'Première Place',
        es: 'Primer Lugar'
      },
      secondPlace: {
        pt: 'Segundo Lugar',
        en: 'Second Place',
        fr: 'Deuxième Place',
        es: 'Segundo Lugar'
      },
      thirdPlace: {
        pt: 'Terceiro Lugar',
        en: 'Third Place',
        fr: 'Troisième Place',
        es: 'Tercer Lugar'
      },
      forPlace: {
        pt: 'Para o',
        en: 'For the',
        fr: 'Pour la',
        es: 'Para el'
      },
      weeklyRanking: {
        pt: 'º lugar no ranking semanal',
        en: 'place in the weekly ranking',
        fr: 'place au classement hebdomadaire',
        es: 'lugar en el ranking semanal'
      }
    },
    filters: {
      title: {
        pt: 'Filtros',
        en: 'Filters',
        fr: 'Filtres',
        es: 'Filtros'
      },
      subtitle: {
        pt: 'Personalize o ranking',
        en: 'Customize the ranking',
        fr: 'Personnaliser le classement',
        es: 'Personalizar la clasificación'
      },
      period: {
        label: {
          pt: 'Período',
          en: 'Period',
          fr: 'Période',
          es: 'Período'
        },
        week: {
          pt: 'Esta semana',
          en: 'This week',
          fr: 'Cette semaine',
          es: 'Esta semana'
        },
        month: {
          pt: 'Este mês',
          en: 'This month',
          fr: 'Ce mois',
          es: 'Este mes'
        },
        allTime: {
          pt: 'Todos os tempos',
          en: 'All time',
          fr: 'Tout temps',
          es: 'Todo el tiempo'
        }
      },
      category: {
        label: {
          pt: 'Categoria',
          en: 'Category',
          fr: 'Catégorie',
          es: 'Categoría'
        },
        overall: {
          pt: 'Geral',
          en: 'Overall',
          fr: 'Général',
          es: 'General'
        },
        interactions: {
          pt: 'Interações',
          en: 'Interactions',
          fr: 'Interactions',
          es: 'Interacciones'
        },
        holders: {
          pt: 'Holders',
          en: 'Holders',
          fr: 'Détenteurs',
          es: 'Holders'
        }
      }
    },
    highlights: {
      title: {
        pt: 'Destaques da Semana',
        en: 'Weekly Highlights',
        fr: 'Faits Marquants de la Semaine',
        es: 'Destacados de la Semana'
      },
      subtitle: {
        pt: 'Mudanças significativas',
        en: 'Significant changes',
        fr: 'Changements significatifs',
        es: 'Cambios significativos'
      },
      biggestGrowth: {
        pt: 'Maior crescimento',
        en: 'Biggest growth',
        fr: 'Plus forte croissance',
        es: 'Mayor crecimiento'
      },
      biggestDrop: {
        pt: 'Maior queda',
        en: 'Biggest drop',
        fr: 'Plus forte baisse',
        es: 'Mayor caída'
      },
      newHolders: {
        pt: 'Novos holders',
        en: 'New holders',
        fr: 'Nouveaux détenteurs',
        es: 'Nuevos holders'
      },
      lastWeek: {
        pt: 'na última semana',
        en: 'in the last week',
        fr: 'dans la dernière semaine',
        es: 'en la última semana'
      },
      viewFullReport: {
        pt: 'Ver relatório completo',
        en: 'View full report',
        fr: 'Voir le rapport complet',
        es: 'Ver informe completo'
      }
    },
    reportGenerated: {
      title: {
        pt: 'Relatório gerado',
        en: 'Report generated',
        fr: 'Rapport généré',
        es: 'Informe generado'
      },
      description: {
        pt: 'O relatório completo de estatísticas foi enviado ao seu email.',
        en: 'The complete statistics report has been sent to your email.',
        fr: 'Le rapport statistique complet a été envoyé à votre email.',
        es: 'El informe completo de estadísticas ha sido enviado a tu correo electrónico.'
      }
    },
    // RankingCard translations
    rankingCard: {
      points: {
        pt: 'pontos',
        en: 'points',
        fr: 'points',
        es: 'puntos'
      },
      interactions: {
        pt: 'Interações',
        en: 'Interactions',
        fr: 'Interactions',
        es: 'Interacciones'
      },
      holders: {
        pt: 'Holders',
        en: 'Holders',
        fr: 'Détenteurs',
        es: 'Holders'
      },
      level: {
        pt: 'Nível',
        en: 'Level',
        fr: 'Niveau',
        es: 'Nivel'
      },
      recentAchievements: {
        pt: 'Conquistas recentes',
        en: 'Recent achievements',
        fr: 'Réalisations récentes',
        es: 'Logros recientes'
      },
      viewDetails: {
        pt: 'Ver detalhes',
        en: 'View details',
        fr: 'Voir les détails',
        es: 'Ver detalles'
      }
    }
  }
};

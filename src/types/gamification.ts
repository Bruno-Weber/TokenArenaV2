
export interface ClubRanking {
  id: string;
  name: string;
  logo: string;
  symbol: string;
  interactions: number;
  holders: number;
  score: number;
  position: number;
  change: number; // Position change compared to last week (positive or negative)
  level: number;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  points: number;
}

export interface LeaderboardFilter {
  period: 'week' | 'month' | 'allTime';
  category: 'overall' | 'interactions' | 'holders';
}

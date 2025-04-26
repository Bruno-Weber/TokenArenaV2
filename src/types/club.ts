
export interface ClubStats {
  totalStaked: number;
  holders: number;
  availableRewards: number;
}

export interface ClubAction {
  type: 'stake' | 'unstake' | 'mint' | 'vote' | 'feedback';
  title: string;
  description: string;
  buttonText: string;
  active?: boolean;
}

export interface Club {
  id: string;
  name: string;
  symbol: string;
  description: string;
  logo: string;
  bannerColor: string;
  stats: ClubStats;
  actions: ClubAction[];
}

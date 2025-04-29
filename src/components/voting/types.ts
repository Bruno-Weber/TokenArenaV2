
export interface Vote {
  id: string;
  title: string;
  description: string;
  deadline: string;
  options: string[];
  results?: Record<string, number>;
  comments?: string[];
  clubId: string;
  clubName: string;
  clubLogo: string;
  tokenSymbol: string;
}

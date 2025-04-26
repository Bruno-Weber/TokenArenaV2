
import { ClubStats as ClubStatsType } from "@/types/club";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Coins, Trophy } from "lucide-react";

interface ClubStatsProps {
  stats: ClubStatsType;
}

const ClubStats = ({ stats }: ClubStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Coins className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total em Stake</p>
              <p className="text-2xl font-bold">{stats.totalStaked.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total de Holders</p>
              <p className="text-2xl font-bold">{stats.holders.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Recompensas Disponíveis</p>
              <p className="text-2xl font-bold">{stats.availableRewards.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClubStats;

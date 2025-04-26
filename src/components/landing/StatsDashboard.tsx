
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Users, TrendingUp } from "lucide-react";

const stats = [
  {
    title: "Fan Tokens Stakeados",
    value: "2.5M+",
    icon: <Trophy className="h-6 w-6 text-chiliz-primary" />,
  },
  {
    title: "Votações Ativas",
    value: "150+",
    icon: <Users className="h-6 w-6 text-chiliz-secondary" />,
  },
  {
    title: "Total de NFTs",
    value: "10K+",
    icon: <TrendingUp className="h-6 w-6 text-chiliz-accent" />,
  },
];

const StatsDashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 py-12">
      {stats.map((stat) => (
        <Card key={stat.title} className="card-sports transform hover:scale-105 transition-transform">
          <CardContent className="flex items-center p-6 space-x-4">
            <div className="rounded-full bg-background p-3 ring-2 ring-chiliz-primary/10">
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsDashboard;

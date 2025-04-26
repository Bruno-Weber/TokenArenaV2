
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import AppLayout from "@/components/AppLayout";
import { ChevronRight, Users, Trophy, Calendar, Star } from "lucide-react";

// Mock team data
const teams = [
  {
    id: 1,
    name: "Barcelona",
    category: "soccer",
    logo: "https://cryptologos.cc/logos/chiliz-chz-logo.png",
    tokenSymbol: "BAR",
    supporters: 125789,
    ranking: 1,
    engagement: 87,
    upcomingEvents: 3,
    achievements: ["2023 Champion", "Most Active Community", "Highest Token Value"],
  },
  {
    id: 2,
    name: "Los Angeles Lakers",
    category: "basketball",
    logo: "https://cryptologos.cc/logos/chiliz-chz-logo.png",
    tokenSymbol: "LAK",
    supporters: 98654,
    ranking: 3,
    engagement: 79,
    upcomingEvents: 2,
    achievements: ["2024 Runner-up", "Most Fan Votes", "Rising Token"],
  },
  {
    id: 3,
    name: "Manchester United",
    category: "soccer",
    logo: "https://cryptologos.cc/logos/chiliz-chz-logo.png",
    tokenSymbol: "MNU",
    supporters: 114532,
    ranking: 2,
    engagement: 82,
    upcomingEvents: 4,
    achievements: ["2023 Cup Winner", "Community Growth Award"],
  },
  {
    id: 4,
    name: "New York Yankees",
    category: "baseball",
    logo: "https://cryptologos.cc/logos/chiliz-chz-logo.png",
    tokenSymbol: "YNK",
    supporters: 87421,
    ranking: 4,
    engagement: 75,
    upcomingEvents: 1,
    achievements: ["2024 Season Leaders", "Token Stability Award"],
  },
  {
    id: 5,
    name: "Detroit Red Wings",
    category: "hockey",
    logo: "https://cryptologos.cc/logos/chiliz-chz-logo.png",
    tokenSymbol: "RDW",
    supporters: 65789,
    ranking: 7,
    engagement: 68,
    upcomingEvents: 2,
    achievements: ["Most Improved Community"],
  },
  {
    id: 6,
    name: "Real Madrid",
    category: "soccer",
    logo: "https://cryptologos.cc/logos/chiliz-chz-logo.png",
    tokenSymbol: "RMA",
    supporters: 132456,
    ranking: 5,
    engagement: 84,
    upcomingEvents: 3,
    achievements: ["2023 European Champions", "Highest Participation Rate"],
  },
];

const Teams = () => {
  const { toast } = useToast();
  
  const handleFollow = (teamName: string) => {
    toast({
      title: "Team Followed",
      description: `You are now following ${teamName}. You'll receive updates about events and votes.`,
    });
  };
  
  return (
    <AppLayout>
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-2">Sports Teams</h1>
        <p className="text-muted-foreground mb-8">Follow your favorite teams and participate in their community</p>
        
        {/* Sport Categories */}
        <Tabs defaultValue="all" className="w-full mb-8">
          <TabsList>
            <TabsTrigger value="all">All Sports</TabsTrigger>
            <TabsTrigger value="soccer">Soccer</TabsTrigger>
            <TabsTrigger value="basketball">Basketball</TabsTrigger>
            <TabsTrigger value="baseball">Baseball</TabsTrigger>
            <TabsTrigger value="hockey">Hockey</TabsTrigger>
          </TabsList>
        </Tabs>
        
        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map(team => (
            <TeamCard 
              key={team.id}
              team={team}
              onFollow={() => handleFollow(team.name)}
            />
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

interface TeamCardProps {
  team: {
    id: number;
    name: string;
    category: string;
    logo: string;
    tokenSymbol: string;
    supporters: number;
    ranking: number;
    engagement: number;
    upcomingEvents: number;
    achievements: string[];
  };
  onFollow: () => void;
}

const TeamCard = ({ team, onFollow }: TeamCardProps) => {
  return (
    <Card className="card-sports overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200">
              <img
                src={team.logo}
                alt={`${team.name} logo`}
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg";
                }}
              />
            </div>
            <div>
              <CardTitle>{team.name}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Badge variant="outline" className="font-mono">
                  ${team.tokenSymbol}
                </Badge>
                <Badge 
                  variant="secondary" 
                  className="capitalize"
                >
                  {team.category}
                </Badge>
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Supporters</span>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{team.supporters.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Global Ranking</span>
            <div className="flex items-center gap-1">
              <Trophy className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">#{team.ranking}</span>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-muted-foreground">Community Engagement</span>
            <span className="text-sm font-medium">{team.engagement}%</span>
          </div>
          <Progress value={team.engagement} className="h-2" />
        </div>
        
        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{team.upcomingEvents} upcoming events</span>
          </div>
          <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
            View Calendar
          </Button>
        </div>
        
        <div className="space-y-1">
          <span className="text-sm text-muted-foreground">Team Achievements</span>
          <div className="flex flex-wrap gap-2">
            {team.achievements.map((achievement, index) => (
              <Badge key={index} variant="outline" className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-current text-yellow-500" />
                {achievement}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-4">
        <Button 
          className="w-full bg-chiliz-primary hover:bg-chiliz-primary/90"
          onClick={onFollow}
        >
          Follow Team
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Teams;

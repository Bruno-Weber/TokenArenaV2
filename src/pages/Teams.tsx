import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import AppLayout from "@/components/AppLayout";
import { ChevronRight, Users, Trophy, Calendar, Star } from "lucide-react";
import { useTranslation } from "react-i18next";

// Mock team data
const teams = [
  {
    id: 1,
    name: "Barcelona",
    category: "soccer",
    logo: "/images/barcelona.png",
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
    logo: "/images/lakers.png",
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
    logo: "/images/manchesterunited.png",
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
    logo: "/images/yankees.png",
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
    logo: "/images/redwings.png",
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
    logo: "/images/realmadrid.png",
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
  const { t } = useTranslation();
  
  const handleFollow = (teamName: string) => {
    toast({
      title: t('teams.teamFollowed'),
      description: t('teams.teamFollowedDesc', { teamName }),
    });
  };
  
  return (
    <AppLayout>
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-2">{t('teams.title')}</h1>
        <p className="text-muted-foreground mb-8">{t('teams.subtitle')}</p>
        
        {/* Sport Categories */}
        <Tabs defaultValue="all" className="w-full mb-8">
          <TabsList>
            <TabsTrigger value="all">{t('teams.allSports')}</TabsTrigger>
            <TabsTrigger value="soccer">{t('teams.soccer')}</TabsTrigger>
            <TabsTrigger value="basketball">{t('teams.basketball')}</TabsTrigger>
            <TabsTrigger value="baseball">{t('teams.baseball')}</TabsTrigger>
            <TabsTrigger value="hockey">{t('teams.hockey')}</TabsTrigger>
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
  const { t } = useTranslation();
  return (
    <Card className="relative overflow-hidden transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-black/20 to-black/10 backdrop-blur-xl border border-white/10 hover:border-white/20 group">
      <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      <CardHeader className="pb-2 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20 bg-black/30 p-1 backdrop-blur-sm">
              <img
                src={team.logo}
                alt={`${team.name} logo`}
                className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg";
                }}
              />
            </div>
            <div>
              <CardTitle className="text-gradient group-hover:bg-gradient-to-r group-hover:from-violet-300 group-hover:to-fuchsia-300">
                {team.name}
              </CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Badge variant="outline" className="font-mono border-white/20 bg-black/30">
                  ${team.tokenSymbol}
                </Badge>
                <Badge 
                  variant="secondary" 
                  className="capitalize bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 border border-white/10"
                >
                  {team.category}
                </Badge>
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2 relative">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">{t('teams.supporters')}</span>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{team.supporters.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">{t('teams.globalRanking')}</span>
            <div className="flex items-center gap-1">
              <Trophy className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">#{team.ranking}</span>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-muted-foreground">{t('teams.communityEngagement')}</span>
            <span className="text-sm font-medium">{team.engagement}%</span>
          </div>
          <Progress value={team.engagement} className="h-2" />
        </div>
        
        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{team.upcomingEvents} {t('teams.upcomingEvents')}</span>
          </div>
          <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
            {t('teams.viewCalendar')}
          </Button>
        </div>
        
        <div className="space-y-1">
          <span className="text-sm text-muted-foreground">{t('teams.teamAchievements')}</span>
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
      
      <CardFooter className="pt-4 relative">
        <Button 
          className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:opacity-90 transition-opacity"
          onClick={onFollow}
        >
          {t('teams.followTeam')}
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Teams;


import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Trophy, TrendingUp, TrendingDown, Users, Star, Award } from "lucide-react";
import { ClubRanking } from '@/types/gamification';
import { useTranslation } from 'react-i18next';

interface RankingCardProps {
  club: ClubRanking;
  showDetails?: boolean;
}

const RankingCard = ({ club, showDetails = false }: RankingCardProps) => {
  const { t } = useTranslation();
  const { id, name, logo, position, score, interactions, holders, change, level, achievements, symbol } = club;
  
  // Calculate progress to next level (just for visual purposes)
  const levelProgress = Math.min(((score % 1000) / 1000) * 100, 100);
  
  return (
    <Card className="overflow-hidden transition-all duration-300 border border-white/10 hover:border-white/20 group relative">
      {/* Position indicator */}
      <div className="absolute top-0 left-0 w-10 h-10 bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-lg rounded-br-md">
        {position}
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <CardHeader className="pt-8 pb-2 relative">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20 bg-black/30 p-1 backdrop-blur-sm mr-3">
            <img
              src={logo}
              alt={`${name} logo`}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              {name}
              <Badge variant="outline" className="font-mono border-white/20 bg-black/30">
                ${symbol}
              </Badge>
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Trophy className="h-3 w-3" /> {score.toLocaleString()} {t('gamification.points')}
              </span>
              {change !== 0 && (
                <span className={`flex items-center gap-1 ${change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {change > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {Math.abs(change)}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">{t('gamification.interactions')}</p>
            <p className="font-semibold">{interactions.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">{t('gamification.holders')}</p>
            <p className="font-semibold flex items-center gap-1">
              <Users className="h-3 w-3" /> {holders.toLocaleString()}
            </p>
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">{t('gamification.level')} {level}</span>
            <span className="text-xs font-medium">{t('gamification.level')} {level + 1}</span>
          </div>
          <Progress value={levelProgress} className="h-1.5" />
        </div>
        
        {showDetails && achievements.length > 0 && (
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">{t('gamification.recentAchievements', 'Conquistas recentes')}</p>
            <div className="flex flex-wrap gap-1">
              {achievements.filter(a => a.unlocked).slice(0, 3).map((achievement) => (
                <Badge key={achievement.id} variant="secondary" className="flex items-center gap-1 text-xs">
                  <Award className="h-3 w-3 text-yellow-500" />
                  {achievement.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-2">
        <Button variant="ghost" className="w-full text-xs" asChild>
          <Link to={`/club/${id}`}>{t('gamification.viewProfile')}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RankingCard;

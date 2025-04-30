import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import AppLayout from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Trophy, Award, Star, TrendingUp, Medal, ChevronRight } from "lucide-react";
import RankingCard from "@/components/gamification/RankingCard";
import LeaderboardFilters from "@/components/gamification/LeaderboardFilters";
import { mockClubRankings, getFilteredRankings, rankingBenefits } from "@/lib/mockGamificationData";
import { LeaderboardFilter } from '@/types/gamification';
import { useLanguage } from '@/contexts/LanguageContext';

const Gamification = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [filters, setFilters] = useState<LeaderboardFilter>({
    period: 'week',
    category: 'overall'
  });
  
  const handleFilterChange = (newFilters: LeaderboardFilter) => {
    setFilters(newFilters);
  };
  
  const filteredRankings = getFilteredRankings(filters);
  const topThreeClubs = filteredRankings.slice(0, 3);
  const otherClubs = filteredRankings.slice(3);
  
  return (
    <AppLayout>
      <div className="py-8">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <Trophy className="h-8 w-8 text-yellow-500" />
              {t('gamification.title', 'Club Rankings')}
            </h1>
            <p className="text-muted-foreground">
              {t('gamification.description', 'Track the clubs with the highest engagement and number of holders on the platform.')}
            </p>
          </div>
          <Card className="w-full md:w-auto bg-gradient-to-r from-violet-900/30 to-fuchsia-900/30 border-violet-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{t('gamification.howItWorks.title', 'How does the ranking work?')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="text-muted-foreground">
                {t('gamification.howItWorks.description', 'Points are calculated based on:')}
              </p>
              <ul className="space-y-1 list-disc pl-5 text-muted-foreground text-xs">
                <li>{t('gamification.howItWorks.holders', 'Total number of holders (60%)')}</li>
                <li>{t('gamification.howItWorks.interactions', 'Volume of interactions on the platform (30%)')}</li>
                <li>{t('gamification.howItWorks.voting', 'Participation in voting (10%)')}</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="leaderboard">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="leaderboard">{t('gamification.tabs.leaderboard', 'Leaderboard')}</TabsTrigger>
                <TabsTrigger value="benefits">{t('gamification.tabs.benefits', 'Benefits')}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="leaderboard" className="space-y-8">
                {/* Top 3 Clubs - Highlighted */}
                <div>
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Medal className="h-5 w-5 text-yellow-500" />
                    {t('gamification.top3Clubs', 'Top 3 Clubs')}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {topThreeClubs.map((club) => (
                      <div 
                        key={club.id} 
                        className={`transform ${
                          club.position === 1 ? 'md:-translate-y-2' : ''
                        }`}
                      >
                        <RankingCard club={club} showDetails={club.position === 1} />
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Other ranked clubs */}
                <div>
                  <h2 className="text-lg font-semibold mb-4">{t('gamification.otherClubs', 'Other Ranked Clubs')}</h2>
                  <div className="space-y-4">
                    {otherClubs.map((club) => (
                      <Card key={club.id} className="border border-white/10 hover:border-white/20 group">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 flex items-center justify-center text-lg font-semibold text-muted-foreground">
                                {club.position}
                              </div>
                              
                              <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 bg-black/30 p-1">
                                <img
                                  src={club.logo}
                                  alt={`${club.name} logo`}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                              
                              <div>
                                <h3 className="font-medium">{club.name}</h3>
                                <div className="text-xs text-muted-foreground flex items-center gap-2">
                                  <span>{club.score.toLocaleString()} {t('gamification.points', 'points')}</span>
                                  <span>•</span>
                                  <span>{club.holders.toLocaleString()} {t('gamification.holders', 'holders')}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <span className={`text-sm ${club.change > 0 ? 'text-green-400' : club.change < 0 ? 'text-red-400' : 'text-muted-foreground'}`}>
                                {club.change > 0 ? `+${club.change}` : club.change}
                              </span>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="benefits">
                <div className="space-y-6">
                  <p className="text-muted-foreground">
                    {t('gamification.benefits.introduction', 'Top-ranking clubs receive special benefits that further encourage community engagement and token appreciation.')}
                  </p>
                  
                  {rankingBenefits.map((item) => (
                    <Card key={`benefits-${item.position}`} className="border border-white/10 overflow-hidden">
                      <CardHeader className="pb-2 bg-gradient-to-r from-violet-900/30 to-fuchsia-900/30 border-b border-violet-500/20">
                        <CardTitle className="flex items-center gap-2">
                          {item.position === 1 && (
                            <Award className="h-5 w-5 text-yellow-500" />
                          )}
                          {item.position === 2 && (
                            <Award className="h-5 w-5 text-gray-300" />
                          )}
                          {item.position === 3 && (
                            <Award className="h-5 w-5 text-amber-700" />
                          )}
                          {item.position === 1 ? t('gamification.benefits.firstPlace', 'First Place') : 
                           item.position === 2 ? t('gamification.benefits.secondPlace', 'Second Place') : 
                           t('gamification.benefits.thirdPlace', 'Third Place')}
                        </CardTitle>
                        <CardDescription>
                          {t('gamification.benefits.forPlace', 'For the')} {item.position}
                          {t('gamification.benefits.weeklyRanking', 'place in the weekly ranking')}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <ul className="space-y-2">
                          {item.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Star className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <Card className="border border-white/10 sticky top-24">
              <CardHeader className="pb-2">
                <CardTitle>{t('gamification.filters.title', 'Filters')}</CardTitle>
                <CardDescription>{t('gamification.filters.subtitle', 'Customize the ranking')}</CardDescription>
              </CardHeader>
              <CardContent>
                <LeaderboardFilters 
                  filters={filters}
                  onChange={handleFilterChange}
                />
              </CardContent>
            </Card>
            
            <Card className="border border-white/10 mt-6">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  {t('gamification.highlights.title', 'Weekly Highlights')}
                </CardTitle>
                <CardDescription>{t('gamification.highlights.subtitle', 'Significant changes')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium">{t('gamification.highlights.biggestGrowth', 'Biggest growth')}</p>
                  <p className="text-muted-foreground text-sm">New York Yankees +2</p>
                </div>
                <div>
                  <p className="text-sm font-medium">{t('gamification.highlights.biggestDrop', 'Biggest drop')}</p>
                  <p className="text-muted-foreground text-sm">Real Madrid -1</p>
                </div>
                <div>
                  <p className="text-sm font-medium">{t('gamification.highlights.newHolders', 'New holders')}</p>
                  <p className="text-muted-foreground text-sm">+15.789 {t('gamification.highlights.lastWeek', 'in the last week')}</p>
                </div>
                <Button variant="outline" className="w-full" onClick={() => {
                  toast({
                    title: t('gamification.reportGenerated.title', 'Report generated'),
                    description: t('gamification.reportGenerated.description', 'The complete statistics report has been sent to your email.')
                  });
                }}>
                  {t('gamification.highlights.viewFullReport', 'View full report')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Gamification;

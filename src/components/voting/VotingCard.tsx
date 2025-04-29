
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Users, CheckCircle2, Clock, Coins } from "lucide-react";
import { cn } from "@/lib/utils";
import { Vote } from "./types";

interface VotingCardProps {
  vote: Vote;
  userVote?: string;
  onVote?: (option: string) => void;
  isActive: boolean;
}

const VotingCard = ({ vote, userVote, onVote, isActive }: VotingCardProps) => {
  const hasVoted = !!userVote;
  const totalVotes = vote.results 
    ? Object.values(vote.results).reduce((a, b) => a + b, 0)
    : 0;
    
  const getPercentage = (value: number) => {
    return totalVotes === 0 ? 0 : Math.round((value / totalVotes) * 100);
  };

  // Mock token balance for the user - in a real app this would come from a wallet or API
  const tokenBalance = (Math.random() * 100).toFixed(2);

  return (
    <Card className="overflow-hidden border-2 hover:border-purple-500/50 transition-all duration-300">
      <CardHeader className={cn(
        "bg-gradient-to-r pb-4",
        isActive 
          ? "from-purple-600/10 to-purple-400/10" 
          : "from-gray-800 to-gray-900"
      )}>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 rounded-md border-2 border-white/10">
              <AvatarImage src={vote.clubLogo} alt={vote.clubName} />
              <AvatarFallback className="bg-purple-900/50 text-white font-bold">
                {vote.tokenSymbol.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl text-white">{vote.title}</CardTitle>
              <CardDescription className="mt-1 text-gray-400">{vote.description}</CardDescription>
            </div>
          </div>
          {isActive ? (
            <Badge variant="outline" className="bg-purple-500/20 text-purple-300 border-purple-500">
              <Clock className="mr-1 h-3 w-3" /> Aberta
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-gray-700 text-gray-300 border-gray-600">
              Encerrada
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              {isActive ? (
                <span>Encerra em {vote.deadline}</span>
              ) : (
                <span>Encerrada em {vote.deadline}</span>
              )}
            </div>
            <div className="flex items-center">
              <Users className="mr-1 h-4 w-4" />
              <span>{totalVotes} votos</span>
            </div>
          </div>
          
          <div className="flex items-center bg-purple-500/10 px-3 py-1.5 rounded-full">
            <Coins className="h-4 w-4 text-purple-400 mr-2" />
            <span className="text-sm font-medium text-purple-300">
              {tokenBalance} {vote.tokenSymbol}
            </span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6 space-y-4 bg-gray-900/50">
        {isActive && !hasVoted ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {vote.options.map((option) => (
              <Button
                key={option}
                variant="outline"
                className="h-12 text-lg font-medium border-2 border-purple-500/30 hover:border-purple-500 hover:bg-purple-500/10 hover:text-purple-300 transition-all"
                onClick={() => onVote?.(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {vote.options.map((option) => {
              const count = vote.results?.[option] || 0;
              const percentage = getPercentage(count);
              const isUserVote = userVote === option;
              
              return (
                <div key={option} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="font-medium text-white">{option}</span>
                      {isUserVote && (
                        <CheckCircle2 className="ml-2 h-4 w-4 text-purple-500" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-purple-300">{percentage}%</span>
                  </div>
                  <Progress 
                    value={percentage} 
                    className={cn(
                      "h-3 rounded-md", 
                      isUserVote ? "bg-purple-500/20" : "bg-gray-800"
                    )} 
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    {count} {count === 1 ? "voto" : "votos"}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
      
      <CardFooter className={cn(
        "bg-gray-900/50 border-t flex-col items-start",
        hasVoted && "bg-purple-500/5"
      )}>
        {vote.comments && vote.comments.length > 0 && (
          <div className="w-full">
            <h4 className="text-sm font-medium mb-2 text-white">Comentários da diretoria:</h4>
            <div className="space-y-2">
              {vote.comments.map((comment, index) => (
                <p key={index} className="text-sm text-gray-400">
                  {comment}
                </p>
              ))}
            </div>
          </div>
        )}
        
        {hasVoted && isActive && (
          <div className="flex items-center mt-3 text-sm text-purple-500">
            <CheckCircle2 className="mr-1 h-4 w-4" />
            <span>Você votou em: <strong>{userVote}</strong></span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default VotingCard;

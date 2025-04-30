
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import VotingCard from "./VotingCard";
import { mockActiveVotes, mockPastVotes } from "./mockVotingData";
import { useTranslation } from "react-i18next";

const VotingList = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [votes, setVotes] = useState<Record<string, string>>({});

  const handleVote = (voteId: string, option: string) => {
    // Check if already voted
    if (votes[voteId]) {
      toast({
        title: t('voting.alreadyVoted'),
        description: t('voting.alreadyVotedDesc'),
        variant: "default",
      });
      return;
    }

    // Simulate vote submission
    setVotes(prev => ({ ...prev, [voteId]: option }));
    
    // Show success message with confetti animation
    toast({
      title: t('voting.voteSubmitted'),
      description: t('voting.voteSubmittedDesc'),
      variant: "default",
    });
    
    // Trigger confetti animation
    const confettiEvent = new CustomEvent('triggerConfetti', {
      detail: { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    });
    window.dispatchEvent(confettiEvent);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="active">{t('voting.activeVotes')}</TabsTrigger>
          <TabsTrigger value="past">{t('voting.pastVotes')}</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-6 space-y-6">
          {mockActiveVotes.map((vote) => (
            <VotingCard
              key={vote.id}
              vote={vote}
              userVote={votes[vote.id]}
              onVote={(option) => handleVote(vote.id, option)}
              isActive={true}
            />
          ))}
        </TabsContent>
        <TabsContent value="past" className="mt-6 space-y-6">
          {mockPastVotes.map((vote) => (
            <VotingCard
              key={vote.id}
              vote={vote}
              userVote={votes[vote.id]}
              isActive={false}
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VotingList;

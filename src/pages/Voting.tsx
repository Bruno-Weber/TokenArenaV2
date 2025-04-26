
import React from "react";
import AppLayout from "@/components/AppLayout";
import VotingList from "@/components/voting/VotingList";

const Voting = () => {
  return (
    <AppLayout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2 text-center bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
            Votações do Clube
          </h1>
          <p className="text-center text-gray-400 mb-8">
            Participe das decisões importantes e ajude a definir o futuro do seu clube
          </p>
          
          <VotingList />
        </div>
      </div>
    </AppLayout>
  );
};

export default Voting;

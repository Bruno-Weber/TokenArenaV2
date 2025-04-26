
import React from "react";
import { useParams } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import ClubBanner from "@/components/club/ClubBanner";
import ClubStats from "@/components/club/ClubStats";
import ClubActions from "@/components/club/ClubActions";
import TransactionStatus from "@/components/TransactionStatus";
import { mockClubs } from "@/lib/mockClubData";
import { mockTransactions } from "@/components/MockData";

const Club = () => {
  const { id } = useParams();
  const club = mockClubs[id ?? "barcelona"];

  if (!club) {
    return (
      <AppLayout>
        <div className="container mx-auto py-8">
          <h1 className="text-2xl font-bold">Clube não encontrado</h1>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <ClubBanner club={club} />
      
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ClubStats stats={club.stats} />
            <ClubActions actions={club.actions} />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Atividades Recentes</h2>
            <div className="space-y-4">
              {mockTransactions
                .filter(tx => tx.token === club.symbol)
                .map((tx) => (
                  <TransactionStatus 
                    key={tx.hash}
                    hash={tx.hash}
                    status={tx.status}
                    timestamp={new Date(tx.timestamp).toLocaleTimeString('pt-BR')}
                    message={tx.message}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Club;

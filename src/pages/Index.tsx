import React from "react";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/AppLayout";
import Hero from "@/components/landing/Hero";
import StatsDashboard from "@/components/landing/StatsDashboard";
import { useToast } from "@/components/ui/use-toast";
import { Trophy, Vote, Zap } from "lucide-react";
import TransactionStatus from "@/components/TransactionStatus";
import { mockTransactions } from "@/components/MockData";
const Index = () => {
  const {
    toast
  } = useToast();
  return <AppLayout>
      {/* Hero Section */}
      <Hero />

      {/* Stats Dashboard */}
      <StatsDashboard />

      {/* Features Section */}
      

      {/* Activities Feed */}
      <section className="py-12">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-8">Atividades Recentes</h2>
          <div className="space-y-4">
            {mockTransactions.slice(0, 5).map(tx => <TransactionStatus key={tx.hash} hash={tx.hash} status={tx.status} timestamp={new Date(tx.timestamp).toLocaleTimeString('pt-BR')} message={tx.message} />)}
          </div>
        </div>
      </section>
    </AppLayout>;
};
const FeatureCard = ({
  icon,
  title,
  description
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return <div className="card-sports p-6 text-center">
      <div className="rounded-full bg-chiliz-primary/10 p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>;
};
export default Index;
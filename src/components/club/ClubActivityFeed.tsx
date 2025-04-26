
import TransactionStatus from "@/components/TransactionStatus";
import { mockTransactions } from "@/components/MockData";

interface ClubActivityFeedProps {
  symbol: string;
}

const ClubActivityFeed = ({ symbol }: ClubActivityFeedProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Atividades Recentes</h2>
      <div className="space-y-4">
        {mockTransactions
          .filter(tx => tx.token === symbol)
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
  );
};

export default ClubActivityFeed;

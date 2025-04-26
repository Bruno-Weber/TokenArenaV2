
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

interface StakingModalProps {
  tokenSymbol: string;
  walletBalance: string;
  onStake: (amount: string) => Promise<void>;
  onUnstake: () => Promise<void>;
}

const StakingModal = ({ tokenSymbol, walletBalance, onStake, onUnstake }: StakingModalProps) => {
  const [amount, setAmount] = useState("");
  const [isStaking, setIsStaking] = useState(false);
  const { toast } = useToast();

  // Mock staking stats
  const stakingStats = {
    totalStaked: "1,000",
    rewards: "50",
    votesParticipated: 5,
  };

  const handleStake = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Erro",
        description: "Por favor, insira uma quantidade válida",
        variant: "destructive",
      });
      return;
    }

    if (parseFloat(amount) > parseFloat(walletBalance)) {
      toast({
        title: "Saldo Insuficiente",
        description: "Você não tem tokens suficientes",
        variant: "destructive",
      });
      return;
    }

    setIsStaking(true);
    try {
      await onStake(amount);
      toast({
        title: "Stake Realizado!",
        description: `Você fez stake de ${amount} ${tokenSymbol} tokens`,
      });
      setAmount("");
    } catch (error) {
      toast({
        title: "Erro no Stake",
        description: "Não foi possível completar a operação",
        variant: "destructive",
      });
    } finally {
      setIsStaking(false);
    }
  };

  const handleUnstake = async () => {
    try {
      await onUnstake();
      toast({
        title: "Unstake Realizado!",
        description: "Seus tokens foram liberados com sucesso",
      });
    } catch (error) {
      toast({
        title: "Erro no Unstake",
        description: "Não foi possível completar a operação",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-chiliz-primary hover:bg-chiliz-primary/90">
          Área de Staking
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Stake de {tokenSymbol} Tokens</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Quantidade de Tokens para Stake
            </label>
            <div className="flex gap-2">
              <Input
                type="number"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
              />
              <Button 
                variant="outline" 
                onClick={() => setAmount(walletBalance)}
                className="whitespace-nowrap"
              >
                Max
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Saldo disponível: {walletBalance} {tokenSymbol}
            </p>
          </div>

          <div className="space-y-4">
            <Button 
              className="w-full relative bg-gradient-to-r from-chiliz-primary to-chiliz-secondary hover:from-chiliz-primary/90 hover:to-chiliz-secondary/90 text-white font-bold"
              onClick={handleStake}
              disabled={isStaking}
            >
              {isStaking ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processando...
                </>
              ) : (
                "Stakear Agora!"
              )}
            </Button>
          </div>

          <div className="space-y-4 border rounded-lg p-4">
            <h3 className="font-semibold mb-4">Suas Estatísticas</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Stakeado:</span>
                <span className="font-medium">{stakingStats.totalStaked} {tokenSymbol}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Recompensas:</span>
                <span className="font-medium">{stakingStats.rewards} {tokenSymbol}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Votações Participadas:</span>
                <span className="font-medium">{stakingStats.votesParticipated}</span>
              </div>
            </div>

            <Progress value={75} className="h-2" />
            
            <Button 
              variant="destructive" 
              className="w-full mt-4"
              onClick={handleUnstake}
            >
              Desfazer Stake
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StakingModal;

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface StakingModalProps {
  tokenSymbol: string;
  walletBalance: string;
  onStake: (amount: string) => Promise<void>;
  onUnstake: () => Promise<void>;
}

const StakingModal = ({
  tokenSymbol,
  walletBalance,
  onStake,
  onUnstake
}: StakingModalProps) => {
  const [amount, setAmount] = useState("");
  const [isStaking, setIsStaking] = useState(false);
  const {
    toast
  } = useToast();

  const stakingStats = {
    totalStaked: "1,000",
    rewards: "50",
    votesParticipated: 5
  };

  const handleStake = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Erro",
        description: "Por favor, insira uma quantidade válida",
        variant: "destructive"
      });
      return;
    }
    if (parseFloat(amount) > parseFloat(walletBalance)) {
      toast({
        title: "Saldo Insuficiente",
        description: "Você não tem tokens suficientes",
        variant: "destructive"
      });
      return;
    }
    setIsStaking(true);
    try {
      await onStake(amount);
      toast({
        title: "Stake Realizado!",
        description: `Você fez stake de ${amount} ${tokenSymbol} tokens`
      });
      setAmount("");
    } catch (error) {
      toast({
        title: "Erro no Stake",
        description: "Não foi possível completar a operação",
        variant: "destructive"
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
        description: "Seus tokens foram liberados com sucesso"
      });
    } catch (error) {
      toast({
        title: "Erro no Unstake",
        description: "Não foi possível completar a operação",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:opacity-90 transition-opacity text-white font-medium">
          Stake Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black/90 border border-white/10 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="text-gradient bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent text-xl">
            Stake de {tokenSymbol} Tokens
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div>
            <label className="text-sm font-medium mb-2 block text-white/80">
              Quantidade de Tokens para Stake
            </label>
            <div className="flex gap-2">
              <Input 
                type="number" 
                min="0" 
                value={amount} 
                onChange={e => setAmount(e.target.value)} 
                placeholder="0.00"
                className="bg-black/30 border-white/10 backdrop-blur-sm placeholder:text-white/30
                          focus-visible:ring-violet-500/50 focus-visible:border-violet-500/50 text-white"
              />
              <Button 
                variant="outline" 
                onClick={() => setAmount(walletBalance)}
                className="whitespace-nowrap border border-white/10 bg-black/30 backdrop-blur-sm
                         hover:bg-white/10 hover:border-violet-500/50 text-white/80"
              >
                Max
              </Button>
            </div>
            <p className="text-sm text-white/60 mt-1">
              Saldo disponível: {walletBalance} {tokenSymbol}
            </p>
          </div>

          <div className="space-y-4">
            <Button 
              className="w-full relative bg-gradient-to-r from-violet-500 to-fuchsia-500 
                       hover:opacity-90 transition-opacity text-white font-bold" 
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

          <div className="space-y-4 rounded-lg p-4 bg-white/5 border border-white/10">
            <h3 className="font-semibold mb-4 text-gradient bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Suas Estatísticas
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/60">Total Stakeado:</span>
                <span className="font-medium text-white">{stakingStats.totalStaked} {tokenSymbol}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/60">Recompensas:</span>
                <span className="font-medium text-white">{stakingStats.rewards} {tokenSymbol}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/60">Votações Participadas:</span>
                <span className="font-medium text-white">{stakingStats.votesParticipated}</span>
              </div>
            </div>

            <Progress 
              value={75} 
              className="h-2 bg-white/10" 
            />
            
            <Button 
              variant="destructive" 
              className="w-full mt-4 bg-gradient-to-r from-red-500 to-rose-500 hover:opacity-90 transition-opacity"
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

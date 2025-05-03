
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

interface ConnectedWalletProps {
  address: string;
  balance: string;
  onDisconnect: () => void;
}

const ConnectedWallet = ({ address, balance, onDisconnect }: ConnectedWalletProps) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const shortenAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: t('wallet.addressCopied'),
      description: t('wallet.addressCopiedDesc')
    });
  };

  const viewOnExplorer = () => {
    window.open(`https://chiliscan.com/address/${address}`, "_blank");
    toast({
      title: t('wallet.openingExplorer'),
      description: t('wallet.viewingAddress')
    });
  };

  return (
    <div className="flex items-center bg-[#18122B] rounded-xl px-4 py-2 shadow border border-token-purple/40 gap-4 min-w-[270px]">
      {/* Saldo em CHZ */}
      <div className="flex flex-col items-start justify-center mr-3">
        <span className="text-xs text-white/70 leading-tight">{t('wallet.balance')}</span>
        <span className="text-xl font-bold bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(139,92,246,0.7)]">{balance}</span>
      </div>
      {/* Separador */}
      <div className="h-8 w-px bg-token-purple/30 mx-2"></div>
      {/* Endereço */}
      <div className="flex items-center gap-2">
        <span className="text-base font-medium text-white bg-white/10 rounded px-3 py-1 select-all tracking-wide">
          {shortenAddress(address)}
        </span>
        <Button variant="ghost" size="icon" onClick={onDisconnect} className="ml-1 text-white/70 hover:text-red-400 focus:outline-none" title="Desconectar">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default ConnectedWallet;

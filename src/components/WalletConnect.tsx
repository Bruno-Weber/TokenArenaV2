import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Wallet } from "lucide-react";
import ConnectedWallet from "./wallet/ConnectedWallet";
import NotificationDropdown from "./notifications/NotificationDropdown";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/hooks/use-mobile";
import { useWallet } from "@/components/landing/useWallet";

const WalletConnect = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const [isOpen, setIsOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const {
    walletAddress,
    chzBalance,
    connect,
    disconnect,
    loading,
    error
  } = useWallet();

  const isConnected = !!walletAddress;

  const handleConnect = async (walletType: "metamask" | "rabby") => {
    setIsConnecting(true);
    try {
      await connect(walletType);
      toast({
        title: t("wallet.connected"),
        description: t("wallet.connectedDescription")
      });
      setIsOpen(false);
    } catch (e: any) {
      toast({
        title: t("wallet.connectionFailed"),
        description: e?.message || t("wallet.connectionFailedDescription"),
        variant: "destructive"
      });
    } finally {
      setIsConnecting(false);
    }
  };

  if (isConnected && walletAddress) {
    return (
      <div className="flex items-center gap-2">
        {!isMobile && <NotificationDropdown />}
        <ConnectedWallet
          address={walletAddress}
          balance={chzBalance || "0.00"}
          onDisconnect={disconnect}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {!isMobile && <NotificationDropdown />}
      <Button
        className={`text-white flex items-center gap-1 bg-violet-800 hover:bg-violet-700 ${isMobile ? "px-2" : "px-4"}`}
        onClick={() => setIsOpen(true)}
      >
        <Wallet className="h-4 w-4" />
        {!isMobile && t("wallet.connect")}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center min-h-screen bg-black/60">
          <div className="bg-token-background rounded-lg shadow-xl p-4 sm:p-16 min-w-[280px] sm:min-w-[320px] w-[90vw] sm:w-auto max-w-md relative">
            <button
              className="absolute top-2 right-2 text-white/60 hover:text-white text-xl"
              onClick={() => setIsOpen(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-2 text-white">
              {t("wallet.connectWalletTitle", "Conectar carteira")}
            </h2>
            <p className="text-white/70 mb-4">
              {t("wallet.chooseWallet", "Escolha uma carteira para conectar à Chiliz Chain")}
            </p>
            <div className="flex flex-col gap-3 mt-4">
              <Button
                variant="outline"
                className="flex items-center gap-3 border-token-purple text-white font-medium text-base px-6 py-3"
                onClick={() => handleConnect("metamask")}
                disabled={loading || isConnecting}
              >
                <img src="/metamask.svg" alt="MetaMask" className="w-6 h-6 mr-2" />
                {loading || isConnecting
                  ? t("wallet.connecting", "Conectando...")
                  : "MetaMask"}
              </Button>

              <Button
                variant="outline"
                className="flex items-center gap-3 border-token-purple text-white font-medium text-base px-6 py-3"
                onClick={() => handleConnect("rabby")}
                disabled={loading || isConnecting}
              >
                <img src="/images/rabby.png" alt="Rabby" className="w-6 h-6 mr-2" />
                {loading || isConnecting
                  ? t("wallet.connecting", "Conectando...")
                  : "Rabby"}
              </Button>

              <Button
                variant="outline"
                className="flex items-center gap-3 border-token-purple text-white font-medium text-base px-6 py-3 opacity-60 cursor-not-allowed"
                onClick={() =>
                  toast({
                    title: t("common.comingSoon", "Em breve"),
                    description: t("wallet.walletConnectSoon", "WalletConnect estará disponível em breve.")
                  })
                }
                disabled
              >
                <img src="/walletconnect.svg" alt="WalletConnect" className="w-6 h-6 mr-2" />
                WalletConnect <span className="ml-2 text-xs">({t("common.comingSoonShort", "em breve")})</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <span className="text-white text-sm font-medium ml-2 animate-fade-in">
          Conectando...
        </span>
      )}

      {error && (
        <span className="text-red-400 text-sm font-medium ml-2 animate-fade-in">
          {error}
        </span>
      )}
    </div>
  );
};

export default WalletConnect;

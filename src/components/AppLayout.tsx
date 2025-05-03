
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useWallet } from "@/components/landing/useWallet";
import { Home, Activity, Wallet, Users, BarChart3, Settings, Vote, PackageOpen, Trophy } from "lucide-react";
import { BackgroundPaths } from "@/components/ui/background-paths";
// Logo is loaded directly from public folder
import WalletConnect from "@/components/WalletConnect";
import LanguageSelector from "@/components/LanguageSelector";
import { useTranslation } from "react-i18next";

interface AppLayoutProps {
  children: React.ReactNode;
}

import type { WalletType } from "@/components/landing/useWallet";

interface NavLinkProps {
  to: string;
  label: string;
}

const NavLink = ({ to, label }: NavLinkProps) => {
  return (
    <Link
      to={to}
      className="text-foreground/80 hover:text-foreground font-medium transition-colors"
    >
      {label}
    </Link>
  );
};

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const SidebarLink = ({ to, icon, label }: SidebarLinkProps) => {
  const isActive = window.location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 p-2 rounded-md transition-colors ${
        isActive
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
      }`}
    >
      {icon}
      <span className="hidden lg:block">{label}</span>
    </Link>
  );
};

const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();
  const { walletAddress, chzBalance, connect, disconnect } = useWallet();
  const { t } = useTranslation();

  const isConnected = !!walletAddress;

  const handleConnect = (walletType: WalletType) => {
    connect(walletType);
  };

  const handleDisconnect = () => {
    disconnect();
  };
  
  const sidebarLinks = [
    { to: "/", icon: <Home className="h-5 w-5" />, label: t('navigation.home') },
    { to: "/market", icon: <BarChart3 className="h-5 w-5" />, label: t('navigation.market') },
    { to: "/activity", icon: <Activity className="h-5 w-5" />, label: t('navigation.activity') },
    { to: "/wallet", icon: <Wallet className="h-5 w-5" />, label: t('navigation.wallet') },
    { to: "/teams", icon: <Users className="h-5 w-5" />, label: t('navigation.teams') },
    { to: "/voting", icon: <Vote className="h-5 w-5" />, label: t('navigation.voting') },
    { to: "/nft-market", icon: <PackageOpen className="h-5 w-5" />, label: t('navigation.nftMarket') },
    { to: "/gamification", icon: <Trophy className="h-5 w-5" />, label: t('navigation.gamification') },
    { to: "/settings", icon: <Settings className="h-5 w-5" />, label: t('navigation.settings') },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-token-background">
      <header className="border-b border-token-purple/20 sticky top-0 z-20 bg-token-background/80 backdrop-blur-lg">
        <div className="container flex justify-between items-center py-4">
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/images/logo.png" 
              alt="TokenArena Logo" 
              className="w-10 h-10 rounded-full object-contain"
            />
            <span className="font-bold text-lg bg-gradient-to-r from-[#8A2BE2] to-[#4B0082] bg-clip-text text-transparent">
              TokenArena
            </span>
          </Link>
          
          <div className="hidden md:flex items-center justify-center flex-1 gap-6">
            <NavLink to="/" label={t('navigation.home')} />
            <NavLink to="/market" label={t('navigation.market')} />
            <NavLink to="/activity" label={t('navigation.activity')} />
            <NavLink to="/teams" label={t('navigation.teams')} />
          </div>
          
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <WalletConnect
              isConnected={isConnected}
              address={walletAddress}
              onConnect={handleConnect}
              onDisconnect={handleDisconnect}
              balance={chzBalance || "0.00"}
            />
          </div>
        </div>
      </header>
      
      <div className="flex flex-1">
        <aside className="hidden md:block w-16 lg:w-56 border-r border-token-purple/20 p-2 bg-token-background/80 backdrop-blur-lg z-10">
          <div className="flex flex-col gap-2">
            {sidebarLinks.map((link) => (
              <SidebarLink 
                key={link.to} 
                to={link.to} 
                icon={link.icon} 
                label={link.label} 
              />
            ))}
          </div>
        </aside>
        
        <main className="flex-1 relative">
          <BackgroundPaths />
          <div className="container mx-auto p-4 relative z-10">
            {children}
          </div>
        </main>
      </div>
      
      <footer className="border-t border-token-purple/20 py-4 bg-token-background/80 backdrop-blur-lg z-10">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <p className="text-sm text-gray-400">
                {t('footer.copyright')}
              </p>
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-sm text-gray-400 hover:text-gray-100">
                {t('footer.terms')}
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-gray-100">
                {t('footer.privacy')}
              </a>
              <a href="https://chiliz.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-gray-100">
                Chiliz
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;

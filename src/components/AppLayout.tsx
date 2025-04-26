import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Activity, Wallet, Users, BarChart3, Settings, Vote } from "lucide-react";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-chiliz-dark text-gray-100">
      <header className="border-b border-gray-800 sticky top-0 z-10 bg-chiliz-darker">
        <div className="container flex justify-between items-center py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-chiliz-primary flex items-center justify-center">
              <span className="text-white font-bold">TA</span>
            </div>
            <span className="font-bold text-lg text-white">TokenArena</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/" label="Home" />
            <NavLink to="/market" label="Market" />
            <NavLink to="/activity" label="Activity" />
            <NavLink to="/teams" label="Teams" />
          </nav>
          
          <div className="flex items-center gap-2">
            <div id="wallet-container"></div>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1">
        <aside className="hidden md:block w-16 lg:w-56 border-r border-gray-800 p-2 bg-chiliz-darker">
          <div className="flex flex-col gap-2">
            <SidebarLink to="/" icon={<Home className="h-5 w-5" />} label="Dashboard" />
            <SidebarLink to="/market" icon={<BarChart3 className="h-5 w-5" />} label="Market" />
            <SidebarLink to="/activity" icon={<Activity className="h-5 w-5" />} label="Activity" />
            <SidebarLink to="/wallet" icon={<Wallet className="h-5 w-5" />} label="Wallet" />
            <SidebarLink to="/teams" icon={<Users className="h-5 w-5" />} label="Teams" />
            <SidebarLink to="/voting" icon={<Vote className="h-5 w-5" />} label="Votações" />
            <SidebarLink to="/settings" icon={<Settings className="h-5 w-5" />} label="Settings" />
          </div>
        </aside>
        
        <main className="flex-1 p-4">
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
      
      <footer className="border-t border-gray-800 py-4 bg-chiliz-darker">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <p className="text-sm text-gray-400">
                © 2025 TokenArena | Powered by Chiliz Chain
              </p>
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-sm text-gray-400 hover:text-gray-100">
                Terms
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-gray-100">
                Privacy
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

export default AppLayout;

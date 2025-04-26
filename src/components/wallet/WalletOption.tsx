
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export interface WalletOptionProps {
  name: string;
  icon: string;
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

const WalletOption = ({ name, icon, onClick, isLoading, disabled }: WalletOptionProps) => {
  return (
    <Button 
      variant="outline" 
      className="flex items-center justify-between p-4 h-auto sports-border hover:border-chiliz-primary"
      onClick={onClick}
      disabled={isLoading || disabled}
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 relative">
          <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-400">
            {name.substring(0, 1)}
          </div>
          <img 
            src={icon} 
            alt={`${name} logo`} 
            className="w-full h-full object-contain relative z-10" 
            onError={e => {
              e.currentTarget.style.display = 'none';
            }} 
          />
        </div>
        <span className="font-medium">{name}</span>
      </div>
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <span className="text-gray-400 text-sm">Connect</span>
      )}
    </Button>
  );
};

export default WalletOption;

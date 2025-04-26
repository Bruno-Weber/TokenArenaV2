
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface AssetItemProps {
  name: string;
  symbol: string;
  logo: string;
  balance: string;
  value: number;
}

const AssetItem = ({ name, symbol, logo, balance, value }: AssetItemProps) => {
  return (
    <Card className="relative overflow-hidden hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-black/20 to-black/10 backdrop-blur-xl border border-white/10 hover:border-white/20 group">
      <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      <CardContent className="flex items-center justify-between p-4 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 bg-black/30 p-1 backdrop-blur-sm">
            <img
              src={logo}
              alt={`${name} logo`}
              className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg";
              }}
            />
          </div>
          <div>
            <div className="font-medium text-gradient">{name}</div>
            <div className="text-sm text-white/60">${symbol}</div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="font-medium bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            {balance} {symbol}
          </div>
          <div className="text-sm text-white/60">≈ ${value.toFixed(2)} USD</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssetItem;


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
    <Card>
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
            <img
              src={logo}
              alt={`${name} logo`}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg";
              }}
            />
          </div>
          <div>
            <div className="font-medium">{name}</div>
            <div className="text-sm text-muted-foreground">${symbol}</div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="font-medium">{balance} {symbol}</div>
          <div className="text-sm text-muted-foreground">≈ ${value.toFixed(2)} USD</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssetItem;

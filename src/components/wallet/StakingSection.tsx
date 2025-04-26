
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { History } from "lucide-react";

interface StakingSectionProps {
  tokens: Array<{
    id: string;
    name: string;
    symbol: string;
    teamLogo: string;
  }>;
}

const StakingSection = ({ tokens }: StakingSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tokens.slice(0, 3).map(token => (
          <Card key={token.id} className="sports-border">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                  <img
                    src={token.teamLogo}
                    alt={`${token.name} logo`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <CardTitle className="text-lg">{token.name}</CardTitle>
                  <CardDescription>APR: 12.5%</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-chiliz-primary hover:bg-chiliz-primary/90">
                Stake Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StakingSection;

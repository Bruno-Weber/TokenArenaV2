
"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { ExternalLink, ChevronRight, Users, TrendingUp, Trophy } from "lucide-react";

// Team logo mappings
const teamLogos: Record<string, string> = {
  RMA: "/images/realmadrid.png",
  MNU: "/images/manchesterunited.png",
  RDW: "/images/redwings.png",
  LAK: "/images/lakers.png",
  BAR: "/images/barcelona.png",
  YNK: "/images/yankees.png",
};

interface FanTokenProps {
  id: string;
  name: string;
  symbol: string;
  teamLogo: string;
  supply: string;
  price: number;
  change24h: number;
  holders: number;
  category: "football" | "basketball" | "baseball" | "hockey" | "soccer";
}

const FanTokenCard = ({
  id,
  name,
  symbol,
  teamLogo,
  supply,
  price,
  change24h,
  holders,
  category,
}: FanTokenProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleBuy = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Coming Soon!",
        description: "Token purchase functionality will be available in the next update.",
      });
    }, 1500);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(num);
  };

  const getBorderColor = () => {
    switch (category) {
      case "football":
        return "from-sports-football/20 to-sports-football/10";
      case "basketball":
        return "from-sports-basketball/20 to-sports-basketball/10";
      case "baseball":
        return "from-sports-baseball/20 to-sports-baseball/10";
      case "hockey":
        return "from-sports-hockey/20 to-sports-hockey/10";
      case "soccer":
        return "from-sports-soccer/20 to-sports-soccer/10";
      default:
        return "from-gray-200/20 to-gray-200/10";
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-4">
        <img
          src={teamLogos[symbol] || teamLogo}
          alt={`${name} logo`}
          className="w-14 h-14 object-contain drop-shadow-md bg-white/10 rounded-full p-2 border border-white/10"
          loading="lazy"
        />
        <div>
          <span className="block text-lg font-bold text-white leading-tight">{name}</span>
          <span className="block text-xs text-white/60 font-mono uppercase tracking-wide">{symbol}</span>
        </div>
      </div>
      <Card className={`flex flex-col flex-grow relative group overflow-hidden transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br ${getBorderColor()} backdrop-blur-xl border border-white/10 hover:border-white/20`}>
        <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6]/5 to-[#D946EF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <CardHeader className="pb-2 relative z-10">
          <div className="flex justify-end items-start">
            <Badge
              variant="secondary"
              className={`capitalize bg-opacity-20 backdrop-blur-sm ${
                category === "football"
                  ? "bg-sports-football text-sports-football"
                  : category === "basketball"
                  ? "bg-sports-basketball text-sports-basketball"
                  : category === "baseball"
                  ? "bg-sports-baseball text-sports-baseball"
                  : category === "hockey"
                  ? "bg-sports-hockey text-sports-hockey"
                  : "bg-sports-soccer text-sports-soccer"
              }`}
            >
              {category}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="py-2 relative z-10 flex-grow">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex flex-col">
              <span className="text-white/60">Price</span>
              <div className="font-medium flex items-center gap-1">
                <span className="text-white">${formatNumber(price)}</span>
                <Badge
                  variant={change24h >= 0 ? "outline" : "destructive"}
                  className={`text-xs ${change24h >= 0 ? "text-green-500 border-green-500" : ""}`}
                >
                  {change24h >= 0 ? "+" : ""}
                  {formatNumber(change24h)}%
                </Badge>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-white/60">Supply</span>
              <div className="font-medium text-white">{supply}</div>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4 text-xs text-white/60">
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>{holders.toLocaleString()} holders</span>
            </div>
            <div className="flex items-center gap-1">
              <Trophy className="h-3 w-3" />
              <span>Rank #12</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              <span>Active</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between pt-2 relative z-10 mt-auto">
          <Button
            variant="outline"
            size="sm"
            className="text-xs border-white/20 hover:border-white/40 bg-token-background-light/30"
            onClick={() => {
              window.open(`https://chiliscan.com/token/${id}`, "_blank");
            }}
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            Explore
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={handleBuy}
            disabled={isLoading}
            className="text-xs bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] hover:from-[#7C3AED] hover:to-[#C026D3]"
          >
            {isLoading ? (
              <>
                <span className="animate-spin mr-1">⭮</span>Loading...
              </>
            ) : (
              <>
                Get Token
                <ChevronRight className="h-3 w-3 ml-1" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FanTokenCard;

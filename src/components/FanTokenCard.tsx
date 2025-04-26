
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { ExternalLink, ChevronRight, Users, TrendingUp, Trophy } from "lucide-react";

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
    // Simulate a network request
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
        return "border-sports-football";
      case "basketball":
        return "border-sports-basketball";
      case "baseball":
        return "border-sports-baseball";
      case "hockey":
        return "border-sports-hockey";
      case "soccer":
        return "border-sports-soccer";
      default:
        return "border-gray-200";
    }
  };

  return (
    <Card className={`card-sports transition-all duration-300 hover:translate-y-[-5px] ${getBorderColor()} border-2`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200">
              <img
                src={teamLogo}
                alt={`${name} logo`}
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg";
                }}
              />
            </div>
            <div>
              <CardTitle className="text-lg">{name}</CardTitle>
              <CardDescription>
                <Badge variant="outline" className="font-mono text-xs">
                  {symbol}
                </Badge>
              </CardDescription>
            </div>
          </div>
          <Badge 
            variant="secondary" 
            className={`capitalize bg-opacity-20 ${
              category === 'football' ? 'bg-sports-football text-sports-football' :
              category === 'basketball' ? 'bg-sports-basketball text-sports-basketball' :
              category === 'baseball' ? 'bg-sports-baseball text-sports-baseball' :
              category === 'hockey' ? 'bg-sports-hockey text-sports-hockey' :
              'bg-sports-soccer text-sports-soccer'
            }`}
          >
            {category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="py-2">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex flex-col">
            <span className="text-muted-foreground">Price</span>
            <div className="font-medium flex items-center gap-1">
              <span>${formatNumber(price)}</span>
              <Badge 
                variant={change24h >= 0 ? "outline" : "destructive"} 
                className={`text-xs ${
                  change24h >= 0 ? "text-green-500 border-green-500" : ""
                }`}
              >
                {change24h >= 0 ? "+" : ""}
                {formatNumber(change24h)}%
              </Badge>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Supply</span>
            <div className="font-medium">
              {supply}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
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
      <CardFooter className="flex justify-between pt-2">
        <Button
          variant="outline"
          size="sm"
          className="text-xs"
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
          className="text-xs bg-chiliz-primary hover:bg-chiliz-primary/90"
          onClick={handleBuy}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="animate-spin mr-1">⭮</span>
              Loading...
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
  );
};

export default FanTokenCard;

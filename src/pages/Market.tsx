
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppLayout from "@/components/AppLayout";
import FanTokenCard from "@/components/FanTokenCard";
import { Search, FilterX, ArrowUpDown } from "lucide-react";
import { mockFanTokens } from "@/lib/web3";

const Market = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("price-high");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const filteredTokens = mockFanTokens.filter(token => {
    const matchesSearch = token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          token.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || token.category === categoryFilter;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case "price-high":
        return b.price - a.price;
      case "price-low":
        return a.price - b.price;
      case "change-high":
        return b.change24h - a.change24h;
      case "change-low":
        return a.change24h - b.change24h;
      case "holders":
        return b.holders - a.holders;
      default:
        return b.price - a.price;
    }
  });

  const resetFilters = () => {
    setSearchTerm("");
    setCategoryFilter(null);
    setSortBy("price-high");
  };

  return (
    <AppLayout>
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-2">Fan Token Market</h1>
        <p className="text-muted-foreground mb-8">Discover and analyze fan tokens from various teams and sports</p>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex flex-1 relative">
            <Input
              type="text"
              placeholder="Search tokens by name or symbol..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>

          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="price-high">Price (High to Low)</SelectItem>
                  <SelectItem value="price-low">Price (Low to High)</SelectItem>
                  <SelectItem value="change-high">% Change (High to Low)</SelectItem>
                  <SelectItem value="change-low">% Change (Low to High)</SelectItem>
                  <SelectItem value="holders">Most Holders</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              onClick={resetFilters}
              className="flex items-center gap-2"
            >
              <FilterX className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>

        {/* Categories */}
        <Tabs defaultValue="all" className="w-full mb-8">
          <TabsList>
            <TabsTrigger value="all" onClick={() => setCategoryFilter(null)}>All Sports</TabsTrigger>
            <TabsTrigger value="soccer" onClick={() => setCategoryFilter("soccer")}>Soccer</TabsTrigger>
            <TabsTrigger value="basketball" onClick={() => setCategoryFilter("basketball")}>Basketball</TabsTrigger>
            <TabsTrigger value="baseball" onClick={() => setCategoryFilter("baseball")}>Baseball</TabsTrigger>
            <TabsTrigger value="hockey" onClick={() => setCategoryFilter("hockey")}>Hockey</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard title="Market Volume" value="$2.45M" change={5.76} isPositive={true} />
          <StatsCard title="Total Users" value="135,892" change={12.34} isPositive={true} />
          <StatsCard title="Average Price" value="$3.67" change={-1.23} isPositive={false} />
        </div>

        {/* Grid of Tokens - Fixed layout with consistent sizing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTokens.length > 0 ? (
            filteredTokens.map((token) => (
              <div key={token.id} className="h-full">
                <FanTokenCard {...token} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <h3 className="text-xl font-medium mb-2">No tokens found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
              <Button variant="outline" onClick={resetFilters}>Reset Filters</Button>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

interface StatsCardProps {
  title: string;
  value: string;
  change: number;
  isPositive: boolean;
}

const StatsCard = ({ title, value, change, isPositive }: StatsCardProps) => {
  return (
    <Card className="overflow-hidden relative bg-gradient-to-br from-token-background-light/50 to-transparent backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 group">
      <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6]/10 to-[#D946EF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <CardHeader className="pb-2 relative z-10">
        <CardTitle className="text-lg text-white/80 group-hover:text-white transition-colors">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="text-3xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent group-hover:from-[#8B5CF6] group-hover:to-[#D946EF] transition-all duration-300">
          {value}
        </div>
        <div className="flex items-center mt-1">
          <ArrowUpDown className={`h-4 w-4 mr-1 ${isPositive ? "text-green-500" : "text-red-500"}`} />
          <span className={isPositive ? "text-green-500" : "text-red-500"}>
            {isPositive ? "+" : ""}{change}%
          </span>
          <span className="text-white/60 text-sm ml-1">vs. last week</span>
        </div>
      </CardContent>
      <div className="absolute inset-0 border border-white/20 group-hover:border-[#8B5CF6]/50 transition-colors duration-300" />
    </Card>
  );
};

export default Market;

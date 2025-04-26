
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppLayout from "@/components/AppLayout";
import TransactionStatus from "@/components/TransactionStatus";
import { mockTransactions } from "@/lib/web3";
import { Search, FilterX, Calendar } from "lucide-react";

// Add more mock transactions to fill the page
const extendedTransactions = [
  ...mockTransactions,
  {
    hash: "0x5678901234abcdef5678901234abcdef5678901234abcdef5678901234abcdef",
    status: "success",
    timestamp: "2025-04-24 09:18:37",
    message: "Claim team rewards",
  },
  {
    hash: "0x6789012345abcdef6789012345abcdef6789012345abcdef6789012345abcdef",
    status: "success",
    timestamp: "2025-04-23 16:47:19",
    message: "Purchased 25 MNU Tokens",
  },
  {
    hash: "0x7890123456abcdef7890123456abcdef7890123456abcdef7890123456abcdef",
    status: "confirmed",
    timestamp: "2025-04-23 11:32:04",
    message: "Participated in team poll",
  },
  {
    hash: "0x8901234567abcdef8901234567abcdef8901234567abcdef8901234567abcdef",
    status: "failed",
    timestamp: "2025-04-22 19:05:51",
    message: "Token swap attempt",
  },
  {
    hash: "0x9012345678abcdef9012345678abcdef9012345678abcdef9012345678abcdef",
    status: "success",
    timestamp: "2025-04-22 14:23:47",
    message: "NFT claim from team event",
  },
];

const Activity = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  // Filter transactions based on search term and status filter
  const filteredTransactions = extendedTransactions.filter(tx => {
    // Apply search filter
    const matchesSearch = tx.message.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          tx.hash.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply status filter if selected
    const matchesStatus = !statusFilter || tx.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter(null);
  };

  return (
    <AppLayout>
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-2">Activity & Transactions</h1>
        <p className="text-muted-foreground mb-8">Track your interactions with fan tokens and teams</p>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex flex-1 relative">
            <Input
              type="text"
              placeholder="Search by message or transaction hash..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>
          
          <div className="flex gap-2">
            <Select 
              value={statusFilter || ""}
              onValueChange={(value) => setStatusFilter(value || null)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
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

        {/* Date Filter Tabs */}
        <Tabs defaultValue="all" className="w-full mb-8">
          <TabsList>
            <TabsTrigger value="all">All Time</TabsTrigger>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="month">This Month</TabsTrigger>
            <TabsTrigger value="custom">
              <Calendar className="h-4 w-4 mr-1" />
              Custom Range
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Transaction List */}
        <div className="space-y-4">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((tx) => (
              <TransactionStatus key={tx.hash} {...tx} />
            ))
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">No transactions found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
              <Button variant="outline" onClick={resetFilters}>Reset Filters</Button>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Activity;


import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/components/AppLayout";
import TransactionStatus from "@/components/TransactionStatus";
import { mockTransactions } from "@/lib/web3";
import { Search, Filter, ArrowUpDown } from "lucide-react";

const Activity = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tabFilter, setTabFilter] = useState("all");
  
  // Filter transactions based on search term and tab filter
  const filteredTransactions = mockTransactions.filter(tx => {
    const matchesSearch = 
      tx.hash.toLowerCase().includes(searchTerm.toLowerCase()) || 
      tx.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (tabFilter === "all") return matchesSearch;
    return matchesSearch && tx.status === tabFilter;
  });
  
  return (
    <AppLayout>
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-2">Activity</h1>
        <p className="text-muted-foreground mb-8">Track your transactions and activity on Chiliz Chain</p>
        
        <Card className="mb-8">
          <CardHeader className="pb-0">
            <CardTitle className="text-lg">Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="h-10 w-10">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-10 w-10">
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="all" onValueChange={setTabFilter}>
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="success">Success</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="failed">Failed</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-4 mt-0">
                {filteredTransactions.map(tx => (
                  <TransactionStatus
                    key={tx.hash}
                    hash={tx.hash}
                    status={tx.status as 'pending' | 'confirmed' | 'failed' | 'success'}
                    timestamp={tx.timestamp}
                    message={tx.message}
                  />
                ))}
                {filteredTransactions.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No transactions found
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="success" className="space-y-4 mt-0">
                {filteredTransactions.map(tx => (
                  <TransactionStatus
                    key={tx.hash}
                    hash={tx.hash}
                    status={tx.status as 'pending' | 'confirmed' | 'failed' | 'success'}
                    timestamp={tx.timestamp}
                    message={tx.message}
                  />
                ))}
                {filteredTransactions.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No transactions found
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="pending" className="space-y-4 mt-0">
                {filteredTransactions.map(tx => (
                  <TransactionStatus
                    key={tx.hash}
                    hash={tx.hash}
                    status={tx.status as 'pending' | 'confirmed' | 'failed' | 'success'}
                    timestamp={tx.timestamp}
                    message={tx.message}
                  />
                ))}
                {filteredTransactions.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No transactions found
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="failed" className="space-y-4 mt-0">
                {filteredTransactions.map(tx => (
                  <TransactionStatus
                    key={tx.hash}
                    hash={tx.hash}
                    status={tx.status as 'pending' | 'confirmed' | 'failed' | 'success'}
                    timestamp={tx.timestamp}
                    message={tx.message}
                  />
                ))}
                {filteredTransactions.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No transactions found
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Activity;

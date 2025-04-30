
import React, { useEffect, useState } from "react";
import AppLayout from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ReactMarkdown from 'react-markdown';

const Documentation = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [docContent, setDocContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch markdown content
  const fetchMarkdown = async (docPath: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Updated path to access markdown files directly from the src/docs/docs folder
      const response = await fetch(`/src/docs/docs/${docPath}.md`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch ${docPath}.md`);
      }
      
      const text = await response.text();
      setDocContent(text);
      setError(null);
    } catch (error) {
      console.error("Error fetching markdown:", error);
      setError("Unable to load the requested document.");
      setDocContent("");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch the markdown content when the active tab changes
    fetchMarkdown(activeTab);
  }, [activeTab]);

  // Improved markdown renderer using react-markdown
  const renderMarkdown = (content: string) => {
    if (isLoading) {
      return <div className="py-4">Loading document...</div>;
    }

    if (error) {
      return (
        <div className="py-4 text-red-500">
          <h3 className="text-lg font-bold"># Error Loading Documentation</h3>
          <p className="mt-2">{error}</p>
        </div>
      );
    }

    return (
      <div className="prose prose-invert max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    );
  };

  const sidebarItems = [
    { id: "overview", label: "Overview" },
    { id: "get-started", label: "Getting Started" },
    { id: "market", label: "Market" },
    { id: "voting", label: "Voting" },
    { id: "wallet", label: "Wallet" },
    { id: "nft-market", label: "NFT Market" },
    { id: "create-token", label: "Create Token" },
    { id: "staking", label: "Staking" },
  ];

  return (
    <AppLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6 text-white">TokenArena Documentation</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
          {/* Sidebar */}
          <Card className="bg-sidebar border-sidebar-border">
            <CardHeader>
              <CardTitle>Documentation</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-col space-y-1 p-2">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    className={`text-left px-3 py-2 rounded-md transition-colors ${
                      activeTab === item.id
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                    }`}
                    onClick={() => setActiveTab(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Content */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>
                {sidebarItems.find(item => item.id === activeTab)?.label || "Documentation"}
              </CardTitle>
              <Separator />
            </CardHeader>
            <CardContent>
              {renderMarkdown(docContent)}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Documentation;

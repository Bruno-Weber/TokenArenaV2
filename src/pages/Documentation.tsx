
import React, { useEffect, useState } from "react";
import AppLayout from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

// Import documentation files
const overviewDoc = import.meta.glob("/src/docs/docs/overview.md", { eager: true });
const getStartedDoc = import.meta.glob("/src/docs/docs/get-started.md", { eager: true });
const marketDoc = import.meta.glob("/src/docs/docs/market.md", { eager: true });
const votingDoc = import.meta.glob("/src/docs/docs/voting.md", { eager: true });
const walletDoc = import.meta.glob("/src/docs/docs/wallet.md", { eager: true });
const nftMarketDoc = import.meta.glob("/src/docs/docs/nft-market.md", { eager: true });
const createTokenDoc = import.meta.glob("/src/docs/docs/create-token.md", { eager: true });
const stakingDoc = import.meta.glob("/src/docs/docs/staking.md", { eager: true });

// Simple markdown renderer (in a real app, you'd use a proper markdown parser)
const renderMarkdown = (content: string) => {
  // For this demo, we're just displaying the raw markdown
  // In a real implementation, you'd use a markdown renderer like react-markdown
  return (
    <div className="prose prose-invert max-w-none">
      <pre className="whitespace-pre-wrap">{content}</pre>
    </div>
  );
};

const Documentation = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [docContent, setDocContent] = useState<string>("");

  // Function to fetch the markdown content
  const fetchDoc = (docPath: string) => {
    // In a real app, you'd fetch the actual markdown file
    // For this demo, we're using the imported content
    switch (docPath) {
      case "overview":
        return "/src/docs/docs/overview.md";
      case "get-started":
        return "/src/docs/docs/get-started.md";
      case "market":
        return "/src/docs/docs/market.md";
      case "voting":
        return "/src/docs/docs/voting.md";
      case "wallet":
        return "/src/docs/docs/wallet.md";
      case "nft-market":
        return "/src/docs/docs/nft-market.md";
      case "create-token":
        return "/src/docs/docs/create-token.md";
      case "staking":
        return "/src/docs/docs/staking.md";
      default:
        return "/src/docs/docs/overview.md";
    }
  };

  useEffect(() => {
    const docPath = fetchDoc(activeTab);
    
    // In a real implementation you would fetch the MD file
    // For this demo, we're simulating content from our imported files
    let content = "# Loading documentation...";
    
    if (activeTab === "overview") {
      content = "# TokenArena Documentation\n\nWelcome to the TokenArena documentation! Here you'll find guides and information about how to use our platform.";
    } else if (activeTab === "get-started") {
      content = "# Getting Started\n\nLearn how to set up your account and make your first steps in TokenArena.";
    } else if (activeTab === "market") {
      content = "# Token Market\n\nExplore the fan token marketplace and learn how to buy and sell tokens.";
    } else if (activeTab === "voting") {
      content = "# Voting System\n\nUnderstand how to participate in team decisions through the voting system.";
    } else if (activeTab === "wallet") {
      content = "# Wallet\n\nManage your tokens and track your portfolio performance.";
    } else if (activeTab === "nft-market") {
      content = "# NFT Marketplace\n\nCollect and trade unique digital assets from your favorite teams.";
    } else if (activeTab === "create-token") {
      content = "# Create Token\n\nLearn how teams can create their own fan tokens on the platform.";
    } else if (activeTab === "staking") {
      content = "# Staking\n\nEarn rewards by locking your tokens for a specified period.";
    }
    
    setDocContent(content);
  }, [activeTab]);

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

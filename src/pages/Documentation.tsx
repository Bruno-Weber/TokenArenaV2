
import React, { useEffect, useState } from "react";
import AppLayout from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";

const Documentation = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [docContent, setDocContent] = useState<string>("");

  // Function to fetch markdown content
  const fetchMarkdown = async (docPath: string) => {
    try {
      const response = await fetch(`/src/docs/docs/${docPath}.md`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${docPath}.md`);
      }
      const text = await response.text();
      return text;
    } catch (error) {
      console.error("Error fetching markdown:", error);
      return `# Error Loading Documentation\n\nUnable to load the requested document.`;
    }
  };

  useEffect(() => {
    // Fetch the markdown content when the active tab changes
    const loadContent = async () => {
      const content = await fetchMarkdown(activeTab);
      setDocContent(content);
    };
    
    loadContent();
  }, [activeTab]);

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

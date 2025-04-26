
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle2, AlertCircle, Clock } from "lucide-react";

type TransactionStatus = 'pending' | 'success' | 'failed';

interface TransactionStatusProps {
  hash: string;
  status: string;
  timestamp: string;
  message: string;
}

const TransactionStatus = ({
  hash,
  status,
  timestamp,
  message,
}: TransactionStatusProps) => {
  const shortenHash = (hash: string) => {
    return `${hash.substring(0, 8)}...${hash.substring(hash.length - 8)}`;
  };

  const getStatusUI = (status: string) => {
    switch (status) {
      case "pending":
        return {
          icon: <Loader2 className="h-4 w-4 animate-spin text-yellow-500" />,
          text: "Pending",
          className: "bg-yellow-500/10 text-yellow-500 border-yellow-500",
          progressValue: 50,
          progressClass: "bg-gradient-to-r from-yellow-500 to-yellow-400",
        };
      case "success":
        return {
          icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
          text: "Success",
          className: "bg-green-500/10 text-green-500 border-green-500",
          progressValue: 100,
          progressClass: "bg-gradient-to-r from-green-500 to-green-400",
        };
      case "failed":
        return {
          icon: <AlertCircle className="h-4 w-4 text-red-500" />,
          text: "Failed",
          className: "bg-red-500/10 text-red-500 border-red-500",
          progressValue: 100,
          progressClass: "bg-gradient-to-r from-red-500 to-red-400",
        };
      default:
        return {
          icon: <Clock className="h-4 w-4" />,
          text: "Unknown",
          className: "bg-gray-500/10 text-gray-500 border-gray-500",
          progressValue: 0,
          progressClass: "bg-gradient-to-r from-gray-500 to-gray-400",
        };
    }
  };

  const statusUI = getStatusUI(status);

  return (
    <Card className={`border transition-all duration-300 hover:shadow-lg backdrop-blur-sm bg-card/30 ${status === "success" ? "tx-success animate-fade-in" : ""} ${status === "pending" ? "tx-pending" : ""}`}>
      <CardContent className="p-4">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <Badge 
              variant="outline" 
              className={`flex items-center gap-1 border ${statusUI.className} transition-colors duration-300`}
            >
              {statusUI.icon}
              {statusUI.text}
            </Badge>
            <span className="text-xs text-muted-foreground bg-background/50 px-2 py-1 rounded-full">{timestamp}</span>
          </div>
          
          <Progress 
            value={statusUI.progressValue} 
            className={`h-1 mt-2 ${statusUI.progressClass} transition-all duration-300`}
          />
          
          <div className="flex flex-col mt-2">
            <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">{message}</span>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-xs text-muted-foreground">TX:</span>
              <a 
                href={`https://chiliscan.com/tx/${hash}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-blue-500 hover:text-blue-400 transition-colors font-mono hover:underline"
              >
                {shortenHash(hash)}
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionStatus;

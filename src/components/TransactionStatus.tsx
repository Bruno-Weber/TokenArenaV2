
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle2, AlertCircle, Clock } from "lucide-react";

type TransactionStatus = 'pending' | 'confirmed' | 'failed' | 'success';

interface TransactionStatusProps {
  hash: string;
  status: TransactionStatus;
  timestamp: string;
  message: string;
}

const TransactionStatus = ({
  hash,
  status,
  timestamp,
  message,
}: TransactionStatusProps) => {
  // Format the transaction hash for display
  const shortenHash = (hash: string) => {
    return `${hash.substring(0, 8)}...${hash.substring(hash.length - 8)}`;
  };

  // Get status-specific UI elements
  const getStatusUI = (status: TransactionStatus) => {
    switch (status) {
      case "pending":
        return {
          icon: <Loader2 className="h-4 w-4 animate-spin text-yellow-500" />,
          text: "Pending",
          className: "bg-yellow-500/10 text-yellow-500 border-yellow-500",
          progressValue: 50,
          progressClass: "bg-yellow-500",
        };
      case "confirmed":
        return {
          icon: <Clock className="h-4 w-4 text-blue-500" />,
          text: "Confirmed",
          className: "bg-blue-500/10 text-blue-500 border-blue-500",
          progressValue: 75,
          progressClass: "bg-blue-500",
        };
      case "success":
        return {
          icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
          text: "Success",
          className: "bg-green-500/10 text-green-500 border-green-500",
          progressValue: 100,
          progressClass: "bg-green-500",
        };
      case "failed":
        return {
          icon: <AlertCircle className="h-4 w-4 text-red-500" />,
          text: "Failed",
          className: "bg-red-500/10 text-red-500 border-red-500",
          progressValue: 100,
          progressClass: "bg-red-500",
        };
      default:
        return {
          icon: <Clock className="h-4 w-4" />,
          text: "Unknown",
          className: "bg-gray-500/10 text-gray-500 border-gray-500",
          progressValue: 0,
          progressClass: "bg-gray-500",
        };
    }
  };

  const statusUI = getStatusUI(status);

  return (
    <Card className={`border ${status === "success" ? "tx-success" : ""} ${status === "pending" ? "tx-pending" : ""}`}>
      <CardContent className="p-4">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <Badge 
              variant="outline" 
              className={`flex items-center gap-1 border ${statusUI.className}`}
            >
              {statusUI.icon}
              {statusUI.text}
            </Badge>
            <span className="text-xs text-muted-foreground">{timestamp}</span>
          </div>
          
          <Progress 
            value={statusUI.progressValue} 
            className="h-1 mt-2" 
            indicatorClassName={statusUI.progressClass} 
          />
          
          <div className="flex flex-col mt-2">
            <span className="text-sm font-medium">{message}</span>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-xs text-muted-foreground">TX:</span>
              <a 
                href={`https://chiliscan.com/tx/${hash}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-blue-500 hover:underline font-mono"
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

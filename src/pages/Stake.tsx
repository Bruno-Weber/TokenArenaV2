
import React from "react";
import AppLayout from "@/components/AppLayout";
import StakingModal from "@/components/staking/StakingModal";

const Stake = () => {
  return (
    <AppLayout>
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-chiliz-primary to-chiliz-secondary bg-clip-text text-transparent">
          Stake de Fan Tokens
        </h1>
        <div className="max-w-lg mx-auto">
          <StakingModal 
            tokenSymbol="FAN" 
            walletBalance="2,500" 
            onStake={() => Promise.resolve()} 
            onUnstake={() => Promise.resolve()} 
          />
        </div>
      </div>
    </AppLayout>
  );
};

export default Stake;

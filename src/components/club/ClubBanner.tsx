
import { Club } from "@/types/club";
import StakingModal from "@/components/staking/StakingModal";

interface ClubBannerProps {
  club: Club;
}

const ClubBanner = ({ club }: ClubBannerProps) => {
  const handleStake = async (amount: string) => {
    // Simulate staking delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  const handleUnstake = async () => {
    // Simulate unstaking delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  return (
    <div className={`w-full h-64 bg-gradient-to-r ${club.bannerColor} relative overflow-hidden`}>
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 h-full container mx-auto flex items-center gap-8 px-4">
        <div className="w-32 h-32 rounded-full bg-white p-2 flex items-center justify-center">
          <img
            src={club.logo}
            alt={`${club.name} logo`}
            className="w-24 h-24 object-contain"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-white mb-2">{club.name}</h1>
          <p className="text-white/90 max-w-2xl mb-4">{club.description}</p>
          <StakingModal
            tokenSymbol={club.symbol}
            walletBalance="2,500"
            onStake={handleStake}
            onUnstake={handleUnstake}
          />
        </div>
      </div>
    </div>
  );
};

export default ClubBanner;

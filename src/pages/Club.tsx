
import { useParams } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import ClubBanner from "@/components/club/ClubBanner";
import ClubStats from "@/components/club/ClubStats";
import ClubActions from "@/components/club/ClubActions";
import ClubActivityFeed from "@/components/club/ClubActivityFeed";
import ClubNotFound from "@/components/club/ClubNotFound";
import { mockClubs } from "@/lib/mockClubData";

const Club = () => {
  const { id } = useParams();
  const club = mockClubs[id ?? "barcelona"];

  if (!club) {
    return <ClubNotFound />;
  }

  return (
    <AppLayout>
      <ClubBanner club={club} />
      
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ClubStats stats={club.stats} />
            <ClubActions actions={club.actions} />
          </div>
          
          <div>
            <ClubActivityFeed symbol={club.symbol} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Club;

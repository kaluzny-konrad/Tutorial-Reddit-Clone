'use client'

import Header from "@/components/Community/Header";
import NotFound from "@/components/Community/NotFound";
import getCommunityData from "@/components/Community/getCommunityData";
import PageContent from "@/components/Layout/PageContent";
import { auth } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";

type Params = {
  params: {
    communityId: string;
  };
};

export default async function CommunityPage({
  params: { communityId },
}: Params) {
  const communityData = getCommunityData(communityId);
  const community = await communityData;
  if (!community) return <NotFound />;

  return (
    <>
      <Header community={community} />
      <PageContent>
        <>testleft</>
        <>testright</>
      </PageContent>
    </>
  );
}

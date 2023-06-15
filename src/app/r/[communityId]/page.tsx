"use client";

import CreatePostLink from "@/components/Community/CreatePostLink";
import Header from "@/components/Community/Header";
import NotFound from "@/components/Community/NotFound";
import getCommunityData from "@/components/Community/getCommunityData";
import PageContent from "@/components/Layout/PageContent";
import Posts from "@/components/Posts/Posts";
import useAuthentication from "@/hooks/useAuthentication";

type Props = {
  params: {
    communityId: string;
  };
};

export default async function CommunityPage({
  params: { communityId },
}: Props) {
  const { user } = useAuthentication();
  const communityData = getCommunityData(communityId);
  const community = await communityData;
  if (!community) return <NotFound />;

  return (
    <>
      <Header community={community} />
      <PageContent>
        <>
          <CreatePostLink communityId={communityId} />
          <Posts communityData={community} userId={user?.uid} />
        </>
        <>testright</>
      </PageContent>
    </>
  );
}

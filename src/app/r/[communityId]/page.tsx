import About from "@/components/Community/About";
import CreatePostLink from "@/components/Community/CreatePostLink";
import Header from "@/components/Community/Header";
import NotFound from "@/components/Community/NotFound";
import getCommunityData from "@/components/Community/getCommunityData";
import PageContent from "@/components/Layout/PageContent";
import Posts from "@/components/Posts/Posts";

type Props = {
  params: {
    communityId: string;
  };
};

export default async function CommunityPage({
  params: { communityId },
}: Props) {
  const community = await getCommunityData(communityId);
  if (!community) return <NotFound />;

  return (
    <>
      <Header community={community} />
      <PageContent>
        <>
          <CreatePostLink communityId={communityId} />
          <Posts communityData={community} />
        </>
        <>
          <About communityData={community} />
        </>
      </PageContent>
    </>
  );
}

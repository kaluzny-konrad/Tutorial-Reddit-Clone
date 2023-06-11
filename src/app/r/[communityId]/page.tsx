import getCommunityData from "@/components/Community/getCommunityData";
import { Suspense } from "react";

type Params = {
  params: {
    communityId: string;
  };
};

export default async function CommunityPage({
  params: { communityId },
}: Params) {
  const communityData = getCommunityData(communityId);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {(await communityData) ? <>test1</> : <>test2</>}
      </Suspense>
    </>
  );
}

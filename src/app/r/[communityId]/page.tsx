import { Community } from "@/atoms/communityAtom";
import { firestore } from "@/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import React from "react";
import safeJsonStringify from "safe-json-stringify";

export default async function CommunityPage({ params }: any) {
  const communityData = await getCommunityData(params.communityId);
  return <div>{communityData?.id}</div>;
}

export async function getCommunityData(
  slug: string
): Promise<Community | undefined> {
  try {
    const communityId = slug;
    const communityDocRef = doc(firestore, "communities", communityId);
    const communityDoc = await getDoc(communityDocRef);

    const communityData: Community = JSON.parse(
      safeJsonStringify({
        id: communityDoc.id,
        ...communityDoc.data(),
      })
    );

    return communityData;
  } catch (error) {
    console.log("getCommunityData", error);
  }
}

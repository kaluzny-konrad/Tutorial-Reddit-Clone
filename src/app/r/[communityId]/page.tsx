import { Community } from "@/atoms/communityAtom";
import { firestore } from "@/firebase/clientApp";
import {
  DocumentData,
  DocumentSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";
import React from "react";

export default async function CommunityPage({ params }: any) {
  const communityData = await getCommunityData(params.communityId);
  console.log("communityData", communityData);
  if (!communityData) return <div>Community not found</div>;

  return <div>{communityData?.id}</div>;
}

export async function getCommunityData(
  slug: string
): Promise<Community | undefined> {
  try {
    const communityId = slug;
    const communityDocRef = doc(firestore, "communities", communityId);
    const communityDoc: DocumentSnapshot<DocumentData> = await getDoc(
      communityDocRef
    );

    if (!communityDoc.exists()) return undefined;

    const communityData: Community = JSON.parse(
      JSON.stringify({
        id: communityDoc.id,
        ...communityDoc.data(),
      })
    );

    return communityData;
  } catch (error) {
    console.log("getCommunityData", error);
  }
}

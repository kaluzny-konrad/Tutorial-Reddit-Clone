'use client'

import { Community } from "@/atoms/communityAtom";
import Header from "@/components/Community/Header";
import NotFound from "@/components/Community/NotFound";
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
  if (!communityData) return <NotFound />;

  return (
    <>
      <Header communityData={communityData} />
    </>
  );
}

export async function getCommunityData(
  slug: string
): Promise<Community | null> {
  try {
    const communityId = slug;
    const communityDocRef = doc(firestore, "communities", communityId);
    const communityDoc: DocumentSnapshot<DocumentData> = await getDoc(
      communityDocRef
    );

    if (!communityDoc.exists()) return null;

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

  return null;
}

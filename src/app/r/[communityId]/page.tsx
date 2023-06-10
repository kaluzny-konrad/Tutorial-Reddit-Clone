import { Community } from "@/atoms/communityAtom";
import { firestore } from "@/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext, NextPage } from "next";
import React from "react";
import safeJsonStringify from "safe-json-stringify";

type CommunityPageProps = {
  communityData: Community;
};

const CommunityPage: NextPage<CommunityPageProps> = ({ communityData }) => {
  console.log("getServerSideProps render");
  return <div>{communityData?.id}</div>;
}

export default CommunityPage;

export async function getServerSideProps(
  context: GetServerSidePropsContext
) {
  console.log("GET SERVER SIDE PROPS RUNNING");
  try {
    const communityId = context.query.communityId as string;
    const communityDocRef = doc(firestore, "communities", communityId);
    const communityDoc = await getDoc(communityDocRef);

    return {
      props: {
        communityData: JSON.parse(
          safeJsonStringify({
            id: communityDoc.id,
            ...communityDoc.data(),
          })
        ),
      },
    };
  } catch (error) {
    console.log("getServerSideProps", error);
  }
}
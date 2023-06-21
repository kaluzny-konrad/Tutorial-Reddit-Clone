import { Community } from "@/atoms/communityAtom";
import { firestore } from "@/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";

export default async function getCommunityData(
  communityId: string
): Promise<Community | null> {

  try {
    console.log("getCommunityData");
    const communityDocRef = doc(firestore, "communities", communityId);
    const communityDoc = await getDoc(communityDocRef);
    if (!communityDoc.exists()) return null;

    const communityData = JSON.parse(
      JSON.stringify({
        id: communityDoc.id,
        ...communityDoc.data(),
      })
    );
    
    return communityData;
  } catch (error) {
    return null;
  }
}

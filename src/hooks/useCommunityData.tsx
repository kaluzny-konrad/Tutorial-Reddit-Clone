import { Community, communityState } from "@/atoms/communityAtom";
import { auth, firestore } from "@/firebase/clientApp";
import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";

const useCommunityData = () => {
  const [user] = useAuthState(auth);
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onJoinOrLeaveCommunity = (
    communityData: Community,
    isJoined: boolean
  ) => {
    if (isJoined) {
      leaveCommunity(communityData.id);
    } else {
      joinCommunity(communityData);
    }
  };

  const getMySnippets = async () => {
    setLoading(true);
    try {
      const query = collection(
        firestore,
        `users/${user?.uid}/communitySnippets`
      );
      const snippetDocs = await getDocs(query);

      const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
      console.log("getMySnippets", snippets);
    } catch (error) {
      console.log("getMySnippets", error);
    }
    setLoading(false);
  };

  const joinCommunity = (communityData: Community) => {};
  const leaveCommunity = (communityId: string) => {};

  return {
    communityStateValue,
    onJoinOrLeaveCommunity,
  };
};

export default useCommunityData;

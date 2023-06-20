"use client";

import { authModalState } from "@/atoms/authModalAtom";
import {
  Community,
  communityState,
  CommunitySnippet,
} from "@/atoms/communityAtom";
import { firestore } from "@/firebase/clientApp";
import {
  collection,
  doc,
  getDocs,
  increment,
  query,
  writeBatch,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";

const useCommunityData = () => {
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const setAuthModalState = useSetRecoilState(authModalState);

  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user || !!communityStateValue.mySnippets.length) return;

    const getSnippets = async () => {
      setLoading(true);

      try {
        const snippets = await getMySnippets(user?.uid!);
        setCommunityStateValue((prev) => ({
          ...prev,
          mySnippets: snippets as CommunitySnippet[],
          initSnippetsFetched: true,
        }));
      } catch (error: any) {
        console.log("getSnippets", error);
        setError(error.message);
      }

      setLoading(false);
    };

    getSnippets();
  }, [user, communityStateValue.mySnippets.length, setCommunityStateValue]);

  const getMySnippets = async (userId: string) => {
    const snippetsRef = collection(
      firestore,
      `users/${userId}/communitySnippets`
    );
    const snippetQuery = query(snippetsRef);

    const snippetDocs = await getDocs(snippetQuery);
    return snippetDocs.docs.map((doc) => ({ ...doc.data() }));
  };

  const onJoinLeaveCommunity = (community: Community, isJoined?: boolean) => {
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }

    setLoading(true);
    if (isJoined) leaveCommunity(community.id);
    else joinCommunity(community);
    setLoading(false);
  };

  const joinCommunity = async (communityData: Community) => {
    try {
      const batch = writeBatch(firestore);

      const newSnippet: CommunitySnippet = {
        communityId: communityData.id,
        imageURL: communityData.imageUrl || "",
      };

      const communitySnippetRef = doc(
        firestore,
        `users/${user?.uid}/communitySnippets`,
        communityData.id
      );
      batch.set(communitySnippetRef, newSnippet);

      const communityMembersRef = doc(
        firestore,
        "communities",
        communityData.id
      );
      batch.update(communityMembersRef, {
        numberOfMembers: increment(1),
      });

      await batch.commit();

      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [...prev.mySnippets, newSnippet],
      }));
    } catch (error) {
      console.log("joinCommunity", error);
    }
  };

  const leaveCommunity = async (communityId: string) => {
    try {
      const batch = writeBatch(firestore);

      const communitySnippetRef = doc(
        firestore,
        `users/${user?.uid}/communitySnippets/${communityId}`
      );
      batch.delete(communitySnippetRef);

      const communityMembersRef = doc(firestore, "communities", communityId);
      batch.update(communityMembersRef, {
        numberOfMembers: increment(-1),
      });

      await batch.commit();

      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.filter(
          (item) => item.communityId !== communityId
        ),
      }));
    } catch (error) {
      console.log("leaveCommunity", error);
    }
  };

  return {
    communityStateValue,
    onJoinLeaveCommunity,
    loading,
    setLoading,
    error,
  };
};

export default useCommunityData;

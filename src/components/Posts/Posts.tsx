"use client";

import { Community } from "@/atoms/communityAtom";
import { Post } from "@/atoms/postsAtom";
import { firestore } from "@/firebase/clientApp";
import usePosts from "@/hooks/usePosts";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import PostItem from "./PostItem";
import { Stack } from "@chakra-ui/react";
import PostLoader from "./PostLoader";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";

type Props = {
  communityData: Community;
};

export default function Posts({ communityData }: Props) {
  const [user] = useAuthState(auth);

  const [loading, setLoading] = useState(true);
  const {
    postStateValue,
    setPostStateValue,
    onVote,
    onDeletePost,
    onSelectPost,
  } = usePosts();

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      try {
        const postsCollection = collection(firestore, "posts");
        const filter = where("communityId", "==", communityData.id);
        const order = orderBy("createdAt", "desc");
        const postsQuery = query(postsCollection, filter, order);
        const postDocs = await getDocs(postsQuery);
        const posts = postDocs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPostStateValue((prev) => ({
          ...prev,
          posts: posts as Post[],
        }));
      } catch (error: any) {
        console.log("error getting posts", error.message);
      }
      setLoading(false);
    };

    getPosts();
  }, [communityData.id, setPostStateValue]);

  return (
    <>
      {loading ? (
        <PostLoader />
      ) : (
        <Stack>
          {postStateValue.posts.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              userIsCreator={user?.uid === post.creatorId}
              userVoteValue={undefined}
              onVote={onVote}
              onDeletePost={onDeletePost}
              onSelectPost={onSelectPost}
            />
          ))}
        </Stack>
      )}
    </>
  );
}

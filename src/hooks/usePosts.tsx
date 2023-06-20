"use client";

import { postState } from "@/atoms/postsAtom";
import { useRecoilState } from "recoil";

export default function usePosts() {
  const [postStateValue, setPostStateValue] = useRecoilState(postState);

  const onVote = async () => {};

  const onSelectPost = () => {};

  const onDeletePost = async () => {};

  return {
    postStateValue,
    setPostStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
  };
}

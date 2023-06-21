import { Post, postState } from "@/atoms/postsAtom";
import { firestore, storage } from "@/firebase/clientApp";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useRecoilState } from "recoil";

export default function usePosts() {
  const [postStateValue, setPostStateValue] = useRecoilState(postState);

  const onVote = async () => {};

  const onSelectPost = () => {};

  const onDeletePost = async (post: Post): Promise<boolean> => {
    try {
      if (!post.id) throw new Error("Post id is undefined");

      if (post.imageUrl) {
        const imageRef = ref(storage, `posts/${post.id}/image`);
        await deleteObject(imageRef);
      }

      // delete post
      const postDocRef = doc(firestore, "posts", post.id);
      await deleteDoc(postDocRef);

      // update state
      setPostStateValue((prev) => ({
        ...prev,
        posts: prev.posts.filter((p) => p.id !== post.id),
      }));

      return true;
    } catch (error: any) {}
    return false;
  };

  return {
    postStateValue,
    setPostStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
  };
}

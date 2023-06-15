import { Community } from "@/atoms/communityAtom";
import { firestore } from "@/firebase/clientApp";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

type Props = {
  communityData: Community;
  userId?: string;
};

export default function Posts({ communityData, userId }: Props) {
  const [loading, setLoading] = useState(false);

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
      console.log("posts", posts);
    } catch (error: any) {
      console.log("error getting posts", error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return <div>Posts</div>;
}

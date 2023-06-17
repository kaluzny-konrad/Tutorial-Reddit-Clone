import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  CloseButton,
  Flex,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { BiPoll } from "react-icons/bi";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import TabItem from "./TabItem";
import TextInputs from "./PostForm/TextInputs";
import ImageUpload from "./PostForm/ImageUpload";
import { Post } from "@/atoms/postsAtom";
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import {
  Timestamp,
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { firestore, storage } from "@/firebase/clientApp";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

type Props = {
  user: User;
  communityId: string;
};

// enum for titles
export enum FormTabs {
  Post = "Post",
  ImagesAndVideo = "Images & Video",
  Link = "Link",
  Poll = "Poll",
  Talk = "Talk",
}

const formTabs: TabItem[] = [
  {
    title: FormTabs.Post,
    icon: IoDocumentText,
  },
  {
    title: FormTabs.ImagesAndVideo,
    icon: IoImageOutline,
  },
  {
    title: FormTabs.Link,
    icon: BsLink45Deg,
  },
  {
    title: FormTabs.Poll,
    icon: BiPoll,
  },
  {
    title: FormTabs.Talk,
    icon: BsMic,
  },
];

export type TabItem = {
  title: string;
  icon: typeof Icon.arguments;
};

export default function NewPostForm({ user, communityId }: Props) {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = React.useState(formTabs[0].title);
  const [textInputs, setTextInputs] = React.useState({
    title: "",
    body: "",
  });

  const [selectedFile, setSelectedFile] = React.useState<string>();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleCreatePost = async () => {
    const newPost: Post = {
      communityId: communityId,
      creatorId: user.uid,
      creatorDisplayName:
        user.email!.split("@")[0] || "Anonymous",
      title: textInputs.title,
      body: textInputs.body,
      numberOfComments: 0,
      voteStatus: 0,
      createdAt: serverTimestamp() as Timestamp,
    };

    setLoading(true);
    try {
      const postCollection = collection(firestore, "posts");
      const postDocRef = await addDoc(postCollection, newPost);

      if (selectedFile) {
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
        await uploadString(imageRef, selectedFile, "data_url");

        const downloadUrl = await getDownloadURL(imageRef);
        await updateDoc(postDocRef, { imageUrl: downloadUrl });
      }
    } catch (error: any) {
      console.log("handleCreatePost error", error);
      setError(true);
    }
    setLoading(false);

    router.push(`/r/${communityId}`);
  };

  const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target.result as string);
      }
    };
  };

  const onTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setTextInputs((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Flex direction={"column"} bg={"white"} borderRadius={4} mt={2}>
      <Flex width={"100%"}>
        {formTabs.map((tab) => (
          <TabItem
            key={tab.title}
            item={tab}
            selected={tab.title === selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </Flex>
      <Flex padding={4}>
        {selectedTab === FormTabs.Post && (
          <TextInputs
            textInputs={textInputs}
            handleCreatePost={handleCreatePost}
            onChange={onTextChange}
            loading={loading}
          />
        )}
        {selectedTab === FormTabs.ImagesAndVideo && (
          <ImageUpload
            selectedFile={selectedFile}
            onSelectImage={onSelectImage}
            setSelectedTab={setSelectedTab}
            setSelectedFile={setSelectedFile}
          />
        )}
      </Flex>
      {error && (
        <Alert status="error" borderRadius={0}>
          <AlertIcon />
          <AlertTitle mr={2}>Error creating post</AlertTitle>
        </Alert>
      )}
    </Flex>
  );
}

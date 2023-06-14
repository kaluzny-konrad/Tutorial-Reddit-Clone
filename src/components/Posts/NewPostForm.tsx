import { Flex, Icon } from "@chakra-ui/react";
import React from "react";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { BiPoll } from "react-icons/bi";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import TabItem from "./TabItem";
import TextInputs from "./PostForm/TextInputs";
import ImageUpload from "./PostForm/ImageUpload";
import { Post } from "@/atoms/postsAtom";

type Props = {};

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

export default function NewPostForm({}: Props) {
  const [selectedTab, setSelectedTab] = React.useState(formTabs[1].title);
  const [textInputs, setTextInputs] = React.useState({
    title: "",
    body: "",
  });

  const [selectedFile, setSelectedFile] = React.useState<string>();
  const [loading, setLoading] = React.useState(false);

  const handleCreatePost = async () => {
    // const newPost: Post = {};
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
    </Flex>
  );
}

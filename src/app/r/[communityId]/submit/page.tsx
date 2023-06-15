"use client";

import PageContent from "@/components/Layout/PageContent";
import NewPostForm from "@/components/Posts/NewPostForm";
import useAuthentication from "@/hooks/useAuthentication";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

type Props = {
  params: {
    communityId: string;
  };
};

export default function submit({ params: { communityId } }: Props) {
  const { user } = useAuthentication();
  return (
    <PageContent>
      <>
        <Box p={"14px 0px"} borderBottom={"1px solid"} borderColor={"white"}>
          <Text>Create a post</Text>
        </Box>
        {user && <NewPostForm user={user} communityId={communityId} />}
      </>
      <>{/* <About /> */}</>
    </PageContent>
  );
}

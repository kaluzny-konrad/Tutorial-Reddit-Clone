'use client'

import { Box, Text } from "@chakra-ui/react";

type Props = {};

export default function NewPostHeader({}: Props) {
  return (
    <Box p={"14px 0px"} borderBottom={"1px solid"} borderColor={"white"}>
      <Text>Create a post</Text>
    </Box>
  );
}

import { Button, Flex, Input, Stack, Textarea } from "@chakra-ui/react";
import React from "react";

type Props = {
  textInputs: {
    title: string;
    body: string;
  };
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleCreatePost: () => void;
  loading: boolean;
};

export default function TextInputs({
  textInputs,
  onChange,
  handleCreatePost,
  loading,
}: Props) {
  return (
    <Stack spacing={3} width={"100%"}>
      <Input
        name="title"
        value={textInputs.title}
        onChange={onChange}
        fontSize={"10pt"}
        borderRadius={4}
        placeholder="Title"
        _placeholder={{ color: "gray.500" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
      />
      <Textarea
        name="body"
        fontSize={"10pt"}
        value={textInputs.body}
        onChange={onChange}
        borderRadius={4}
        placeholder="Text (optional)"
        height={"100px"}
        _placeholder={{ color: "gray.500" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
      />
      <Flex justify={"flex-end"}>
        <Button
          height={"34px"}
          padding={"0 30px"}
          onClick={handleCreatePost}
          isDisabled={!textInputs.title}
          isLoading={loading}
        >
          Post
        </Button>
      </Flex>
    </Stack>
  );
}

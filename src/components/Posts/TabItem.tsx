import React from "react";
import { TabItem } from "./NewPostForm";
import { Flex, Icon, Text } from "@chakra-ui/react";

type Props = {
  item: TabItem;
  selected: boolean;
  setSelectedTab: (title: string) => void;
};

export default function TabItem({ item, selected, setSelectedTab }: Props) {
  return (
    <Flex
      justify={"center"}
      align={"center"}
      flexGrow={1}
      fontWeight={700}
      py={"14px"}
      cursor={"pointer"}
      _hover={{ bg: "gray.50" }}
      color={selected ? "blue.500" : "gray.500"}
      borderWidth={selected ? "0 1px 2px 0" : "0 1px 1px 0"}
      borderBottomColor={selected ? "blue.500" : "gray.200"}
      borderRightColor={"gray.200"}
      onClick={() => setSelectedTab(item.title)}
    >
      <Flex align={"center"} height={"20px"} mr={2}>
        <Icon as={item.icon} />
      </Flex>
      <Text fontSize={"10pt"}>{item.title}</Text>
    </Flex>
  );
}

import { Flex, Icon } from "@chakra-ui/react";
import React from "react";
import { BsArrowUpRightCircle, BsChatDots } from "react-icons/bs";
import {
  IoFilterCircleOutline,
  IoNotificationsOutline,
  IoVideocamOutline,
} from "react-icons/io5";
import { GrAdd } from "react-icons/gr";

const Icons = () => {
  return (
    <Flex className="icons" alignItems="center" flexGrow={1}>
      <Flex
        display={{ base: "none", md: "flex" }}
        align="center"
        borderRight="1px solid"
        borderColor="gray.200"
        className="iconsLeft"
      >
        <Flex
          className="iconLeft iconArrowUp"
          mx={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{
            bg: "gray.200",
          }}
        >
          <Icon as={BsArrowUpRightCircle} fontSize={20} />
        </Flex>

        <Flex
          className="iconLeft iconFilter"
          mx={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{
            bg: "gray.200",
          }}
        >
          <Icon as={IoFilterCircleOutline} fontSize={22} />
        </Flex>

        <Flex
          className="iconLeft iconVideo"
          mx={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{
            bg: "gray.200",
          }}
        >
          <Icon as={IoVideocamOutline} fontSize={22} />
        </Flex>
      </Flex>
      <>
        <Flex
          className="iconRight iconChat"
          mx={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{
            bg: "gray.200",
          }}
        >
          <Icon as={BsChatDots} fontSize={20} />
        </Flex>

        <Flex
          className="iconRight iconNotification"
          mx={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{
            bg: "gray.200",
          }}
        >
          <Icon as={IoNotificationsOutline} fontSize={20} />
        </Flex>

        <Flex
          className="iconRight iconAdd"
          mx={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          display={{ base: "none", md: "flex" }}
          _hover={{
            bg: "gray.200",
          }}
        >
          <Icon as={GrAdd} fontSize={20} />
        </Flex>
      </>
    </Flex>
  );
};

export default Icons;

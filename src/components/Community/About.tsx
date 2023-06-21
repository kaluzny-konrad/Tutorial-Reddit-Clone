"use client";

import { Community, communityState } from "@/atoms/communityAtom";
import {
  Box,
  Divider,
  Flex,
  Icon,
  Stack,
  Text,
  Button,
} from "@chakra-ui/react";
import moment from "moment";
import Link from "next/link";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiCakeLine } from "react-icons/ri";
import { useRecoilValue } from "recoil";

type Props = {
  communityData: Community;
};

export default function About({ communityData }: Props) {
  const communityStateValue = useRecoilValue(communityState);

  return (
    <Box position={"sticky"} top={"14px"}>
      <Flex
        justify={"space-between"}
        align={"center"}
        bg={"blue.400"}
        color={"white"}
        p={3}
        borderRadius={"4px 4px 0px 0px"}
      >
        <Text fontSize={"10pt"} fontWeight={700}>
          About Community
        </Text>
        <Icon as={HiOutlineDotsHorizontal} />
      </Flex>
      <Flex
        direction={"column"}
        p={3}
        bg={"white"}
        borderRadius={"0px 0px 4px 4px"}
      >
        <Stack>
          <Flex width={"100%"} p={2} fontSize={"10pt"} fontWeight={700}>
            <Flex direction={"column"} flexGrow={1}>
              <Text>{communityData.numberOfMembers.toLocaleString()}</Text>
              <Text>Members</Text>
            </Flex>
            <Flex direction={"column"} flexGrow={1}>
              <Text>{1}</Text>
              <Text>Online</Text>
            </Flex>
          </Flex>
          <Divider />
          <Flex
            align={"center"}
            width={"100%"}
            p={1}
            fontWeight={500}
            fontSize={"10pt"}
          >
            <Icon as={RiCakeLine} />
            {communityData.createdAt && (
              <Text ml={1}>
                Created{" "}
                {moment(
                  new Date(communityData.createdAt.seconds * 1000)
                ).format("MMM DD, YYYY")}
              </Text>
            )}
          </Flex>
          <Link href={`/r/${communityData.id}/submit`}>
            <Button mt={3} height={"30px"}>
              Create Post
            </Button>
          </Link>
        </Stack>
      </Flex>
    </Box>
  );
}

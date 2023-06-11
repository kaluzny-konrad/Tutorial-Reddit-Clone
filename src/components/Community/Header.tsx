import { Community } from "@/atoms/communityAtom";
import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaReddit } from "react-icons/fa";
import { Image } from "@chakra-ui/react";
import useCommunityData from "@/hooks/useCommunityData";

type Props = {
  community: Community;
};

export default function Header({ community }: Props) {
  const { communityStateValue, onJoinLeaveCommunity, loading } = useCommunityData();
  const isJoined = !!communityStateValue.mySnippets.find(
    (item) => item.communityId === community.id
  );

  return (
    <Flex direction="column" width="100%" height="146px">
      <Box height="50%" bg="blue.400" />
      <Flex justify="center" bg="white" flexGrow={1}>
        <Flex width="95%" maxWidth="860px">
          {community?.imageUrl ? (
            <Image />
          ) : (
            <Icon
              as={FaReddit}
              fontSize={64}
              position="relative"
              top={-3}
              color="blue.500"
              outline="4px solid white"
              outlineOffset={-1}
              borderRadius="50%"
            />
          )}
          <Flex py="10px" px="16px">
            <Flex direction="column" mr={6}>
              <Text fontWeight={800} fontSize="16pt">
                {community?.id}
              </Text>
              <Text fontWeight={600} fontSize="10pt" color="gray.400">
                r/{community?.id}
              </Text>
            </Flex>
            <Button
              variant={isJoined ? "outline" : "solid"}
              height="30px"
              px={6}
              onClick={() => onJoinLeaveCommunity(community, isJoined)}
              isLoading={loading}
            >
              {isJoined ? "Joined" : "Join"}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

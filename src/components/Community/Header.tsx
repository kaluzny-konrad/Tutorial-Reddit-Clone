import { Community } from "@/atoms/communityAtom";
import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { FaReddit } from "react-icons/fa";
import { Image } from "@chakra-ui/react";
import useCommunityData from "@/hooks/useCommunityData";

type Props = {
  communityData: Community;
};

export default function Header({ communityData }: Props) {
  const { communityStateValue, onJoinOrLeaveCommunity } = useCommunityData();
  const isJoined = !!communityStateValue?.mySnippets?.find(
    (item) => item.communityId === communityData.id
  );

  return (
    <Flex direction="column" width="100%" height="146px">
      <Box height="50%" bg="blue.400" />
      <Flex justify="center" bg="white" flexGrow={1}>
        <Flex width="95%" maxWidth="860px">
          {communityData?.imageUrl ? (
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
                {communityData?.id}
              </Text>
              <Text fontWeight={600} fontSize="10pt" color="gray.400">
                r/{communityData?.id}
              </Text>
            </Flex>
            <Button
              variant={isJoined ? "outline" : "solid"}
              height="30px"
              px={6}
              onClick={() => onJoinOrLeaveCommunity(communityData, isJoined)}
            >
              {isJoined ? "Joined" : "Join"}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

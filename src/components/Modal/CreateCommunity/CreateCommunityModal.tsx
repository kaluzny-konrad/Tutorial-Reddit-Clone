import { firestore } from "@/firebase/clientApp";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { doc, runTransaction, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";

type Props = {
  open: boolean;
  handleClose: () => void;
};

const CreateCommunityModal = ({ open, handleClose }: Props) => {
  const [user] = useAuthState(auth);
  const [cummunityName, setCummunityName] = useState("");
  const charsLimit = 21;
  const [charsRemaining, setCharsRemaining] = useState(charsLimit);
  const [communityType, setCommunityType] = useState("public");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCummunityNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.value.length > charsLimit) return;
    setCummunityName(e.target.value);
    setCharsRemaining(charsLimit - e.target.value.length);
  };

  const onCommunityTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommunityType(e.target.value);
  };

  const handleCreateCommunity = async () => {
    if (error) setError("");

    // Validate the community special characters
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(cummunityName)) {
      setError("Community name can't contain special characters!");
      return;
    }

    // Validate the community name length
    if (cummunityName.length < 3) {
      setError("Community name must be atleast 3 characters long!");
      return;
    }

    setLoading(true);

    try {
      // Check if the community already exists
      const communityDocRef = doc(firestore, "communities", cummunityName);

      await runTransaction(firestore, async (transaction) => {
        const communityDoc = await transaction.get(communityDocRef);
        if (communityDoc.exists()) {
          throw new Error("Community already exists!");
        }

        // Try Create the community document in firestore
        transaction.set(communityDocRef, {
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          privacyType: communityType,
        });

        // Add the community to the user's communities array
        const userDocRef = doc(
          firestore,
          `users/${user?.uid}/communitySnippets`,
          cummunityName
        );
        transaction.set(userDocRef, {
          communityId: cummunityName,
          isModerator: true,
        });
      });
    } catch (error: any) {
      console.info("handleCreateCommunity", error);
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <>
      <Modal isOpen={open} onClose={handleClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            flexDirection="column"
            fontSize={15}
            padding={3}
          >
            Create a cummunity
          </ModalHeader>

          <Box px={3}>
            <Divider />
            <ModalCloseButton />
            <ModalBody display="flex" flexDirection="column" padding="10px 0px">
              <Text fontSize={15} fontWeight={600}>
                Text body
              </Text>
              <Text fontSize={11} color="gray.500">
                Community names including capitalization cannot be changed.
              </Text>
              <Text
                position="relative"
                top="28px"
                left="10px"
                width="20px"
                color="gray.400"
              >
                r/
              </Text>
              <Input
                position="relative"
                value={cummunityName}
                size="sm"
                pl="22px"
                onChange={handleCummunityNameChange}
              ></Input>
              <Text
                fontSize="9pt"
                color={charsRemaining === 0 ? "red" : "gray.500"}
              >
                {charsRemaining} Characters remaining
              </Text>
              <Text fontSize="9pt" color="red" pt={1}>
                {error}
              </Text>
              <Box my={4}>
                <Text fontSize={15} fontWeight={600}>
                  Community Type
                </Text>
                <Stack spacing={2}>
                  <Checkbox
                    value="public"
                    isChecked={communityType === "public"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align="center">
                      <Icon as={BsFillPersonFill} color="gray.500" mr={2} />
                      <Text fontSize="10pt" mr={1}>
                        Public
                      </Text>
                      <Text fontSize="8pt" color="gray.500" pt={1}>
                        Anyone can view, post, and comment to this community.
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    value="restricted"
                    isChecked={communityType === "restricted"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align="center">
                      <Icon as={BsFillEyeFill} color="gray.500" mr={2} />
                      <Text fontSize="10pt" mr={1}>
                        Restricted
                      </Text>
                      <Text fontSize="8pt" color="gray.500" pt={1}>
                        Anyone can view this community, but only approved users
                        can post.
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    value="private"
                    isChecked={communityType === "private"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align="center">
                      <Icon as={HiLockClosed} color="gray.500" mr={2} />
                      <Text fontSize="10pt" mr={1}>
                        Private
                      </Text>
                      <Text fontSize="8pt" color="gray.500" pt={1}>
                        Only approved users can view and submit to this
                        community.
                      </Text>
                    </Flex>
                  </Checkbox>
                </Stack>
              </Box>
            </ModalBody>
          </Box>

          <ModalFooter bg="gray.100" borderRadius="0px 0px 10px 10px">
            <Button
              variant="outline"
              height="30px"
              mr={3}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              height="30px"
              onClick={handleCreateCommunity}
              isLoading={loading}
            >
              Create Community
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateCommunityModal;

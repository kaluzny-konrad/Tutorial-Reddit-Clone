import { SearchIcon } from "@chakra-ui/icons";
import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";

export default function SearchInput() {
  const [user] = useAuthState(auth);

  return (
    <Flex
      flexGrow={1}
      mr={2}
      align="center"
      maxWidth={user ? "auto" : "600px"}
      className="search"
    >
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.400" mb={1} />
        </InputLeftElement>
        <Input
          placeholder="Search Reddit"
          fontSize="10pt"
          _placeholder={{ color: "gray.500" }}
          _hover={{
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          _focus={{
            outline: "none",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          height="34px"
          bg="gray.50"
        />
      </InputGroup>
    </Flex>
  );
}

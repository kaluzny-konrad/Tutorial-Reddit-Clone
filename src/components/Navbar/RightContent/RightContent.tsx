import { Button, Flex } from "@chakra-ui/react";
import AuthButtons from "./AuthButtons";
import AuthModal from "@/components/Modal/Auth/AuthModal";
import { auth } from "@/firebase/clientApp";
import { signOut } from "firebase/auth";

type Props = {
  user: any;
};

export default function RightContent({ user }: Props) {
  return (
    <>
      <AuthModal />
      <Flex justify="center" align="center">
        {user ? (
          <Button
            height="28px"
            display={{ base: "none", sm: "flex" }}
            width={{ base: "70px", md: "110px" }}
            mr={2}
            onClick={() => signOut(auth)}
          >
            Logout
          </Button>
        ) : (
          <AuthButtons />
        )}
      </Flex>
    </>
  );
}

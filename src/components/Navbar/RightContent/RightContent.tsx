import { Flex } from "@chakra-ui/react";
import AuthButtons from "./AuthButtons";
import AuthModal from "@/components/Modal/Auth/AuthModal";
import Icons from "./Icons";
import UserMenu from "./UserMenu";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";

export default function RightContent() {
  const [user] = useAuthState(auth);

  return (
    <>
      <AuthModal />
      <Flex justify="center" align="center" className="rightContent">
        {user ? <Icons /> : <AuthButtons />}
        <UserMenu />
      </Flex>
    </>
  );
}

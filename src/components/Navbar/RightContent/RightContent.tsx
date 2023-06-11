import { Button, Flex } from "@chakra-ui/react";
import AuthButtons from "./AuthButtons";
import AuthModal from "@/components/Modal/Auth/AuthModal";
import { auth } from "@/firebase/clientApp";
import { User, signOut } from "firebase/auth";
import Icons from "./Icons";
import UserMenu from "./UserMenu";
import { useAuthState } from "react-firebase-hooks/auth";


export default function RightContent() {
  const [user] = useAuthState(auth);
  return (
    <>
      <AuthModal />
      <Flex justify="center" align="center" className="rightContent">
        {user ? <Icons /> : <AuthButtons />}
        {user ? <UserMenu/> : <></>}
      </Flex>
    </>
  );
}

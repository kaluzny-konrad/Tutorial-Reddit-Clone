import { Button, Flex } from "@chakra-ui/react";
import AuthButtons from "./AuthButtons";
import AuthModal from "@/components/Modal/Auth/AuthModal";
import { auth } from "@/firebase/clientApp";
import { User, signOut } from "firebase/auth";
import Icons from "./Icons";
import UserMenu from "./UserMenu";

type Props = {
  user?: User | null;
};

export default function RightContent({ user }: Props) {
  return (
    <>
      <AuthModal />
      <Flex justify="center" align="center" className="rightContent">
        {user ? <Icons /> : <AuthButtons />}
        <UserMenu user={user}/>
      </Flex>
    </>
  );
}

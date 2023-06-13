import { Flex } from "@chakra-ui/react";
import AuthButtons from "./AuthButtons";
import AuthModal from "@/components/Modal/Auth/AuthModal";
import Icons from "./Icons";
import UserMenu from "./UserMenu";
import useAuthentication from "@/hooks/useAuthentication";

export default function RightContent() {
  const { user } = useAuthentication();

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

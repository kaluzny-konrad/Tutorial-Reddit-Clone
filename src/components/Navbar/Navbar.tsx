'use client'

import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import SearchInput from "./SearchInput";
import RightContent from "./RightContent/RightContent";
import { auth } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import Directory from "./Directory/Directory";

const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <nav>
      <Flex
        bg="white"
        height="44px"
        justify={{ md: "space-between" }}
        padding="6px 12px"
        className="navbar"
      >
        <Flex
          align="center"
          width={{ base: "40px", md: "auto" }}
          mr={{base: 0, md: 2}}
          className="logo"
        >
          <Image src="/images/redditFace.svg" height="30px" />
          <Image
            src="/images/redditText.svg"
            height="46px"
            display={{ base: "none", md: "unset" }}
          />
        </Flex>
        {user && <Directory />}
        <SearchInput user={user} />
        <RightContent user={user} />
      </Flex>
    </nav>
  );
};

export default Navbar;

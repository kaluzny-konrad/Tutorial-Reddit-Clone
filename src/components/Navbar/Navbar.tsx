import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import SearchInput from "./SearchInput";
import RightContent from "./RightContent/RightContent";
import { auth } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {
    const [user, loading, error] = useAuthState(auth);
    
    return (
        <nav>
            <Flex bg='white' height='44px' padding='6px 12px'>
                <Flex align='center'>
                    <Image 
                        src='/images/redditFace.svg' 
                        height='30px' />
                    <Image 
                        src='/images/redditText.svg' 
                        height='46px'
                        display={{ base: 'none', md: 'unset' }} />
                </Flex>
                <SearchInput />
                {/* <Directory /> */}
                <RightContent user={user}/>
            </Flex>
        </nav>
    )
};

export default Navbar;
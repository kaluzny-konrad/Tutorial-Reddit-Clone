import { Flex } from "@chakra-ui/react";
import AuthButtons from "./AuthButtons";
import AuthModal from "@/components/Modal/Auth/AuthModal";

type Props = {
    // user: any;
};

export default function RightContent({}: Props) {
    return (
        <>
        <AuthModal />
        <Flex justify='center' align='center'>
            <AuthButtons />
        </Flex>
        </>
    );
}
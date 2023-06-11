import { Flex } from "@chakra-ui/react";

export default function PageContent({ children }: any) {
  return (
    <Flex justify="center" py="16px" border="1px solid red">
      <Flex
        width="95%"
        justify="center"
        maxWidth="860px"
        border="1px solid green"
      >
        <Flex
          direction="column"
          width={{ base: "100%", md: "65%" }}
          mr={{ base: 0, md: 6 }}
          className="leftContent"
          border="1px solid blue"
        >
          {children && children[0 as keyof typeof children]}
        </Flex>
        <Flex
          direction="column"
          display={{ base: "none", md: "flex" }}
          flexGrow={1}
          className="rightContent"
          border="1px solid orange"
        >
          {children && children[1 as keyof typeof children]}
        </Flex>
      </Flex>
    </Flex>
  );
}

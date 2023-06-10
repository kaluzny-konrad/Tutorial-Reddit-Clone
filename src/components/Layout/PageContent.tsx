import { Flex } from "@chakra-ui/react";
import React from "react";

type Props = {};

const PageContent = (props: Props) => {
  return (
    <Flex>
      <Flex>
        <Flex className="leftContent"></Flex>
        <Flex className="rightContent"></Flex>
      </Flex>
    </Flex>
  );
};

export default PageContent;

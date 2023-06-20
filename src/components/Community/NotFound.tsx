"use client";

import { Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      minHeight="60vh"
    >
      <Text>Sorry, that community doesn&apos;t exist or has been banned.</Text>
      <Link href="/">
        <Button mt={4}>GO HOME</Button>
      </Link>
    </Flex>
  );
}

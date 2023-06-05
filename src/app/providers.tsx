"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../chakra/theme";
import { RecoilRoot } from "recoil";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <RecoilRoot>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </RecoilRoot>
    </CacheProvider>
  );
}

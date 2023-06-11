"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../chakra/theme";
import { RecoilRoot } from "recoil";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </RecoilRoot>
  );
}

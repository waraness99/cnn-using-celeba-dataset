import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";
import { Header } from "src/components/Layout/Header/Header.component";

export const PageLayout: React.FC<BoxProps> = ({ children, ...rest }) => {
  return (
    <Box minHeight="100vh" {...rest}>
      <Header />
      {children}
    </Box>
  );
};

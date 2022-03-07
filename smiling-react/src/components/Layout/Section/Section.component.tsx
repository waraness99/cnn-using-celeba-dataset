import React from "react";
import { Box, BoxProps, Stack } from "@chakra-ui/react";

export interface SectionProps extends BoxProps {
  isTwoCol?: boolean;
  mainBg?: string;
}

export const Section: React.FC<SectionProps> = ({ isTwoCol, mainBg, children, ...rest }) => {
  return (
    <Box as="section" py={{ base: "8", md: "12", lg: "16" }} bg={mainBg}>
      <Box maxW={{ base: "xl", md: "7xl" }} mx="auto" px={{ base: "6", md: "8" }} {...rest}>
        {isTwoCol ? (
          <Stack direction={{ base: "column", lg: "row" }} spacing={{ base: "12", lg: "20" }} justify="space-between">
            {children}
          </Stack>
        ) : (
          children
        )}
      </Box>
    </Box>
  );
};

import React from "react";
import NextLink from "next/link";
import { Box, Flex, Heading, HStack } from "@chakra-ui/react";
import { DarkModeSwitch } from "src/components/DarkModeSwitch/DarkModeSwitch.component";

export const Header = () => {
  return (
    <Box as="header" top="0" w="100%" borderBottomWidth="1px">
      <Box maxW="7xl" mx="auto" py="4" px={{ base: "6", md: "8" }}>
        <Flex as="nav" justify="space-between">
          <HStack spacing="8">
            <NextLink href="/" passHref>
              <Box as="a" rel="home">
                <Heading size="lg" fontWeight="extrabold">
                  Smile AI
                </Heading>
              </Box>
            </NextLink>
          </HStack>
          <Flex align="center">
            <DarkModeSwitch />
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

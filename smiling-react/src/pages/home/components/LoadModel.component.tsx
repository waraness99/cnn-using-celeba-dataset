import { Text, Spinner, Stack, useColorModeValue as mode } from "@chakra-ui/react";

export const LoadModel = () => {
  return (
    <Stack spacing="6" align="center" color={mode(`gray.500`, `whiteAlpha.800`)}>
      <Spinner size="xl" />
      <Text textAlign="center">Loading our classification model...</Text>
    </Stack>
  );
};
export default LoadModel;

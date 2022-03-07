import React from "react";
import { Heading, HeadingProps } from "@chakra-ui/react";

const H1: React.FC<HeadingProps> = ({ ...rest }) => {
  return <Heading as="h1" size="3xl" fontWeight="extrabold" letterSpacing="tight" {...rest} />;
};

const H2: React.FC<HeadingProps> = ({ ...rest }) => {
  return <Heading as="h2" size="2xl" fontWeight="extrabold" letterSpacing="tight" {...rest} />;
};

export { H1, H2 };

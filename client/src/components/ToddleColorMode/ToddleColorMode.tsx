import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { Button, Flex, Text, useColorMode } from "@chakra-ui/react";
import React from "react";

type Props = {};

export default function ToddleColorMode({}: Props) {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button
      onClick={() => toggleColorMode()}
      pos="absolute"
      top="0"
      right="0"
      m="1rem"
    >
      {colorMode === "dark" ? (
        <Flex gap={2} align={"center"}>
          <Text>Light Mode</Text>
          <SunIcon color="orange.200" />
        </Flex>
      ) : (
        <Flex gap={2} align={"center"}>
          <Text>Dark Mode</Text>
          <MoonIcon color="blue.700" />
        </Flex>
      )}
    </Button>
  );
}

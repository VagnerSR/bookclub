import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorMode,
  Stack,
  Flex,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import React from "react";

type UserMenuProps = {
  session: Session;
};

export default function UserMenu({ session }: UserMenuProps) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"
      />

      <MenuList>
        <Stack>
          <MenuItem onClick={() => toggleColorMode()}>
            {colorMode === "dark" ? (
              <Flex gap={2} align={"center"}>
                <SunIcon color="orange.200" />
                <Text>Light Mode</Text>
              </Flex>
            ) : (
              <Flex gap={2} align={"center"}>
                <MoonIcon color="blue.700" />
                <Text>Dark Mode</Text>
              </Flex>
            )}
          </MenuItem>
          <MenuItem onClick={() => signOut()}>
            <Flex gap={2} align={"center"}>
              <CloseIcon color="red.300" />
              <Text>Log out</Text>
            </Flex>
          </MenuItem>
        </Stack>
      </MenuList>
    </Menu>
  );
}

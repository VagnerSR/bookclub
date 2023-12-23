import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import { SearchedUser } from "../../../interfaces/User";
import { SmallCloseIcon } from "@chakra-ui/icons";

type MembersProps = {
  members: Array<SearchedUser>;
  removeMember: (userId: string) => void;
};

export default function Members({ members, removeMember }: MembersProps) {
  return (
    <Flex mt={8} gap="10px" flexWrap="wrap">
      {members.map((member) => (
        <Stack
          direction="row"
          align="center"
          bg="whiteAlpha.200"
          borderRadius={4}
          p={2}
          key={member.id}
        >
          <Text>{member.username}</Text>

          <SmallCloseIcon
            cursor="pointer"
            color="red"
            onClick={() => removeMember(member.id)}
          />
        </Stack>
      ))}
    </Flex>
  );
}

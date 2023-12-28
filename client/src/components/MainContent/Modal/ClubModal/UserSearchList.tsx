import { Avatar, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { SearchedUser } from "../../../../interfaces/User";

type UserSearchListProps = {
  users: Array<SearchedUser>;
  addMember: (user: SearchedUser) => void;
};

export default function UserSearchList({
  users,
  addMember,
}: UserSearchListProps) {
  return (
    <>
      {users.length === 0 ? (
        <Flex mt={6} justify="center">
          <Text>No users found</Text>
        </Flex>
      ) : (
        <Stack mt={6}>
          {users.map((user) => (
            <Stack
              direction="row"
              align="center"
              spacing={4}
              py={4}
              px={4}
              borderRadius={4}
              _hover={{ bg: "whiteAlpha.200" }}
              key={user.id}
            >
              <Avatar src={user.image} />
              <Flex justify="space-between" align="center" width="100%">
                <Text fontSize={20}>{user.username}</Text>
                <Button colorScheme="messenger" onClick={() => addMember(user)}>
                  Select
                </Button>
              </Flex>
            </Stack>
          ))}
        </Stack>
      )}
    </>
  );
}

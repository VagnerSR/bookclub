import { Stack, Button, Text, Avatar, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ClubData } from "../../../../interfaces/Club";
import ClubOperations from "../../../../graphql/operations/club";
import { useQuery } from "@apollo/client";

type ClubHeaderProps = {
  userId: string;
  clubId: string;
};

export default function ClubHeader({ userId, clubId }: ClubHeaderProps) {
  const { data, loading } = useQuery<ClubData>(ClubOperations.Queries.clubs);
  const router = useRouter();

  const club = data?.clubs.find((club) => club.id === clubId);

  if (data?.clubs && !loading && !club) {
    router.replace("/");
  }

  return (
    <Stack
      ml={2}
      direction="row"
      align="center"
      spacing={6}
      py={5}
      px={{ base: 4, md: 0 }}
      borderBottom="1px solid"
      borderColor="whiteAlpha.200"
    >
      <Button
        onClick={() =>
          router.replace("?conversationId", "/", {
            shallow: true,
          })
        }
      >
        Back
      </Button>
      {!club && !loading && <Text>Conversation Not Found</Text>}
      {club && (
        <Stack direction="row" pl={2} align="center">
          <Text color="whiteAlpha.600">Members: </Text>
          {club.members.map((member) => (
            <Flex key={member.user.id}  align="center" gap={2}>
              <Avatar src={member.user.image!} />

              <Text fontWeight={600}>{member.user.username}</Text>
              <Text>heve read</Text>
            </Flex>
          ))}
        </Stack>
      )}
    </Stack>
  );
}

import { Stack, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ClubData } from "../../../interfaces/Club";
import ClubOperations from "../../../graphql/operations/club";
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
      direction="row"
      align="center"
      spacing={6}
      py={5}
      px={{ base: 4, md: 0 }}
      borderBottom="1px solid"
      borderColor="whiteAlpha.200"
    >
      <Button
        display={{ md: "none" }}
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
        <Stack direction="row" pl={2}>
          <Text color="whiteAlpha.600">Members: </Text>
          {club.members.map((member) => (
            <Text key={member.user.id} fontWeight={600}>
              {member.user.username}
            </Text>
          ))}
        </Stack>
      )}
    </Stack>
  );
}

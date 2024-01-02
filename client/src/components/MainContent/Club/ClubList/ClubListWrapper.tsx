import { Avatar, Box, Button, Flex, Text, Stack } from "@chakra-ui/react";
import { Session } from "next-auth";
import ClubList from "./ClubList";
import { useQuery } from "@apollo/client";
import ClubOperations from "../../../../graphql/operations/club";
import { ClubData } from "../../../../interfaces/Club";
import { useRouter } from "next/router";
import UserMenu from "../../UserMenu/UserMenu";

interface ClubProps {
  session: Session;
}
export default function Club({ session }: ClubProps) {
  const {
    data: clubsData,
    error: clubsError,
    loading: clubsLoading,
  } = useQuery<ClubData>(ClubOperations.Queries.clubs);
  const router = useRouter();
  const { clubId } = router.query;

  async function onViewClub(clubId: string) {
    router.push({ query: { clubId } });
  }

  return (
    <Stack
      display={{ base: clubId ? "none" : "flex", md: "flex" }}
      width={{ base: "100%", md: "400px" }}
      bg="whiteAlpha.50"
      py={6}
      px={3}
    >
      <Flex align="center" justify="space-between" gap={3} mb={6}>
        <Flex justify={"flex-start"} align="center" gap={3}>
          {session.user.image && (
            <Avatar src={session?.user?.image} name={session?.user?.username} />
          )}
          <Text fontWeight={"bold"} fontSize={"lg"}>
            {session?.user?.username}
          </Text>
        </Flex>

        <UserMenu session={session} />
      </Flex>

      <ClubList
        session={session}
        clubs={clubsData?.clubs || []}
        onViewClub={onViewClub}
      />
    </Stack>
  );
}

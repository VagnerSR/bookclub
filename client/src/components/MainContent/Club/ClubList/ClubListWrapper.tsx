import { Box, Button } from "@chakra-ui/react";
import { Session } from "next-auth";
import ClubList from "./ClubList";
import { signOut } from "next-auth/react";
import { useQuery } from "@apollo/client";
import ClubOperations from "../../../../graphql/operations/club";
import { ClubData } from "../../../../interfaces/Club";
import { useRouter } from "next/router";

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

  console.log(clubsData);

  async function onViewClub(clubId: string) {
    router.push({ query: { clubId } });
  }

  return (
    <Box width={{ base: "100%", md: "400px" }} bg="whiteAlpha.50" py={6} px={3}>
      <ClubList
        session={session}
        clubs={clubsData?.clubs || []}
        onViewClub={onViewClub}
      />
      <Button colorScheme="red" variant="outline" onClick={() => signOut()}>
        Log out
      </Button>
    </Box>
  );
}

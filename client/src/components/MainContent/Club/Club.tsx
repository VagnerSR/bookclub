import { Box, Button } from "@chakra-ui/react";
import { Session } from "next-auth";
import ClubList from "./ClubList";
import { signOut } from "next-auth/react";

interface ClubProps {
  session: Session;
}
export default function Club({ session }: ClubProps) {
  return (
    <Box width={{ base: "100%", md: "400px" }} bg="whiteAlpha.50" py={6} px={3}>
      <ClubList session={session} />
      <Button colorScheme="red" variant="outline" onClick={() => signOut()}>
        Log out
      </Button>
    </Box>
  );
}

import { Box, Flex, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import ClubHeader from "./ClubHeader";

interface FeedProps {
  session: Session;
}
export default function Feed({ session }: FeedProps) {
  const router = useRouter();
  const { clubId } = router.query;
  const {
    user: { id: userId },
  } = session;

  return (
    <Flex
      display={{ base: clubId ? "flex" : "none", md: "flex" }}
      width="100%"
      direction="column"
    >
      {clubId && typeof clubId == "string" ? (
        <Flex
          direction="column"
          justify="space-between"
          overflow="hidden"
          flexGrow={1}
        >
          <ClubHeader userId={userId} clubId={clubId} />
        </Flex>
      ) : (
        <Flex>
          <Text>No club selected</Text>
        </Flex>
      )}
    </Flex>
  );
}

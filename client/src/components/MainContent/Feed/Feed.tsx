import { Box } from "@chakra-ui/react";
import { Session } from "next-auth";

interface FeedProps {
  session: Session;
}
export default function Feed({ session }: FeedProps) {
  return <Box width={{ base: "100%", md: "400px" }}>FEED</Box>;
}

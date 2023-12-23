import { Flex } from "@chakra-ui/react";
import Club from "./Club/Club";
import { Session } from "next-auth";
import Feed from "./Feed/Feed";

interface MainContentProps {
  session: Session;
}

export default function MainContent({ session }: MainContentProps) {

  return (
    <Flex height={"100vh"}>
      <Club session={session} />
      <Feed session={session} />
    </Flex>
  );
}

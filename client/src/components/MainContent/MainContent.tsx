import { Flex } from "@chakra-ui/react";
import ClubListWrapper from "./Club/ClubList/ClubListWrapper";
import { Session } from "next-auth";
import ClubWrapper from "./Club/ClubWrapper";

interface MainContentProps {
  session: Session;
}

export default function MainContent({ session }: MainContentProps) {

  return (
    <Flex height={"100vh"}>
      <ClubListWrapper session={session} />
      <ClubWrapper session={session} />
    </Flex>
  );
}

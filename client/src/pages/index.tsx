import { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import MainContent from "../components/MainContent/MainContent";
import Login from "../components/Login/Login";
import { Box } from "@chakra-ui/react";
import ToggleColorMode from "../components/ToddleColorMode/ToddleColorMode";

export default function Home() {
  const { data: session } = useSession();

  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  return (
    <Box>
      <ToggleColorMode />
      {session?.user?.username ? (
        <MainContent session={session} />
      ) : (
        <Login session={session} reloadSession={reloadSession} />
      )}
    </Box>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);

  return {
    props: {
      session,
    },
  };
}

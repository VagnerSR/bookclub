import { Button, Center, Stack } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function MainContent() {
  const { data } = useSession();

  return (
    <Center height={"100vh"}>
      <Stack align={"center"} spacing={4}>
        <Image
          className="rounded-full"
          src={data?.user?.image!}
          alt="user image"
          width={100}
          height={100}
          priority
        />
        <span>{data?.user?.name}</span>
        <span>{data?.user?.email}</span>

        <Button colorScheme="red" variant="outline" onClick={() => signOut()}>
          Sign out
        </Button>
      </Stack>
    </Center>
  );
}

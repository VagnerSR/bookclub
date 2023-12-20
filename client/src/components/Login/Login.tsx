import { Button, Center, Text, Stack, Input } from "@chakra-ui/react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import googleLogo from "../../../public/googlelogo.png";
import Image from "next/image";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import UserOperations from "../../graphql/operations/user";
import {
  CreateUsernameData,
  CreateUsernameVariables,
} from "../../interfaces/User";

interface LoginProps {
  session: Session | null;
  reloadSession: () => void;
}

export default function Login({ session, reloadSession }: LoginProps) {
  const [username, setUsername] = useState("");

  const [createUsername, { data, loading, error }] = useMutation<
    CreateUsernameData,
    CreateUsernameVariables
  >(UserOperations.Mutations.createUsername);

  const onSubmit = async () => {
    if (!username) return;
    try {
      await createUsername({ variables: { username } });
      console.log(data, loading, error)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Center height="100vh">
      <Stack align="center" spacing={8}>
        {session ? (
          <>
            <Text fontSize="3xl">Create a Username</Text>
            <Input
              placeholder="Enter a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button onClick={onSubmit} colorScheme="messenger" width="100%">
              Save
            </Button>
          </>
        ) : (
          <>
            <Text fontSize="3xl">BookClub Manager</Text>

            <Button
              leftIcon={
                <Image
                  width={20}
                  height={20}
                  alt="Google Logo"
                  src={googleLogo}
                />
              }
              colorScheme="messenger"
              onClick={() => signIn("google")}
            >
              Sign in with Google
            </Button>
          </>
        )}
      </Stack>
    </Center>
  );
}

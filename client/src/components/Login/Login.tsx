import { Button, Center, Text, Stack, Input, useToast } from "@chakra-ui/react";
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
  const toast = useToast();

  const [createUsername, { loading, error }] = useMutation<
    CreateUsernameData,
    CreateUsernameVariables
  >(UserOperations.Mutations.createUsername);

  const onSubmit = async () => {
    if (!username) return;
    try {
      const { data } = await createUsername({ variables: { username } });

      if (!data?.createUsername) {
        throw new Error();
      }

      if (data.createUsername.error) {
        const {
          createUsername: { error },
        } = data;

        toast({
          title: "Something went wrong!",
          description: error,
          status: "error",
          duration: 3000,
          position: "bottom",
        });

        return;
      }

      toast({
        title: "Username successfully created!",
        status: "success",
        duration: 3000,
        position: "bottom",
      });

      reloadSession();

    } catch (error: any) {
      toast({
        title: "Something went wrong!",
        description: error?.message,
        status: "error",
        duration: 3000,
        position: "bottom",
      });
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
            <Button onClick={onSubmit} colorScheme="messenger" width="100%" isLoading={loading}>
              Save
            </Button>
          </>
        ) : (
          <>
            <Text fontSize="3xl">BookClub</Text>

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
              variant="outline"
            >
              Sign in with Google
            </Button>
          </>
        )}
      </Stack>
    </Center>
  );
}

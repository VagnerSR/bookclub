import { useLazyQuery, useMutation } from "@apollo/client";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useToast,
} from "@chakra-ui/react";
import UserOperations from "../../../graphql/operations/user";
import ClubOperations from "../../../graphql/operations/club";
import { useState } from "react";
import {
  SearchUsersData,
  SearchUsersInputs,
  SearchedUser,
} from "../../../interfaces/User";
import UserSearchList from "./UserSearchList";
import Members from "./Members";
import { CreateClubData, CreateClubInputs } from "../../../interfaces/Club";
import { Session } from "next-auth";

interface ClubModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: Session;
}
export default function ClubModal({
  isOpen,
  onClose,
  session,
}: ClubModalProps) {
  const { user: { id: userId } } = session;
  const [username, setUsername] = useState("");
  const [members, setMembers] = useState<Array<SearchedUser>>([]);
  const [searchUsers, { data, loading, error }] = useLazyQuery<
    SearchUsersData,
    SearchUsersInputs
  >(UserOperations.Queries.searchUsers);
  const [createClub, { loading: createClubLoading }] = useMutation<
    CreateClubData,
    CreateClubInputs
  >(ClubOperations.Mutations.createClub);

  const toast = useToast();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    searchUsers({ variables: { username: username } });
  }

  function addMember(user: SearchedUser) {
    setMembers((prev) => [...prev, user]);
    setUsername;
  }

  function removeMember(userId: string) {
    setMembers((prev) => prev.filter((p) => p.id !== userId));
  }

  async function onCreateBookClub() {
    const membersId = [userId, ...members.map((member) => member.id)];

    try {
      const { data } = await createClub({
        variables: {
          membersIds: membersId,
        },
      });
      console.log(data)
    } catch (error: any) {
      toast({
        title: "Something went wrong!",
        description: error?.message,
        status: "error",
        duration: 3000,
        position: "bottom",
      });
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent pb={4}>
          <ModalHeader>Create a BookClub</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={onSubmit}>
              <Stack spacing={4}>
                <Input
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Button
                  type="submit"
                  isDisabled={!username}
                  colorScheme="messenger"
                  isLoading={loading}
                >
                  Search
                </Button>
              </Stack>
            </form>

            {data?.searchUsers && (
              <UserSearchList users={data?.searchUsers} addMember={addMember} />
            )}

            {members.length !== 0 && (
              <>
                <Members members={members} removeMember={removeMember} />
                <Button
                  colorScheme="messenger"
                  width="100%"
                  mt={6}
                  onClick={onCreateBookClub}
                  isLoading={createClubLoading}
                >
                  Create BookClub
                </Button>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

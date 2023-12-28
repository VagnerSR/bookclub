import { Avatar, Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import ClubHeader from "./ClubHeader";
import { ClubData } from "../../../../interfaces/Club";
import ClubOperations from "../../../../graphql/operations/club";
import BookOperations from "../../../../graphql/operations/book";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import {
  Book,
  CreateBookData,
  CreateBookVariables,
} from "../../../../interfaces/Book";
import { useState } from "react";
import BookModal from "../../Modal/BookModal/BookModal";
import { Session } from "next-auth";

type ClubContentProps = {
  userId: string;
  clubId: string;
  session: Session;
};

export default function ClubContent({
  userId,
  clubId,
  session,
}: ClubContentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: clubData, loading: clubLoading } = useQuery<ClubData>(ClubOperations.Queries.clubs);
  const { data: bookData, loading: bookLoading } = useQuery<any>(BookOperations.Queries.getBooks, {
    variables: {
      clubId,
    },
  });

  const router = useRouter();

  const club = clubData?.clubs.find((club) => club.id === clubId);

  if (clubData?.clubs && !clubLoading && !club) {
    router.replace("/");
  }

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  console.log(bookData)

  return (
    <Stack>
      <ClubHeader userId={userId} clubId={clubId} />
      {club && (
        <Stack pl={4}>
          <Text color="whiteAlpha.600">Members: </Text>
          {club.members.map((member) => (
            <Flex key={member.user.id} align="center" gap={4}>
              <Avatar src={member.user.image!} />
              <Text fontWeight={600}>{member.user.username}</Text>
              <Text fontWeight={600}>
                {member.haveRead ? "Read" : "Didn't read"}
              </Text>
            </Flex>
          ))}

          <Box mb={4} borderRadius={4} cursor="pointer">
            <Button
              textAlign="center"
              colorScheme="gray"
              width={"100%"}
              onClick={onOpen}
            >
              Create a Book
            </Button>
          </Box>

          <BookModal isOpen={isOpen} onClose={onClose} session={session} members={club.members} />
        </Stack>
      )}
    </Stack>
  );
}

import { Avatar, Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import ClubHeader from "./ClubHeader";
import { ClubData } from "../../../../interfaces/Club";
import ClubOperations from "../../../../graphql/operations/club";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import BookModal from "../../Modal/BookModal/CreateBookModal";
import { Session } from "next-auth";
import Book from "./Book/Book";

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
  const { data: clubData, loading: clubLoading } = useQuery<ClubData>(
    ClubOperations.Queries.clubs
  );

  const router = useRouter();

  const club = clubData?.clubs.find((club) => club.id === clubId);

  if (clubData?.clubs && !clubLoading && !club) {
    router.replace("/");
  }

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <Stack>
      <ClubHeader userId={userId} clubId={clubId} />
      

          <Box ml={2} mb={4} borderRadius={4} cursor="pointer">
            <Button
              textAlign="center"
              colorScheme="gray"
              onClick={onOpen}
            >
              Create a Book
            </Button>
          </Box>

          <Book session={session} club={club} />

          {club && <BookModal
            isOpen={isOpen}
            onClose={onClose}
            session={session}
            members={club.members}
          />}
        
    </Stack>
  );
}

import { Avatar, Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import ClubHeader from "./ClubHeader";
import { ClubData } from "../../../../interfaces/Club";
import ClubOperations from "../../../../graphql/operations/club";
import BookOperations from "../../../../graphql/operations/book";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import {
  BookData,
  BookInputs,
} from "../../../../interfaces/Book";
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
  const { data: bookData, loading: bookLoading } = useQuery<
    BookData,
    BookInputs
  >(BookOperations.Queries.getBooks, {
    variables: {
      clubId,
    },
  });

  console.log(bookData?.getBooks);
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

          {bookData && <Book clubId={clubId} books={bookData.getBooks} />}

          {club && <BookModal
            isOpen={isOpen}
            onClose={onClose}
            session={session}
            members={club.members}
          />}
        
    </Stack>
  );
}

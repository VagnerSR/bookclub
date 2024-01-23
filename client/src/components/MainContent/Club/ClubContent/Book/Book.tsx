import React, { useState } from "react";
import {
  Book,
  SelectBookData,
  BookOperationsVariables,
} from "../../../../../interfaces/Book";
import { Button, Flex, Heading, Stack, Text, useToast } from "@chakra-ui/react";
import Image from "next/image";
import { Session } from "next-auth";
import { Club } from "../../../../../interfaces/Club";
import { useMutation } from "@apollo/client";
import BookOperations from "../../../../../graphql/operations/book";
import EditBookModal from "../../../Modal/EditBookModal/EditBookModal";

type BookProps = {
  session: Session;
  club?: Club;
};

export default function Book({ session, club }: BookProps) {
  const books = club?.books;
  const toast = useToast();

  const [isOpen, setIsOpen] = useState(false);

  const [selectBook, { loading, error }] = useMutation<
    SelectBookData,
    BookOperationsVariables
  >(BookOperations.Mutations.selectBook);

  if (!club) return <></>;
  if (!books || books!.length === 0) {
    return <Text>No books yet</Text>;
  }

  const selectedBook = books!.filter((book) => book.selectedBook === true)[0];

  const rng = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  async function selectRandomBook(books: Book[]) {
    const randomIndex = rng(0, books.length - 1);

    try {
      const { data } = await selectBook({
        variables: {
          bookId: books[randomIndex].id,
        },
      });

      if (data?.selectBook.error) {
        toast({
          title: "Failed to selecting book",
          status: "error",
          duration: 3000,
          position: "bottom",
        });
      } else {
        toast({
          title: `The book ${books[randomIndex].name} was selected`,
          status: "success",
          duration: 3000,
          position: "bottom",
        });
      }
    } catch (error: any) {
      toast({
        title: error?.message,
        status: "error",
        duration: 3000,
        position: "bottom",
      });
    }
  }

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <Stack gap={2} w="100%" ml={4}>
      <Stack>
        {session.user.id === club.adminId && !selectedBook && (
          <Button w="300px" onClick={() => selectRandomBook(books)}>
            Draw random book
          </Button>
        )}

        {selectedBook && (
          <>
            <Text>Selected book</Text>
            <Image
              priority
              src={selectedBook.bookImage}
              alt={`${selectedBook.name} cover`}
              width={80}
              height={20}
            />
          </>
        )}
      </Stack>
      <Heading size="md" mb={2} color="teal.500">
        Books:
      </Heading>
      <Flex gap={4} wrap={"wrap"}>
        {books &&
          books.map((book) => (
            <Flex
              key={book.id}
              align="center"
              gap={2}
              onClick={onOpen}
              cursor="pointer"
            >
              <Image
                priority
                src={book.bookImage}
                alt={`${book.name} cover`}
                width={80}
                height={20}
              />
              <Stack align="start">
                <Text fontSize="lg" fontWeight="bold">
                  {book.name}
                </Text>
                <Text>
                  <strong>Author:</strong> {book.author}
                </Text>
                <Text>
                  <strong>Chosen by:</strong> {book.whoChose}
                </Text>
                <Text>
                  <strong>Read by:</strong> {}
                </Text>
              </Stack>

              <EditBookModal isOpen={isOpen} onClose={onClose} book={book} />
            </Flex>
          ))}
      </Flex>

      
    </Stack>
  );
}

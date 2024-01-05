import React, { useState } from "react";
import { Book } from "../../../../../interfaces/Book";
import { Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import { Session } from "next-auth";
import { Club } from "../../../../../interfaces/Club";

type BookProps = {
  books: Book[];
  session: Session;
  club: Club;
};

export default function Book({ books, session, club }: BookProps) {
  const [randomBook, setRandomBook] = useState<Book>();

  if (books.length === 0) {
    return <Text>No books yet</Text>;
  }

  const rng = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  function selectRandomBook(books: Book[]) {
    const randomIndex = rng(0, books.length - 1);
    setRandomBook(books[randomIndex]);
  }

  return (
    <Stack gap={2} ml={2}>
      <Heading size="md" mb={2} color="teal.500">
        Books:
      </Heading>
      <Flex gap={4} wrap={"wrap"}>
        {books &&
          books.map((book) => (
            <Flex key={book.id} align="center" gap={2}>
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
            </Flex>
          ))}
      </Flex>
      <Stack>
        {session.user.id === club.adminId && (
          <Button w="300px" onClick={() => selectRandomBook(books)}>
            Draw random book
          </Button>
        )}

        <Text>Selected book</Text>
        {randomBook && (
          <Image
            priority
            src={randomBook.bookImage}
            alt={`${randomBook.name} cover`}
            width={80}
            height={20}
          />
        )}
      </Stack>
    </Stack>
  );
}

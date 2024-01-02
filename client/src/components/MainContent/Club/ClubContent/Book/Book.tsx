import React from "react";
import { Book } from "../../../../../interfaces/Book";
import {
  Box,
  Flex,
  Heading,
  List,
  ListItem,
  Stack,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";

type BookProps = {
  books: Book[];
  clubId: string;
};

export default function Book({ books, clubId }: BookProps) {
  const clubBooks = books.filter((book) => book.clubId === clubId);

  return (
    <Flex gap={2}>
      <Heading size="md" mb={2} color="teal.500">
        Books:
      </Heading>
      <Flex gap={4}>
        {clubBooks &&
          clubBooks.map((book) => (
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
    </Flex>
  );
}

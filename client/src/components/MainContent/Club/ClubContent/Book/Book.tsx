import React from 'react'
import { Book } from '../../../../../interfaces/Book'
import { Box, Heading, List, ListItem, Stack, Text, VStack } from '@chakra-ui/react'

type BookProps = {
  books: Book[]
}

export default function Book({ books }: BookProps) {
  return (
    <Box mb={6}>
        <Heading size="md" mb={2} color="teal.500">
          Books:
        </Heading>
        <List>
          {books.map((book) => (
            <ListItem key={book.name} mb={4}>
              <VStack align="start">
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
              </VStack>
            </ListItem>
          ))}
        </List>
      </Box>
  )
}
import React from 'react'
import { Book } from '../../../../../interfaces/Book'
import { Stack, Text } from '@chakra-ui/react'

type BookProps = {
  books: Book[]
}

export default function Book({ books }: BookProps) {
  return (
    <Stack>
      {books.map((book) => (
        <Stack key={book.id}>
        <Text>
{book.name}
        </Text>
        <Text>
{book.author}
        </Text>
        <Text>
{book.whoChose}
        </Text>

        <Text>
{book.whoRead}
        </Text>
        </Stack>
      ))}
    </Stack>
  )
}
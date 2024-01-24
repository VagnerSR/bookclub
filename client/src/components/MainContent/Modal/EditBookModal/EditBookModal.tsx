import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  Text,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import {
  Book,
  MarkAsReadData,
  MarkAsReadVariables,
} from "../../../../interfaces/Book";
import Image from "next/image";
import BookOperations from "../../../../graphql/operations/book";
import { useMutation } from "@apollo/client";

type EditBookModalProps = {
  isOpen: boolean;
  onClose: () => void;
  book: Book;
};

export default function EditBookModal({
  isOpen,
  onClose,
  book,
}: EditBookModalProps) {
  const [markAsRead, { loading }] = useMutation<
    MarkAsReadData,
    MarkAsReadVariables
  >(BookOperations.Mutations.markAsRead);

  const toast = useToast();

  const onMarkAsRead = async () => {
    try {
      const { data } = await markAsRead({
        variables: {
          bookId: book.id,
        },
      });

      if (data?.markAsRead.success) {
        toast({
          title: "Book marked as read",
          status: "success",
          duration: 3000,
          position: "bottom",
        });
      } else {
        toast({
          title: "Something went wrong!",
          status: "error",
          duration: 3000,
          position: "bottom",
        });
      }
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
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent pb={4}>
          <ModalHeader>Edit Book</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Image
                priority
                src={book.bookImage}
                alt={`${book.name} cover`}
                width={80}
                height={20}
              />
              <Checkbox onClick={onMarkAsRead}>Mark as read</Checkbox>
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

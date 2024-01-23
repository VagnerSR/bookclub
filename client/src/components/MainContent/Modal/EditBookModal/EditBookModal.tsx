import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Book } from "../../../../interfaces/Book";
import Image from "next/image";

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

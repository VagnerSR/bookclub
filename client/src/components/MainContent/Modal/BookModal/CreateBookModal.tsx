import { useLazyQuery, useMutation } from "@apollo/client";
import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  Avatar,
  Text,
  ModalHeader,
  ModalOverlay,
  Stack,
  useToast,
} from "@chakra-ui/react";
import BookOperations from "../../../../graphql/operations/book";
import { useState } from "react";
import { ClubMember } from "../../../../interfaces/Club";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import {
  CreateBookData,
  CreateBookVariables,
} from "../../../../interfaces/Book";

interface CreateBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: Session;
  members: Array<ClubMember>;
}
export default function CreateBookModal({
  isOpen,
  onClose,
  session,
  members,
}: CreateBookModalProps) {
  const [username, setUsername] = useState("");
  const [book, setBook] = useState("");
  
  const [author, setAuthor] = useState("");
  const [bookImage, setBookImage] = useState("");
  const [userBook, setUserBook] = useState<ClubMember>();
  const [createBook, { loading: createBookLoading }] = useMutation<
    CreateBookData,
    CreateBookVariables
  >(BookOperations.Mutations.createBook);

  const router = useRouter();

  const toast = useToast();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const foundMember = members.find((member) =>
      member.user.username!.toLowerCase().includes(username.toLowerCase())
    );
    setUserBook(foundMember);
  }

  async function onCreateBook() {
    const { clubId } = router.query;
    if (!book && !author && !userBook) return

    try {
      const { data } = await createBook({
        variables: {
          bookName: book,
          author: author,
          bookImage: bookImage,
          whoChose: userBook?.user.username!,
          clubId: clubId as string,
        },
      });

      console.log(data);

      if (data?.createBook.error) {
        toast({
          title: "Failed to create book",
          status: "error",
          duration: 3000,
          position: "bottom",
        });
      } else {
        toast({
          title: "Book created successfully",
          status: "success",
          duration: 3000,
          position: "bottom",
        });
      }

      setUsername("");
      setBook("");
      setAuthor("");
      onClose();
    } catch (error: any) {
      toast({
        title: "Something went wrong!",
        description: error?.message,
        status: "error",
        duration: 3000,
        position: "bottom",
      });
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent pb={4}>
          <ModalHeader>Create a Book</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={onSubmit}>
              <Stack spacing={4}>
                <Input
                  placeholder="What's the book name"
                  value={book}
                  onChange={(e) => setBook(e.target.value)}
                />
                <Input
                  placeholder="What's the author's name"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
                <Input
                  placeholder="Copy the image url (optional)"
                  value={bookImage}
                  onChange={(e) => setBookImage(e.target.value)}
                />
                <Input
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Button
                  type="submit"
                  isDisabled={!username}
                  colorScheme="messenger"
                >
                  Search
                </Button>
              </Stack>
            </form>

            {userBook && (
              <>
                <Flex gap={2} mt={4} align="center" width="100%">
                  <Avatar src={userBook.user.image!} />

                  <Text fontSize={20}>{userBook.user.username}</Text>
                </Flex>
              </>
            )}

            {userBook && (
              <>
                <Button
                  colorScheme="messenger"
                  width="100%"
                  mt={6}
                  onClick={onCreateBook}
                  isLoading={createBookLoading}
                >
                  Create Book
                </Button>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

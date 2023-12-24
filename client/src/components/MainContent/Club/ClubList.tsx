import { Box, Button, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import ClubModal from "../Modal/ClubModal"
import { useState } from "react";

interface ClubListProps {
  session: Session;
}

export default function ClubList({ session }: ClubListProps) {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)
  return (
    <Box width="100%">
      <Box
        mb={4}
        borderRadius={4}
        cursor="pointer"
      >
        <Button textAlign="center" colorScheme="gray" width={"100%"} onClick={onOpen}>
          Create a BookClub
        </Button>
      </Box>
      <ClubModal isOpen={isOpen} onClose={onClose} session={session} />
    </Box>
  );
}

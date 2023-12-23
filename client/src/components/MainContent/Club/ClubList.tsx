import { Box, Text } from "@chakra-ui/react";
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
        py={2}
        px={4}
        mb={4}
        bg="blackAlpha.300"
        borderRadius={4}
        cursor="pointer"
        onClick={onOpen}
      >
        <Text textAlign="center" color="whiteAlpha.800" fontWeight={500}>
          Create a BookClub
        </Text>
      </Box>
      <ClubModal isOpen={isOpen} onClose={onClose} session={session} />
    </Box>
  );
}

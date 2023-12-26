import { Box, Button } from "@chakra-ui/react";
import { Session } from "next-auth";
import ClubModal from "../../Modal/ClubModal";
import { useState } from "react";
import { Club } from "../../../../interfaces/Club";
import ClubItem from "./ClubItem";
import { useRouter } from "next/router";

interface ClubListProps {
  session: Session;
  clubs: Club[];
  onViewClub: (clubId: string) => void;
}

export default function ClubList({
  session,
  clubs,
  onViewClub,
}: ClubListProps) {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const { clubId } = router.query;

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  return (
    <Box width="100%">
      <Box mb={4} borderRadius={4} cursor="pointer">
        <Button
          textAlign="center"
          colorScheme="gray"
          width={"100%"}
          onClick={onOpen}
        >
          Create a BookClub
        </Button>
      </Box>
      <ClubModal isOpen={isOpen} onClose={onClose} session={session} />

      {clubs.map((club) => (
        <ClubItem
          key={club.id}
          club={club}
          onClick={() => onViewClub(club.id)}
          isSelected={club.id === clubId}
        />
      ))}
    </Box>
  );
}

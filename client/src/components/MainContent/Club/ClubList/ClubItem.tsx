import { Button, Text } from "@chakra-ui/react";
import { Club } from "../../../../interfaces/Club";
import { ChatIcon } from "@chakra-ui/icons";

type ClubItemProps = {
  club: Club;
  onClick: () => void;
  isSelected: boolean;
};

export default function ClubItem({ club, onClick, isSelected }: ClubItemProps) {
  return (
    <Button
      my={1}
      leftIcon={<ChatIcon />}
      onClick={onClick}
      w={"100%"}
      colorScheme="teal"
      variant={isSelected ? "solid" : "outline"}
    >
      <Text> {club.clubName}</Text>
    </Button>
  );
}

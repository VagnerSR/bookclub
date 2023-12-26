import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import { Club } from "../../../../interfaces/Club";

type ClubItemProps = {
  club: Club;
  onClick: () => void;
  isSelected: boolean;
};

export default function ClubItem({ club, onClick, isSelected }: ClubItemProps) {
  return (
    <Button onClick={onClick}>
      {club.members.map((member) => (
        <Text key={member.user.id}>{member.user.username}</Text>
      ))}
    </Button>
  );
}

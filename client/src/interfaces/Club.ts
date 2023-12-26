import { User } from "@prisma/client";
import { Book } from "./Book"
export interface CreateClubData {
  createClub: {
    clubId: string;
  };
}

export interface CreateClubInputs {
  membersIds: Array<string>;
}

export interface Club {
  id: string;
  createdAt: string;
  updatedAt: string;
  members: ClubMember[];
  books: Book[];
  adminId: string;
}

interface ClubMember {
  id: string;
  user: User;
  haveRead: boolean;
}

export interface ClubData {
  clubs: Array<Club>
}

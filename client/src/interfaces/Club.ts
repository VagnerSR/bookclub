import { User } from "@prisma/client";
import { Book } from "./Book";
export interface CreateClubData {
  createClub: {
    clubId: string;
  };
}

export interface CreateClubInputs {
  membersIds: Array<string>;
  clubName: string;
}

export interface Club {
  id: string;
  clubName: string;
  createdAt: string;
  updatedAt: string;
  members: ClubMember[];
  books: Book[];
  adminId: string;
}

export interface ClubMember {
  id: string;
  user: User;
  haveRead: boolean;
}

export interface ClubData {
  clubs: Array<Club>;
}

export interface SearchClubInputs {
  clubId: string;
}

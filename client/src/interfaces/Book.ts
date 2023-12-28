import { User } from "@prisma/client";
import { Club } from "./Club";

export interface Book {
  id: string;
  name?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: User;
  clubId: string;
  club: Club;
}

export interface CreateBookData {
  createBook: {
    success: boolean;
    error: string;
  };
}

export interface CreateBookVariables {
  bookName: string;
  author: string;
  whoChose: string;
  clubId: string;
}

import { ISODateString } from "next-auth";

export interface Session {
  user: User;
  expires: ISODateString;
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  emailVerified: boolean;
  image: string;
}

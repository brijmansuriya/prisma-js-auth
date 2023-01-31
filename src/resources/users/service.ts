import dbClient from "../../utils/database";
import { hash } from "bcrypt";
import { Role } from "@prisma/client";

export type NewUser = {
  username: string;
  password: string;
  bio?: string;
  role: Role | undefined;
};

const createWithHash = async (newUser: NewUser) => {
  // grab user plaintext password
  const plaintext = newUser.password;

  // Hash it using bcrypt. It will return a PROMISE!!!!
  const hashedPassword = await hash(plaintext, 10);

  // Make sure to save the hashed password!
  const savedUser = await dbClient.user.create({
    data: { ...newUser, password: hashedPassword },
  });

  return savedUser;
};

const userClient = {
  ...dbClient.user,
  createWithHash,
};

export default userClient;

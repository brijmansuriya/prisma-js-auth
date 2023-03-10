import { User } from "@prisma/client";
import { Request, Response } from "express";
import dbClient from "../../utils/database";

export async function getAllPosts(req: Request, res: Response) {
  const currentUser = req.currentUser as User;

  const posts = await dbClient.post.findMany({
    where: { user: { id: currentUser.id } },
    include: { user: { select: { username: true } } },
  });

  res.json({ data: posts });
}

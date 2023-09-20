import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { siweServer } from "@/utils/siweServer";

export type Me = {
  user: {
    username: string;
    wallet_address: string;
    profile_picture: string;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await siweServer.getSession(req, res);

  if (!session.address) {
    return res.status(201).json({ message: "No session found" });
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: { wallet_address: session?.address?.toLowerCase() },
    select: {
      username: true,
      wallet_address: true,
      profile_picture: true,
    },
  });
  res.status(200).json({ user });
}

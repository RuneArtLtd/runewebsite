import { prisma } from "@/lib/prisma";
import { siweServer } from "@/utils/siweServer";
import { UserRole } from "database";
import type { NextApiRequest, NextApiResponse } from "next";
import { generateUsername } from "unique-username-generator";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await siweServer.getSession(req, res);

  if (!session.address) {
    return res.status(201).json({ message: "No session found" });
  }

  try {
    await prisma.user.upsert({
      where: { wallet_address: session?.address?.toLowerCase() },
      update: {},
      create: {
        wallet_address: session?.address?.toLowerCase(),
        username: generateUsername(undefined, 2, 15).toLowerCase(),
        role: UserRole.MEMBER,
      },
    });

    res.status(200).json({ message: "Successful login." });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Login error. See terminal console." });
  }
}

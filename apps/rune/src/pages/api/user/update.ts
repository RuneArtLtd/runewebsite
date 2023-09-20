import { prisma } from "@/lib/prisma";
import { siweServer } from "@/utils/siweServer";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await siweServer.getSession(req, res);

  if (!session.address) {
    return res.status(401).json({ message: "No session found" });
  }

  const validated = UpdateUserValidator.parse(req.body);

  const { profile_picture, username, email } = validated;

  const dataToUpdate = {
    profile_picture: profile_picture,
    username: username,
    email: email,
  };

  const keys = Object.keys(dataToUpdate);
  keys.forEach(
    (key) =>
      //delete keys that are undefined to only update relevant data
      !dataToUpdate[key as keyof typeof dataToUpdate] &&
      delete dataToUpdate[key as keyof typeof dataToUpdate]
  );

  if (Object.keys(dataToUpdate).length === 0) {
    return res.status(200).json({ message: "Nothing updated." });
  }

  try {
    await prisma.user.update({
      where: { wallet_address: session?.address?.toLowerCase() },
      data: dataToUpdate,
    });
    res.status(200).json({ message: "Successfully updated user." });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Update user error. See terminal console." });
  }
}

const UpdateUserValidator = z.object({
  profile_picture: z.string().optional(),
  username: z.string().optional(),
  email: z.string().email({ message: "Invalid Email" }).optional(),
});

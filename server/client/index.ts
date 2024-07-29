"use server";

import prisma from "@/lib/prisma";
import { verifySession } from "../session";
import { decodeBase64 } from "@/lib/image";

const getClient = async () => {
  try {
    const { userId } = await verifySession();
    const client = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });

    if (!client) return { error: "client not found" };

    const clientProfile = {
      id: client.id,
      name: client.name,
      email: client.email,
      profilePicture: client.profile?.profile
        ? decodeBase64(client.profile.profile)
        : undefined,
    };

    return { data: clientProfile };
  } catch (error) {
    console.error(error);
    return { error: `${error}` };
  }
};

export { getClient };

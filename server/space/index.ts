"use server";

import prisma from "@/lib/prisma";
import { verifySession } from "../session";
import { decodeBase64 } from "@/lib/image";
import { redirect } from "next/navigation";

const createSpace = async ({
  name,
  privacy,
  purpose,
  users,
}: {
  name: string;
  privacy: string;
  purpose: string;
  users: string[];
}) => {
  try {
    const { userId } = await verifySession();
    const newSpace = await prisma.spaceRoom.create({
      data: {
        name,
        privacy,
        purpose,
        ownerId: userId,
        users: {
          connect: users.map((email) => ({ email })),
        },
      },
    });
    return { data: newSpace };
  } catch (error) {
    console.error(error);
    return { error: `${error}` };
  }
};

const getAllSpace = async () => {
  try {
    const spaces = await prisma.spaceRoom.findMany({
      include: {
        owner: { select: { name: true } },
        _count: { select: { users: true } },
        users: {
          select: {
            id: true,
            name: true,
            profile: { select: { profile: true } },
          },
        },
        spaceMessages: true,
      },
    });

    const redefinedSpace = spaces.map((space) => ({
      id: space.id,
      name: space.name,
      ownerId: space.ownerId,
      privacy: space.privacy,
      purpose: space.purpose,
      projectId: space.projectId,
      ownerName: space.owner.name,
      users: space.users.map((user) => ({
        id: user.id,
        name: user.name,
        profilePicture: user.profile?.profile
          ? decodeBase64(user.profile.profile)
          : undefined,
      })),
      membersCount: space._count.users,
      spaceProfile: space.profile ? decodeBase64(space.profile) : undefined,
      messages: space.spaceMessages.map((message) => ({
        ...message,
        timestamp: message.date.getDate(),
      })),
    }));

    return { data: redefinedSpace };
  } catch (error) {
    console.error(error);
    return { error: `${error}` };
  }
};

const joinSpace = async ({ spaceId }: { spaceId: string }) => {
  try {
    const { userId } = await verifySession();

    const space = await prisma.spaceRoom.update({
      where: { id: spaceId },
      data: {
        users: { connect: { id: userId } },
      },
    });
    return { data: space };
  } catch (error) {
    console.error(error);
    return { error: `${error}` };
  }
};

const getMySpace = async () => {
  try {
    const { userId } = await verifySession();
    const spaces = await prisma.spaceRoom.findMany({
      where: {
        OR: [{ ownerId: userId }, { users: { some: { id: userId } } }],
      },
      include: {
        owner: { select: { name: true } },
        users: {
          select: {
            name: true,
            id: true,
            profile: { select: { profile: true } },
          },
        },
        _count: { select: { users: true } },
        spaceMessages: true,
      },
    });

    const redefinedSpace = spaces.map((space) => ({
      id: space.id,
      name: space.name,
      ownerId: space.ownerId,
      privacy: space.privacy,
      purpose: space.purpose,
      projectId: space.projectId,
      ownerName: space.owner.name,
      users: space.users.map((user) => ({
        id: user.id,
        name: user.name,
        profilePicture: user.profile?.profile
          ? decodeBase64(user.profile.profile)
          : undefined,
      })),
      membersCount: space._count.users,
      spaceProfile: space.profile ? decodeBase64(space.profile) : undefined,
      messages: space.spaceMessages.map((message) => ({
        ...message,
        timestamp: message.date.getDate(),
      })),
    }));

    return { data: redefinedSpace };
  } catch (error) {
    console.error(error);
    return { error: `${error}` };
  }
};

export { createSpace, getAllSpace, joinSpace, getMySpace };

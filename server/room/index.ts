"use server";

import prisma from "@/lib/prisma";
import { verifySession } from "../session";
import { decodeBase64 } from "@/lib/image";

const includeOptions = {
  users: {
    select: {
      id: true,
      name: true,
      email: true,
      profile: { select: { profile: true } },
    },
  },
  messages: true,
};

const createPrivateRoom = async ({ email }: { email: string }) => {
  try {
    const { userId } = await verifySession();

    // Search if room exist
    const isExist = await prisma.privateRoom.findFirst({
      where: {
        AND: [
          { users: { some: { id: userId } } },
          { users: { some: { email } } },
        ],
      },
      include: includeOptions,
    });

    if (isExist) {
      const privateRooms = {
        id: isExist.id,
        participants: isExist.users.map((user) => ({
          ...user,
          profilePicture: user.profile?.profile
            ? decodeBase64(user.profile.profile)
            : undefined,
        })),
        other: isExist.users.find((user) => user.id !== userId)!.id,
        messages: isExist.messages.map((message) => ({
          ...message,
          timestamp: message.date.getDate(),
        })),
      };

      return { data: privateRooms };
    }

    const newRoom = await prisma.privateRoom.create({
      data: {
        users: {
          connect: [{ id: userId }, { email }],
        },
      },
      include: includeOptions,
    });

    const privateRooms = {
      id: newRoom.id,
      participants: newRoom.users.map((user) => ({
        ...user,
        profilePicture: user.profile?.profile
          ? decodeBase64(user.profile.profile)
          : undefined,
      })),
      other: newRoom.users.find((user) => user.id !== userId)!.id,
      messages: newRoom.messages.map((message) => ({
        ...message,
        timestamp: message.date.getDate(),
      })),
    };

    return { data: privateRooms };
  } catch (error) {
    console.error(error);
    return { error: `${error}` };
  }
};

const getRooms = async () => {
  try {
    const { userId } = await verifySession();

    const rooms = await prisma.privateRoom.findMany({
      where: { users: { some: { id: userId } } },
      include: includeOptions,
    });

    const privateRooms = rooms.map((room) => ({
      id: room.id,
      participants: room.users.map((user) => ({
        ...user,
        profilePicture: user.profile?.profile
          ? decodeBase64(user.profile.profile)
          : undefined,
      })),
      other: room.users.find((user) => user.id !== userId)!.id,
      messages: room.messages.map((message) => ({
        ...message,
        timestamp: message.date.getDate(),
      })),
    }));

    return { data: privateRooms };
  } catch (error) {
    console.error(error);
    return { error: `${error}` };
  }
};

export { createPrivateRoom, getRooms };

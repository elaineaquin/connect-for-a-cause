"use server";

import prisma from "@/lib/prisma";
import { verifySession } from "../session";

const sendPrivateMessage = async ({
  connectionId,
  text,
  recipientId,
  roomId,
  name,
}: {
  connectionId: string;
  text: string;
  recipientId: number;
  name: string;
  roomId: string;
}) => {
  try {
    const { userId } = await verifySession();

    const newMessage = await prisma.privateMessage.create({
      data: {
        clientId: userId.toString(),
        read: false,
        senderId: userId,
        connectionId,
        text,
        recipientId,
        roomId,
        name,
      },
    });
    return {
      data: { ...newMessage, timestamp: newMessage.date.getDate() },
    };
  } catch (error) {
    console.error(error);
    return { error: `${error}` };
  }
};

const sendGroupMessage = async ({
  connectionId,
  text,
  spaceId,
  name,
}: {
  connectionId: string;
  text: string;
  name: string;
  spaceId: string;
}) => {
  try {
    const { userId } = await verifySession();

    const newMessage = await prisma.spaceMessage.create({
      data: {
        clientId: userId.toString(),
        read: false,
        senderId: userId,
        text,
        name,
        roomId: spaceId,
        connectionId,
      },
    });
    return {
      data: { ...newMessage, timestamp: newMessage.date.getDate() },
    };
  } catch (error) {
    console.error(error);
    return { error: `${error}` };
  }
};

export { sendPrivateMessage, sendGroupMessage };

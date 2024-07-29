"use server";

import prisma from "@/lib/prisma";
import { verifySession } from "../session";
import { decodeBase64 } from "@/lib/image";
import { UserProfile } from "../definitions";

const searchUser = async ({ value }: { value: string }) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        name: {
          contains: value,
          mode: "insensitive",
        },
      },
      include: { profile: true },
    });
    const userProfiles = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      profilePicture: user.profile?.profile
        ? decodeBase64(user.profile.profile)
        : undefined,
    }));

    return { data: userProfiles };
  } catch (error) {
    console.error(error);
    return { error: `${error}` };
  }
};

const getUsers = async () => {
  try {
    await verifySession();

    const users = await prisma.user.findMany({
      include: { profile: true },
    });

    const userProfiles = users.map((user) => ({
      id: user.id,
      email: user.email,
      name: user.name,
      profilePicture: user.profile?.profile
        ? decodeBase64(user.profile.profile)
        : undefined,
    }));

    return { data: userProfiles };
  } catch (error) {
    console.error(error);
    return { error: `${error}` };
  }
};
const getUserProjectStat = async () => {
  try {
    const { userId } = await verifySession();
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const currentMonthProjects = await prisma.project.count({
      where: {
        userId: userId,
        createdAt: {
          gte: new Date(currentYear, currentMonth - 1, 1), // First day of current month
          lt: new Date(currentYear, currentMonth, 1), // First day of next month
        },
      },
    });

    const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const previousYear = currentMonth === 1 ? currentYear - 1 : currentYear;

    const previousMonthProjects = await prisma.project.count({
      where: {
        userId: userId,
        createdAt: {
          gte: new Date(previousYear, previousMonth - 1, 1), // First day of previous month
          lt: new Date(currentYear, currentMonth - 1, 1), // First day of current month
        },
      },
    });

    let percentageChange = 0;
    if (previousMonthProjects === 0) {
      percentageChange = currentMonthProjects > 0 ? 100 : 0;
    } else {
      percentageChange =
        ((currentMonthProjects - previousMonthProjects) /
          previousMonthProjects) *
        100;
    }

    return {
      currentMonthProjects,
      previousMonthProjects,
      percentageChange: percentageChange.toFixed(2),
    };
  } catch (error) {
    console.error(error);
    return { error: error };
  }
};

export { getUsers, searchUser, getUserProjectStat };

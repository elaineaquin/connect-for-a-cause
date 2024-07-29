"use server";

import { decodeBase64 } from "@/lib/image";
import { verifySession } from "@/server/session";
import { Profile } from "@prisma/client";
import prisma from "@/lib/prisma";
import { ProfileIntro } from "../definitions";

// Will return the profile picture
const updateProfilePicture = async ({
  userId,
  buffer,
}: {
  userId: number;
  buffer: Buffer;
}) => {
  try {
    const user = await prisma.profile.update({
      where: { userId },
      data: { profile: Buffer.from(buffer) },
    });

    return { success: true, data: decodeBase64(user.profile!) };
  } catch (err) {
    console.error(err);
    return { error: `${err}` };
  }
};

type UpdateProfile = { userId: number; data: ProfileIntro };
const updateProfile = async ({ userId, data }: UpdateProfile) => {
  try {
    const user = await prisma.profile.update({
      where: { userId },
      data: {
        primaryEducation: data.primaryEducation,
        lowerSecondaryEducation: data.lowerSecondaryEducation,
        upperSecondaryEducation: data.upperSecondaryEducation,
        higherEducation: data.higherEducation,
        currentCity: data.currentCity,
        hometown: data.hometown,
        instagram: data.instagram,
        linkedIn: data.linkedIn,
        facebook: data.facebook,
      },
    });

    const { profile, ...rest } = user;

    return { success: true, data: { ...rest } };
  } catch (error) {
    console.error(error);
    return { error: `${error}` };
  }
};

const getProfile = async (): Promise<
  (Profile & { profilePicture?: string }) | null
> => {
  const verify = await verifySession();
  if (!verify.isAuth) return null;

  const profile = await prisma.profile.findUnique({
    where: { userId: verify.userId },
  });

  if (!profile) {
    return await prisma.profile.create({
      data: { userId: verify.userId },
    });
  }

  const { profile: p, ...rest } = profile;

  return {
    ...rest,
    profile: null,
    profilePicture: p ? decodeBase64(p) : undefined,
  };
};

export { updateProfilePicture, getProfile, updateProfile };

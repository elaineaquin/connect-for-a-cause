"use server";

import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";
import { createSession, deleteSession } from "../session";
import { z } from "zod";
import { LoginValidationSchema, RegisterValidationSchema } from "./validations";

const login = async ({
  email,
  password,
}: z.infer<typeof LoginValidationSchema>) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return { success: false, data: "user not found" };
    if (!(await bcrypt.compare(password, user.password)))
      return { success: false, data: "incorrect email or password" };

    const { password: remove, ...rest } = user;
    await createSession(user.id);
    return { success: true, data: rest };
  } catch (error) {
    console.log(error);
    return { success: false, data: `${error}` };
  }
};

const signup = async ({
  email,
  password,
  name,
  role,
}: z.infer<typeof RegisterValidationSchema>) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt);
    const user = await prisma.user.create({
      data: { email, password: hashed_password, name, role },
    });
    await createSession(user.id);
    return { success: true, data: user };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { success: false, data: "Email already in use." };
      }
    }
    return { success: false, data: `${error}` };
  }
};

const logout = async () => {
  try {
    await deleteSession();
    return { success: true, data: "logout succesfull" };
  } catch (error) {
    console.log(error);
    return { success: false, data: error };
  }
};

export { login, signup, logout };

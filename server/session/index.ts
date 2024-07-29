"use server";

import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";
import { SessionPayload } from "../definitions";
import { redirect } from "next/navigation";

const key = new TextEncoder().encode(process.env.JWT_SECRET);
export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 week")
    .sign(key);
}

export async function decrypt(session: string | undefined = "") {
  try {
    if (!session) return null;
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log(`session: ${session}`);
    console.error(error);
    return null;
  }
}

export async function createSession(userId: number) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const session = await encrypt({ userId, expiresAt });
  cookies().set("session", session, {
    httpOnly: true,
    expires: expiresAt,
    secure: true,
    sameSite: "none",
  });
}

export async function verifySession() {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect("/auth/login");
  }

  return { isAuth: true, userId: Number(session.userId) };
}

export async function updateSession() {
  const session = cookies().get("sessoin")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) return null;

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  cookies().set("session", session, {
    httpOnly: true,
    expires: expires,
    secure: true,
    sameSite: "none",
  });
}

export async function deleteSession() {
  cookies().delete("session");
}

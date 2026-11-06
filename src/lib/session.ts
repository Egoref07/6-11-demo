import "server-only";
import { cookies } from "next/headers";
import { cache } from "react";
import { readToken, createToken, type Session } from "./tokens";

export async function saveSession(identity: Session) {
  const signedToken = await createToken(identity);
  const cookieStore = await cookies();
  cookieStore.set("session", signedToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 3600,
  });
}

export const getSession = cache(async (): Promise<Session | null> => {
  const cookieStore = await cookies();
  const signedToken = cookieStore.get("session")?.value ?? null;
  return readToken(signedToken);
});

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

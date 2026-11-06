import "server-only";
import { SignJWT, jwtVerify } from "jose";
import type { Role } from "@/generated/database/enums";

export interface Session {
  userId: string;
  role: Role;
}

function getKey(): Uint8Array {
  const configuredSecret = process.env.SESSION_SECRET;
  if (!configuredSecret || configuredSecret.length < 32) {
    throw new Error("нет SESSION_SECRET");
  }
  return new TextEncoder().encode(configuredSecret);
}

function isRole(candidate: unknown): candidate is Role {
  return candidate === "admin" || candidate === "user";
}

export function createToken(identity: Session) {
  return new SignJWT({ ...identity })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(getKey());
}

export async function readToken(
  token: string | null,
): Promise<Session | null> {
  if (!token) return null;

  const signingKey = getKey();
  try {
    const { payload: claims } = await jwtVerify(token, signingKey, {
      algorithms: ["HS256"],
    });
    if (
      typeof claims.userId !== "string" ||
      !claims.userId.trim() ||
      !isRole(claims.role)
    ) {
      return null;
    }
    return { userId: claims.userId, role: claims.role };
  } catch {
    return null;
  }
}

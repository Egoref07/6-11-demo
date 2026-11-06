import "server-only";
import bcrypt from "bcrypt";

const PASSWORD_HASH_COST = 10;

export function hashPassword(plainText: string) {
  return bcrypt.hash(plainText, PASSWORD_HASH_COST);
}

export function checkPassword(
  plainText: string,
  storedDigest: string,
) {
  return bcrypt.compare(plainText, storedDigest);
}

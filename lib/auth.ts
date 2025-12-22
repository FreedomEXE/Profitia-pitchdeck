import { z } from "zod";
import { safeEqual } from "@/lib/crypto";

const usersSchema = z.array(
  z.object({
    user: z.string().min(1),
    pass: z.string().min(1)
  })
);

export type AuthResult =
  | { ok: true; user: string }
  | { ok: false; reason: "invalid" | "config" };

function getUsersFromEnv() {
  const raw = process.env.DECK_USERS_JSON;
  if (!raw) {
    return null;
  }

  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(raw);
  } catch {
    return null;
  }

  const parsed = usersSchema.safeParse(parsedJson);
  if (!parsed.success) {
    return null;
  }

  return parsed.data;
}

export function validateCredentials(username: string, password: string): AuthResult {
  const singlePassword = process.env.DECK_PASSWORD;
  if (singlePassword) {
    return safeEqual(password, singlePassword)
      ? { ok: true, user: username || "viewer" }
      : { ok: false, reason: "invalid" };
  }

  const users = getUsersFromEnv();
  if (!users) {
    return { ok: false, reason: "config" };
  }

  const match = users.find((entry) => entry.user === username);
  if (!match) {
    return { ok: false, reason: "invalid" };
  }

  return safeEqual(password, match.pass)
    ? { ok: true, user: match.user }
    : { ok: false, reason: "invalid" };
}

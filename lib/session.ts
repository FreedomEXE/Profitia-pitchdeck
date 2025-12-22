import { cookies } from "next/headers";
import { getIronSession, type SessionOptions } from "iron-session";

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret || sessionSecret.length < 32) {
  throw new Error("SESSION_SECRET must be set to at least 32 characters.");
}

export const sessionOptions: SessionOptions = {
  // Using iron-session for straightforward, signed cookie sessions with App Router + middleware support.
  cookieName: "deck_session",
  password: sessionSecret,
  ttl: 60 * 60 * 24 * 7,
  cookieOptions: {
    httpOnly: true,
    // SameSite=Lax + server actions provide baseline CSRF protection for this private app.
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production"
  }
};

export function getSession() {
  return getIronSession(cookies(), sessionOptions);
}

export function getSessionWithRemember(remember: boolean) {
  return getIronSession(cookies(), {
    ...sessionOptions,
    cookieOptions: {
      ...sessionOptions.cookieOptions,
      maxAge: remember ? 60 * 60 * 24 * 7 : undefined
    }
  });
}

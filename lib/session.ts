import { cookies } from "next/headers";
import { getIronSession, type IronSession, type SessionOptions } from "iron-session";

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret || sessionSecret.length < 32) {
  throw new Error("SESSION_SECRET must be set to at least 32 characters.");
}

export type SessionData = {
  user?: string;
  createdAt?: number;
};

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

export function getSession(): Promise<IronSession<SessionData>> {
  return getIronSession<SessionData>(cookies(), sessionOptions);
}

export function getSessionWithRemember(remember: boolean): Promise<IronSession<SessionData>> {
  return getIronSession<SessionData>(cookies(), {
    ...sessionOptions,
    cookieOptions: {
      ...sessionOptions.cookieOptions,
      maxAge: remember ? 60 * 60 * 24 * 7 : undefined
    }
  });
}
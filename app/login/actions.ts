"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { getSessionWithRemember } from "@/lib/session";
import { validateCredentials } from "@/lib/auth";

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
  remember: z.string().optional()
});

export type LoginState = {
  error: string | null;
};

export async function loginAction(_: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
    remember: formData.get("remember")
  });

  if (!parsed.success) {
    return { error: "Enter both a username and password." };
  }

  const result = validateCredentials(parsed.data.username, parsed.data.password);
  if (!result.ok) {
    if (result.reason === "invalid") {
      return { error: "Invalid credentials." };
    }
    return { error: "Authentication is not configured." };
  }

  const session = await getSessionWithRemember(Boolean(parsed.data.remember));
  session.user = result.user;
  session.createdAt = Date.now();
  await session.save();

  redirect("/portal");
}

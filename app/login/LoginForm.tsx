"use client";

import { useFormState, useFormStatus } from "react-dom";
import { loginAction, type LoginState } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="w-full rounded-full bg-sky-400 px-6 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-sky-400/30 transition hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-60"
      disabled={pending}
    >
      {pending ? "Signing in..." : "Sign in"}
    </button>
  );
}

export default function LoginForm() {
  const [state, formAction] = useFormState<LoginState, FormData>(loginAction, {
    error: null
  });

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_0_60px_-30px_rgba(56,189,248,0.4)]">
        <h1 className="text-3xl font-semibold text-slate-100">Sign in</h1>
        <p className="mt-2 text-sm text-slate-400">Access the private deck viewer.</p>

        <form action={formAction} className="mt-8 space-y-5">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium text-slate-200">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-slate-100 outline-none ring-sky-400/40 transition focus:border-sky-400 focus:ring"
              placeholder="investor"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-slate-200">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-slate-100 outline-none ring-sky-400/40 transition focus:border-sky-400 focus:ring"
              placeholder="********"
            />
          </div>

          <div className="flex items-center justify-between text-sm text-slate-400">
            <label className="flex items-center gap-2">
              <input
                name="remember"
                type="checkbox"
                defaultChecked
                className="h-4 w-4 rounded border-white/20 bg-slate-900 text-sky-400 focus:ring-sky-400"
              />
              Remember me
            </label>
          </div>

          {state.error ? (
            <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200" role="alert">
              {state.error}
            </p>
          ) : null}

          <SubmitButton />
        </form>
      </div>
    </main>
  );
}

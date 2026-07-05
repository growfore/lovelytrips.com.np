"use client";

import { type FormEvent } from "react";

export default function NotifyForm() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert("Thank you! We will notify you when we launch.");
  }

  return (
    <form
      className="flex w-full max-w-sm flex-col gap-2 sm:flex-row"
      onSubmit={handleSubmit}
    >
      <input
        type="email"
        placeholder="Enter your email"
        required
        className="flex-1 rounded-xl border border-primary/20 bg-white px-4 py-3 text-sm outline-none focus:border-primary/50"
      />
      <button
        type="submit"
        className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-light"
      >
        Notify Me
      </button>
    </form>
  );
}

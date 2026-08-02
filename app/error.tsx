"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-script font-bold text-forest">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-ink">
          This page didn&apos;t load
        </h2>
        <p className="mt-2 text-sm text-muted-ink">
          Something went wrong on our end. You can try refreshing or head back
          home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => reset()}
            className="btn-solid-dark cursor-pointer"
          >
            Try again
          </button>
          <Link href="/" className="btn-outline-dark inline-block">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

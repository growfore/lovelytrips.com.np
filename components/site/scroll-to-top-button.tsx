"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function ScrollToTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className="fixed bottom-20 left-5 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-ink/50 bg-paper/90 text-ink shadow-lg backdrop-blur transition-colors hover:bg-ink hover:text-paper md:bottom-6"
    >
      <ArrowUp size={18} />
    </button>
  );
}

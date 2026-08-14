import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href={"/"} className={`flex  items-center gap-1 ${className}`}>
      <img src={"/lovely-trips-logo.webp"} className="size-22"/>
    </Link>
  );
}

import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href={"/"} className={`flex flex-col items-center gap-1 ${className}`}>
      <img src={"/lovely-trips-logo.webp"} className="size-12"/>
      <div className="text-[9px] tracking-[0.3em] uppercase font-body opacity-80">Lovely Trips</div>
    </Link>
  );
}

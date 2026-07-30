export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <img src={"/icons/mountain.png"} className="size-12"/>
      <div className="text-[9px] tracking-[0.3em] uppercase font-body opacity-80">Lovely Trips</div>
    </div>
  );
}

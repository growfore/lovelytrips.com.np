import { Button } from "../ui/button";
import Link from "next/link";

export function MobileBookingBar({ price }: { price: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/50 bg-paper/95 backdrop-blur md:hidden">
      <div className="flex items-center justify-between gap-4 px-6 py-3">
        <div className="text-sm">
          <span className="text-muted-ink">From </span>
          <b className="text-lg">${price}</b>
          <span className="text-muted-ink">/person</span>
        </div>
        <Button className="rounded-full px-6">
          <Link href={"/booking"}>Book Now</Link>
        </Button>
      </div>
    </div>
  );
}

import CountdownTimer from "@/components/countdown-timer";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-gradient-to-br from-background to-primary-light/30 px-4">
      <main className="flex w-full max-w-lg flex-col items-center gap-8 rounded-2xl bg-white/90 px-6 py-12 text-center shadow-xl backdrop-blur sm:px-10 sm:py-16 sm:gap-10">
        <img
          src="/lovely-nepal-treks.jpeg"
          alt="Lovely Trips"
          className="h-24 w-auto sm:h-28"
        />

        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Coming Soon
        </h1>

        <p className="max-w-sm text-foreground/70 leading-relaxed">
          We are crafting the ultimate travel experiences for enchanting Nepal.
          Get ready to explore the Himalayas like never before.
        </p>

        <CountdownTimer />

        <p className="text-xs text-foreground/40">
          &copy; {new Date().getFullYear()} Lovely Trips. All rights reserved.
        </p>
      </main>
    </div>
  );
}

export function Stats() {
  return (
    <section className="relative py-16 md:py-40 px-4 md:px-16 bg-[url(/assets/stats-bg.jpg)] bg-no-repeat bg-cover before:absolute before:inset-0 before:bg-black/40 [mask-image:url(/section-mask.png)] [-webkit-mask-image:url(/section-mask.png)] [mask-size:cover] [-webkit-mask-size:cover] [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat]">
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 md:py-24 flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl mb-8 md:mb-16 divider-dash inline-flex items-center justify-center w-full text-white">
        {/*<h2 className="text-4xl md:text-5xl mb-16 divider-dash inline-flex items-center justify-center w-full text-white">*/}
          <span>Why Travelers Choose Us</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { n: "567", l: "Happy Travelers" },
            { n: "4095", l: "Trail Kilometers" },
            { n: "100", l: "Routes Scouted" },
            { n: "120", l: "Summits Reached" },
          ].map((s) => (
            <div key={s.l}>
              <div className="text-5xl md:text-6xl font-script text-white">{s.n}</div>
              <div className="text-[11px] tracking-[0.25em] uppercase mt-2 text-white/80 font-medium">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

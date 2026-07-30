export function ContactForm() {
  return (
    <section className="relative min-h-[40vh] py-24 px-6 bg-[url(/annapurna-range-as-seen-from-pokhara.jpg)] bg-cover bg-center before:absolute before:inset-0 before:bg-gradient-to-b before:from-white before:from-10% before:via-transparent before:via-30% before:to-black/70 before:to-90% flex items-center justify-center -mb-42">
      <div className="relative z-10 max-w-md mx-auto text-center text-white">
        <h2 className="font-script text-3xl md:text-4xl mb-8">
          &mdash; Contact Us &mdash;
        </h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full bg-white/20 backdrop-blur border border-white/30 rounded-full px-5 py-3 text-sm text-white placeholder:text-white/60 focus:outline-none focus:border-white/80"
          />
          <input
            type="tel"
            placeholder="Your Phone"
            className="w-full bg-white/20 backdrop-blur border border-white/30 rounded-full px-5 py-3 text-sm text-white placeholder:text-white/60 focus:outline-none focus:border-white/80"
          />
          <button
            type="button"
            className="bg-white text-black px-8 py-3 rounded-full text-sm font-medium hover:bg-white/90 transition-all"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}

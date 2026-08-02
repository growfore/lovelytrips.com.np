import { Nav } from "./nav";

const heroImg = "/hero-image.webp";

export function Hero() {
  return (
    <section className="relative h-[70vh] min-h-[500px] md:h-[100vh] md:min-h-[700px] w-full">
      <div className="absolute inset-0 [mask-image:url(/hero-mask-2.webp)] [-webkit-mask-image:url(/hero-mask-2.webp)] [mask-size:100%_100%] [-webkit-mask-size:100%_100%] [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat]">
        <img
          src={heroImg}
          alt="Hiker celebrating on mountain summit"
          className="w-full h-full object-cover"
        />
      </div>
      <Nav className="text-black" />
      <div className="relative z-10 text-center text-black mt-8 md:mt-24">
        <svg viewBox="0 0 1000 180" className="w-full max-w-4xl mx-auto h-auto overflow-visible">
          <defs>
            <path id="hero-curve" d="M 50 60 C 300 30, 700 30, 950 70" fill="none" />
          </defs>
          <text className="font-script text-8xl " fill="black" textAnchor="middle">
            <textPath href="#hero-curve" startOffset="50%">
              Hikes into the Mountains
            </textPath>
          </text>
        </svg>
        <p className="text-[0.1em] md:text-sm tracking-[0.4em] uppercase md:-mt-24 -mt-8 opacity-90 font-light">
          &mdash; guided treks for every level &mdash;
        </p>
      </div>
    </section>
  );
}

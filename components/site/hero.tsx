import { Nav } from "./nav";

const heroImg = "/hero-image.png";

export function Hero() {
  return (
    <section className="relative h-[100vh] min-h-[700px] w-full">
      <div className="absolute inset-0 [mask-image:url(/hero-mask-2.png)] [-webkit-mask-image:url(/hero-mask-2.png)] [mask-size:cover] [-webkit-mask-size:cover] [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat]">
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
          <text className="font-script text-5xl md:text-7xl lg:text-8xl" fill="black" textAnchor="middle">
            <textPath href="#hero-curve" startOffset="50%">
              Hikes into the Mountains
            </textPath>
          </text>
        </svg>
        <p className="text-xs md:text-sm tracking-[0.4em] uppercase -mt-24 opacity-90 font-light">
          &mdash; guided treks for every level &mdash;
        </p>
      </div>
    </section>
  );
}

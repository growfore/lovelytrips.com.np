import type { AltitudePoint } from "@/lib/api";
import { SectionTitle } from "./section-title";

function AltitudeProfile({ data }: { data: AltitudePoint[] }) {
  if (data.length === 0) return null;
  const altitudes = data.map((d) => d.altitude);
  const maxAlt = Math.max(...altitudes);
  const minAlt = Math.min(...altitudes);
  const range = maxAlt - minAlt || 1;
  const padding = range * 0.1;
  const chartH = 300;
  const chartW = 1000;

  const x = (_i: number) => (_i / (data.length - 1)) * chartW;
  const y = (alt: number) => chartH - ((alt - minAlt + padding) / (range + 2 * padding)) * (chartH - 60) - 30;

  const linePath = data.map((d, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(d.altitude)}`).join(" ");

  const areaPath = `${linePath} L ${x(data.length - 1)} ${chartH} L ${x(0)} ${chartH} Z`;

  return (
    <svg viewBox={`0 0 ${chartW} ${chartH + 60}`} className="w-full h-auto max-h-[400px]" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="alt-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--forest, #2d6a4f)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--forest, #2d6a4f)" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {data.map((d, i) => (
        <line
          key={`grid-${i}`}
          x1={x(i)}
          y1={30}
          x2={x(i)}
          y2={chartH}
          stroke="currentColor"
          strokeOpacity="0.06"
          strokeWidth="1"
        />
      ))}

      <path d={areaPath} fill="url(#alt-gradient)" />

      <path
        d={linePath}
        fill="none"
        stroke="var(--forest, #2d6a4f)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {data.map((d, i) => {
        const isPeak = d.altitude === maxAlt;
        return (
          <g key={i}>
            <circle
              cx={x(i)}
              cy={y(d.altitude)}
              r={isPeak ? 6 : 4}
              fill={isPeak ? "var(--forest, #2d6a4f)" : "white"}
              stroke="var(--forest, #2d6a4f)"
              strokeWidth="2"
            />
            {isPeak && (
              <text
                x={x(i)}
                y={y(d.altitude) - 14}
                textAnchor="middle"
                className="text-[10px] fill-ink font-semibold"
              >
                {d.altitude}m
              </text>
            )}
            <text
              x={x(i)}
              y={chartH + 20}
              textAnchor="middle"
              className="text-[9px] md:text-[10px] fill-muted-ink"
              style={{ transform: data.length > 6 ? `rotate(-30deg) translate(${x(i) < chartW * 0.2 ? 10 : x(i) > chartW * 0.8 ? -10 : 0}, 0)` : undefined }}
            >
              {d.location.length > 15 ? d.location.slice(0, 15) + "…" : d.location}
            </text>
            {!isPeak && (
              <text
                x={x(i)}
                y={y(d.altitude) - 10}
                textAnchor="middle"
                className="text-[8px] fill-muted-ink"
              >
                {d.altitude}m
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export function PackageAltitudeChart({ data }: { data: AltitudePoint[] }) {
  if (!data || data.length === 0) return null;
  return (
    <section className="py-20 px-6 md:px-16 bg-paper">
      <SectionTitle>Altitude Profile</SectionTitle>
      <p className="text-center text-sm text-muted-ink font-light mb-10 max-w-xl mx-auto">
        Track the elevation gain and loss throughout your journey
      </p>
      <div className="max-w-5xl mx-auto bg-mist/20 rounded-2xl p-6 md:p-10">
        <AltitudeProfile data={data} />
      </div>
    </section>
  );
}

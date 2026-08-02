"use client";

import {
  Area,
  AreaChart,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { AltitudePoint } from "@/lib/api";
import { SectionTitle } from "./section-title";

function AltitudeProfile({ data }: { data: AltitudePoint[] }) {
  if (data.length === 0) return null;
  const maxAlt = Math.max(...data.map((d) => d.altitude));
  const rotate = data.length > 6;

  return (
    <ResponsiveContainer width="100%" height={340}>
      <AreaChart data={data} margin={{ top: 30, right: 16, bottom: 8, left: 16 }}>
        <defs>
          <linearGradient id="altGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--forest, #787f55)" stopOpacity={0.3} />
            <stop offset="100%" stopColor="var(--forest, #787f55)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="location"
          tick={{ fontSize: 10, fill: "var(--muted-ink, #64748b)" }}
          interval={0}
          angle={rotate ? -30 : 0}
          textAnchor={rotate ? "end" : "middle"}
          height={rotate ? 60 : 40}
          axisLine={false}
          tickLine={false}
        />
        <YAxis hide domain={["auto", "auto"]} />
        <Tooltip
          cursor={{ stroke: "var(--mist, #d3d4aa)", strokeWidth: 1 }}
          contentStyle={{
            background: "white",
            border: "1px solid var(--mist, #d3d4aa)",
            borderRadius: 12,
            fontSize: 12,
            color: "var(--ink, #04302f)",
          }}
          labelStyle={{ fontWeight: 600, marginBottom: 4 }}
          formatter={(value) => [`${value} m`, "Altitude"]}
        />
        <Area
          type="monotone"
          dataKey="altitude"
          stroke="var(--forest, #787f55)"
          strokeWidth={2.5}
          fill="url(#altGradient)"
          dot={(props) => {
            const isPeak = props.payload?.altitude === maxAlt;
            return (
              <circle
                key={props.index}
                cx={props.cx}
                cy={props.cy}
                r={isPeak ? 6 : 4}
                fill={isPeak ? "var(--forest, #787f55)" : "white"}
                stroke="var(--forest, #787f55)"
                strokeWidth={2}
              />
            );
          }}
          activeDot={{ r: 6 }}
        >
          <LabelList
            dataKey="altitude"
            position="top"
            formatter={(value: React.ReactNode) => `${value}m`}
            offset={14}
            style={{ fontSize: 9, fill: "var(--muted-ink, #64748b)" }}
          />
        </Area>
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function PackageAltitudeChart({ data }: { data: AltitudePoint[] }) {
  if (!data || data.length === 0) return null;
  return (
    <section id="altitude" className="py-20 px-6 md:px-16 bg-paper">
      <SectionTitle>Altitude Profile</SectionTitle>
      <p className="text-center text-sm text-muted-ink font-light mb-10 max-w-xl mx-auto">
        Track the elevation gain and loss throughout your journey
      </p>
      <div className="max-w-5xl mx-auto bg-mist/20 rounded-2xl p-4 md:p-8">
        <AltitudeProfile data={data} />
      </div>
    </section>
  );
}

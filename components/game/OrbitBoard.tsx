"use client";
import React from "react";
import { BOARD, GROUPS } from "@/lib/game-data";
import { OrbitState, ownerOf } from "@/lib/orbit-engine";

const point = (r: number, a: number) => [
  450 + r * Math.cos((a * Math.PI) / 180),
  450 + r * Math.sin((a * Math.PI) / 180),
];
function sector(a: number, b: number, inner: number, outer: number) {
  const p = point(outer, a),
    q = point(outer, b),
    r = point(inner, b),
    t = point(inner, a);
  return `M${p}A${outer},${outer} 0 0 1 ${q}L${r}A${inner},${inner} 0 0 0 ${t}Z`;
}
export default function OrbitBoard({
  state,
  selected,
  onSelect,
  children,
}: {
  state: OrbitState | null;
  selected?: number;
  onSelect: (id: number) => void;
  children?: React.ReactNode;
}) {
  const active = state?.players[state.current];
  return (
    <div className="orbit-board">
      <svg
        className="accelerator"
        viewBox="0 0 900 900"
        aria-label="Circular accelerator property board, 32 destinations"
      >
        <defs>
          <radialGradient id="core">
            <stop stopColor="#153039" />
            <stop offset="1" stopColor="#06121b" />
          </radialGradient>
          <filter id="neon">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>
        <circle
          cx="450"
          cy="450"
          r="430"
          fill="none"
          stroke="#213842"
          strokeWidth="1"
          strokeDasharray="1 7"
        />
        <circle
          cx="450"
          cy="450"
          r="407"
          fill="none"
          stroke="#203a43"
          strokeWidth="9"
        />
        <circle
          className="beam-trail"
          cx="450"
          cy="450"
          r="407"
          fill="none"
          stroke="#8fffe0"
          strokeWidth="2"
          strokeDasharray="70 2490"
        />
        <circle cx="450" cy="450" r="203" fill="url(#core)" stroke="#45636b" />
        <circle
          className="inner-beam"
          cx="450"
          cy="450"
          r="209"
          fill="none"
          stroke="#6df7d1"
          strokeWidth="1"
          strokeDasharray="20 12 2 12"
          opacity=".5"
        />
        {BOARD.map((b) => {
          const angle = (b.id * 360) / BOARD.length - 90,
            color = b.group
              ? GROUPS[b.group].color
              : b.kind === "pulse"
                ? "#89b8ff"
                : b.kind === "community"
                  ? "#c2b8e0"
                  : "#c9d8c9",
            owner = state ? ownerOf(state, b.id) : null,
            here =
              state?.players.filter(
                (p) => !p.bankrupt && p.position === b.id,
              ) || [],
            xy = point(310, angle),
            activeSpace = active?.position === b.id;
          const words = b.shortName.split(" "),
            first = words.length > 1 ? words.slice(0, -1).join(" ") : words[0],
            last = words.length > 1 ? words[words.length - 1] : "";
          return (
            <g
              key={b.id}
              role="button"
              tabIndex={0}
              aria-label={`${b.id}. ${b.name}${b.cost ? `, price ${b.cost}` : ""}${owner ? `, owned by ${owner.name}` : ""}`}
              onClick={() => onSelect(b.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(b.id);
                }
              }}
              className={`orbit-sector ${activeSpace ? "occupied" : ""} ${selected === b.id ? "selected" : ""}`}
              style={{ "--sector": color } as React.CSSProperties}
            >
              <path
                className="sector-body"
                d={sector(angle - 5.4, angle + 5.4, 215, 399)}
              />
              <path
                d={sector(angle - 5.4, angle + 5.4, 388, 399)}
                fill={color}
                opacity=".9"
              />
              {owner && (
                <path
                  d={sector(angle - 5.4, angle + 5.4, 215, 224)}
                  fill={owner.color}
                />
              )}
              <g
                transform={`translate(${xy}) rotate(${angle + 90 + (b.id > 8 && b.id < 24 ? 180 : 0)})`}
              >
                <text y="-43" className="sector-number">
                  {String(b.id).padStart(2, "0")}
                </text>
                <b.icon
                  x="-12"
                  y="-28"
                  width="24"
                  height="24"
                  color={color}
                  strokeWidth="1.3"
                />
                <text
                  y="13"
                  className="sector-name"
                  textLength={first.length > 8 ? 58 : undefined}
                  lengthAdjust="spacingAndGlyphs"
                >
                  {first}
                </text>
                <text
                  y="29"
                  className="sector-name"
                  textLength={last.length > 8 ? 58 : undefined}
                  lengthAdjust="spacingAndGlyphs"
                >
                  {last}
                </text>
                <text
                  y="49"
                  className="sector-price"
                  textLength={56}
                  lengthAdjust="spacingAndGlyphs"
                >
                  {owner?.mortgages.includes(b.id)
                    ? "MORTGAGED"
                    : b.cost
                      ? `◈ ${b.cost}`
                      : b.id === 0
                        ? "+200 / LAP"
                        : b.id === 31
                          ? "GO TO AUDIT"
                          : b.kind.toUpperCase()}
                </text>
                {!!owner?.assets[b.id] && (
                  <text y="68" fill={owner.color} className="sector-price">
                    {owner.assets[b.id] === 5
                      ? "HOTEL"
                      : "▪".repeat(owner.assets[b.id])}
                  </text>
                )}
              </g>
              {here.map((p, i) => {
                const t = point(412 + i * 12, angle);
                return (
                  <g key={p.id} className="orbit-token">
                    <circle
                      cx={t[0]}
                      cy={t[1]}
                      r="15"
                      fill={p.color}
                      stroke="#e7fff6"
                      strokeWidth="2"
                    />
                    <text
                      x={t[0]}
                      y={t[1] + 3}
                      textAnchor="middle"
                      fill="#06131b"
                      fontSize="10"
                      fontWeight="800"
                    >
                      {p.avatar}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}
        <text x="450" y="16" textAnchor="middle" className="instrument-label">
          CAPITAL ACCELERATOR / RING 01
        </text>
        <text x="450" y="895" textAnchor="middle" className="instrument-label">
          32 DESTINATIONS · CLOCKWISE ORBIT · GLOBAL ECONOMY
        </text>
      </svg>
      <div className="reactor-core">{children}</div>
    </div>
  );
}

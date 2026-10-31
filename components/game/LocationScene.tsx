"use client";
import { BOARD } from "@/lib/game-data";

// Original architectural vector environments. Local, motion-aware, no remote media dependency.
export default function LocationScene({ space = 0 }: { space?: number }) {
  const b = BOARD[space];
  const theme =
    b.region === "Frontier"
      ? "orbital"
      : b.id === 3 || b.id === 18 || b.id === 29
        ? "coast"
        : b.region === "Gulf" || b.id === 19
          ? "desert"
          : b.region === "Britain" || b.id === 14
            ? "heritage"
            : b.id === 3 || b.id === 18
              ? "coast"
              : b.id === 8
                ? "desert"
                : "city";
  const heights = Array.from(
    { length: 25 },
    (_, i) => 45 + ((i * 47 + space * 31) % 190),
  );
  return (
    <div
      className={`location-scene scene-${theme}`}
      key={space}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="sky" x2="0" y2="1">
            <stop stopColor="#07121e" />
            <stop
              offset="1"
              stopColor={theme === "desert" ? "#3d2d22" : "#12333d"}
            />
          </linearGradient>
          <linearGradient id="glass" x2="1" y2="0">
            <stop stopColor="#0c2631" />
            <stop offset=".48" stopColor="#23505a" />
            <stop offset=".5" stopColor="#0f2c38" />
            <stop offset="1" stopColor="#183c47" />
          </linearGradient>
          <pattern
            id="windows"
            width="15"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect
              width="2"
              height="7"
              x="5"
              y="6"
              fill="#a4e5dd"
              opacity=".32"
            />
          </pattern>
          <linearGradient id="fade" x2="0" y2="1">
            <stop stopColor="#6ac7be" stopOpacity=".25" />
            <stop offset="1" stopColor="#06121c" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="1600" height="900" fill="url(#sky)" />
        <g className="scene-stars">
          {Array.from({ length: 45 }, (_, i) => (
            <circle
              key={i}
              cx={(i * 173 + 73) % 1600}
              cy={(i * 67 + 19) % 480}
              r={i % 5 === 0 ? 1.7 : 0.7}
              fill="#d9f7ee"
              opacity={0.15 + (i % 4) * 0.13}
            />
          ))}
        </g>
        <circle
          className="scene-moon"
          cx="1250"
          cy="205"
          r={theme === "orbital" ? 105 : 57}
          fill="none"
          stroke="#a7c9c9"
          strokeWidth=".7"
          opacity=".4"
        />
        {theme === "orbital" ? (
          <g stroke="#78b9c5" fill="none">
            <ellipse
              cx="800"
              cy="445"
              rx="470"
              ry="100"
              transform="rotate(-17 800 445)"
              opacity=".4"
            />
            <ellipse
              cx="800"
              cy="445"
              rx="350"
              ry="73"
              transform="rotate(-17 800 445)"
              opacity=".4"
            />
            <path
              d="M600 480L820 245L1000 360M820 245V590M470 540L1120 350"
              opacity=".4"
            />
            <circle cx="820" cy="445" r="145" strokeWidth="2" />
            <path d="M700 735Q800 690 900 735L1100 790H500Z" fill="#15333e" />
          </g>
        ) : (
          <>
            {theme === "desert" && (
              <g fill="#343d3d" stroke="#7e9e96" strokeWidth=".5">
                <path d="M-100 685Q250 460 650 700Q1100 490 1700 670V900H0Z" />
                {b.id === 8 && (
                  <>
                    <path d="M70 700L240 430L410 700Z" fill="#4b5047" />
                    <path d="M240 430L290 700H410Z" fill="#273b3e" />
                  </>
                )}
                {b.id === 19 && (
                  <g fill="#132b3a" stroke="#779fa6">
                    {Array.from({ length: 12 }, (_, i) => (
                      <g key={i} transform={`translate(${120 + i * 110} 650)`}>
                        <path d="M0 0L20 -35H95L75 0ZM37 -35L17 0M74 -35L54 0M10 -17H85" />
                        <path d="M38 0V25" />
                      </g>
                    ))}
                  </g>
                )}
              </g>
            )}
            <g opacity=".65">
              {heights.map((h, i) => (
                <g key={i}>
                  <path
                    d={`M${i * 70 - 35} 730V${730 - h}h${theme === "heritage" ? 46 : 55}V730Z`}
                    fill="url(#glass)"
                    stroke="#5b8e94"
                    strokeWidth=".6"
                  />
                  <rect
                    x={i * 70 - 34}
                    y={731 - h}
                    width="53"
                    height={h - 1}
                    fill="url(#windows)"
                  />
                  {theme === "heritage" && (
                    <path
                      d={`M${i * 70 - 42} ${730 - h}l30 -25l30 25Z`}
                      fill="#263e46"
                      stroke="#6d8e8c"
                      strokeWidth=".6"
                    />
                  )}
                </g>
              ))}
            </g>
            {(b.id === 17 || b.id === 0) && (
              <path
                d="M1180 730V420H1190V345H1200V280H1210V200H1220V110H1224V200H1234V280H1244V345H1254V420H1264V730Z"
                fill="url(#glass)"
                stroke="#a2d2cb"
                strokeWidth="1"
              />
            )}
            {b.id === 14 && (
              <g stroke="#7ca8a6" fill="#122f39">
                <path d="M1000 740L1170 540L1340 740Z" />
                <path
                  d="M1170 540V740M1085 640H1255M1040 690H1300M1170 540L1085 740M1170 540L1255 740"
                  opacity=".6"
                />
              </g>
            )}
            <path d="M0 740H1600" stroke="#79c8c0" opacity=".4" />
            <rect y="741" width="1600" height="160" fill="url(#fade)" />
            {theme === "coast" && (
              <g
                className="scene-water"
                stroke="#6fc6c6"
                fill="none"
                opacity=".25"
              >
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <path
                    key={i}
                    d={`M-100 ${770 + i * 19} Q100 ${755 + i * 19} 300 ${770 + i * 19}T700 ${770 + i * 19}T1100 ${770 + i * 19}T1700 ${770 + i * 19}`}
                  />
                ))}
              </g>
            )}
            <g className="scene-traffic" stroke="#a5e9e0" strokeWidth="2">
              <path d="M150 750h85M620 760h50M1350 753h95" />
            </g>
          </>
        )}
        <path
          className="scene-scan"
          d="M0 0H1600V2H0Z"
          fill="#a1e7dd"
          opacity=".08"
        />
      </svg>
    </div>
  );
}

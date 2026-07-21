interface WorldArtProps {
  variant?: "opening" | "map" | "camp";
}

export function KaiWorldArt({ variant = "opening" }: WorldArtProps) {
  const isCamp = variant === "camp";

  return (
    <svg className="kai-world-art" viewBox="0 0 1440 900" role="img" aria-labelledby={`world-${variant}-title world-${variant}-desc`} preserveAspectRatio="xMidYMid slice">
      <title id={`world-${variant}-title`}>{isCamp ? "Kai's camp at dusk" : "Kai and Pip overlooking a faded world"}</title>
      <desc id={`world-${variant}-desc`}>
        {isCamp
          ? "A quiet tent and open journal rest beneath lantern light."
          : "A mountain, a sleeping forest, and a broken star bridge rise beyond Kai and his glowing fox companion."}
      </desc>
      <g data-layer="sky">
        <rect width="1440" height="900" fill="var(--kai-sky)" />
        <circle cx="1125" cy="170" r="88" fill="var(--kai-moon)" opacity=".84" />
        <path d="M0 260 C240 160 410 320 640 230S1050 150 1440 270V0H0Z" fill="var(--kai-cloud)" opacity=".72" />
        <path d="M-40 370 C220 260 430 390 720 290s520-55 770 60v-155c-330-130-580-86-820 10S215 185-40 300Z" fill="var(--kai-haze)" opacity=".58" />
        {Array.from({ length: 13 }, (_, index) => (
          <circle key={index} cx={770 + ((index * 83) % 610)} cy={78 + ((index * 47) % 205)} r={index % 3 === 0 ? 4 : 2.5} fill="var(--kai-star)" opacity=".72" />
        ))}
      </g>
      <g data-layer="terrain">
        <path d="M0 620 150 500l110 62 145-215 105 130 172-258 132 191 128-84 125 202 117-70 176 173v269H0Z" fill="var(--kai-range-back)" />
        <path d="m515 477 167-258 132 191 72-47-76 104-118-78-91 141Z" fill="var(--kai-snow)" opacity=".72" />
        <path d="M0 650c170-88 318-26 448 37 164 80 319-20 484-15 194 6 292 121 508 32v196H0Z" fill="var(--kai-ground)" />
        <path d="M540 900c65-120 146-172 230-198 110-34 204-22 316-116" fill="none" stroke="var(--kai-path)" strokeWidth="54" strokeLinecap="round" opacity=".56" />
      </g>
      <g data-layer="landmarks" aria-hidden="true">
        <g className="landmark-mountain">
          <path d="m605 560 112-228 114 228Z" fill="var(--kai-mountain)" />
          <path d="m683 400 34-68 38 76-37-14Z" fill="var(--kai-crystal)" opacity=".5" />
          <path d="m650 510 38-72 30 65 34-87 45 94" fill="none" stroke="var(--kai-crystal)" strokeWidth="9" strokeLinecap="round" />
        </g>
        <g className="landmark-woods" transform="translate(260 464)">
          <path d="M0 144 48 42l35 58 48-100 52 110 43-63 52 97Z" fill="var(--kai-forest)" />
          <path d="M46 145V98m84 47V82m66 63v-42" stroke="var(--kai-bark)" strokeWidth="12" strokeLinecap="round" />
        </g>
        <g className="landmark-bridge" transform="translate(935 422)">
          <path d="M0 144c72-96 172-98 278 0" fill="none" stroke="var(--kai-bridge)" strokeWidth="31" strokeDasharray="62 18" strokeLinecap="round" />
          <path d="M16 135c65-120 173-120 250 0" fill="none" stroke="var(--kai-star)" strokeWidth="5" strokeDasharray="6 18" />
        </g>
      </g>
      {isCamp ? <CampDetails /> : <KaiAndPip />}
    </svg>
  );
}

function KaiAndPip() {
  return (
    <g data-layer="characters" transform="translate(235 570)">
      <ellipse cx="150" cy="265" rx="145" ry="28" fill="var(--kai-shadow)" opacity=".32" />
      <g data-character="kai">
        <path d="M83 126c-10 42-5 84 2 129h82c9-61 3-99-11-135Z" fill="var(--kai-cape)" />
        <path d="M95 121h55l17 93-39 17-45-19Z" fill="var(--kai-shirt)" />
        <path d="m105 213-8 57m48-57 18 56" stroke="var(--kai-trouser)" strokeWidth="22" strokeLinecap="round" />
        <circle cx="123" cy="82" r="48" fill="var(--kai-skin)" />
        <path d="M76 78c2-52 30-74 68-62 30 9 39 34 33 66-16-20-29-25-47-23-22 3-29 22-54 19Z" fill="var(--kai-hair)" />
        <path d="M108 87c8 4 18 4 27 0" fill="none" stroke="var(--kai-ink)" strokeWidth="4" strokeLinecap="round" />
        <circle cx="119" cy="154" r="20" fill="var(--kai-compass)" stroke="var(--kai-ink)" strokeWidth="5" />
        <path d="m119 140 5 14-5 14-5-14Z" fill="var(--kai-coral)" />
      </g>
      <g data-character="pip" className="pip-guide" transform="translate(212 116)">
        <path d="M10 60c-30-17-25-55 4-62 22-5 46 7 51 28 14-18 39-22 59-7 29 22 13 66-21 67-28 1-42-18-50-31-11 17-24 22-43 5Z" fill="var(--kai-pip)" opacity=".96" />
        <path d="m47 8-19-28 35 18m42 25 24-25-5 39" fill="var(--kai-pip)" />
        <circle cx="84" cy="35" r="3" fill="var(--kai-ink)" />
        <path d="M4 66c-24 6-36 21-41 38" fill="none" stroke="var(--kai-pip)" strokeWidth="13" strokeLinecap="round" />
        <path d="M-43 107c-38 2-53 18-65 35" fill="none" stroke="var(--kai-pip-glow)" strokeWidth="6" strokeLinecap="round" strokeDasharray="4 14" />
      </g>
    </g>
  );
}

function CampDetails() {
  return (
    <g data-layer="camp" aria-hidden="true">
      <path d="m1000 720 130-246 180 246Z" fill="var(--kai-coral)" opacity=".82" />
      <path d="m1130 474 38 246" stroke="var(--kai-cream)" strokeWidth="8" opacity=".7" />
      <circle cx="930" cy="680" r="46" fill="var(--kai-sunrise)" opacity=".28" />
      <path d="M895 730h70l-12-125h-46Z" fill="var(--kai-sunrise)" opacity=".82" />
      <path d="m310 690 214-72 214 72-214 72Z" fill="var(--kai-cream)" />
      <path d="M524 618v144" stroke="var(--kai-bark)" strokeWidth="7" opacity=".45" />
    </g>
  );
}

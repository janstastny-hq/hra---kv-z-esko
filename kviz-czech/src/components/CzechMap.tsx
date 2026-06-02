import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Info, Compass } from 'lucide-react';
import { REGIONS, RegionInfo } from '../questions';

interface CzechMapProps {
  completedRegionIds: string[];
  activeRegionId: string | null;
  onSelectRegion: (id: string) => void;
  gameStarted: boolean;
  activePlayerColor: string;
}

interface MapRegion {
  id: string;
  name: string;
  path: string;
  labelX: number;
  labelY: number;
  capX: number;
  capY: number;
  capName: string;
}

// Vysoce věrné a detailně členité zubaté cesty čerpající z reálné geografie ČR pro 14 krajů
const MAP_REGIONS: MapRegion[] = [
  {
    id: 'KVK',
    name: 'Karlovarský',
    path: 'M 40,160 L 45,150 L 52,142 L 65,135 L 78,132 L 95,130 L 110,130 L 115,138 L 122,142 L 128,150 L 135,160 L 131,175 L 128,190 L 124,208 L 120,225 L 105,230 L 90,235 L 75,235 L 60,235 L 48,220 L 42,198 L 38,180 L 40,160 Z',
    labelX: 85,
    labelY: 195,
    capX: 85,
    capY: 165,
    capName: 'Karlovy Vary'
  },
  {
    id: 'PLZ',
    name: 'Plzeňský',
    path: 'M 120,225 L 124,208 L 128,190 L 131,175 L 135,160 L 145,170 L 155,180 L 165,198 L 175,215 L 192,225 L 210,240 L 205,262 L 200,285 L 198,310 L 195,335 L 178,332 L 160,330 L 142,322 L 125,315 L 118,292 L 115,270 L 118,248 L 120,225 Z',
    labelX: 160,
    labelY: 280,
    capX: 162,
    capY: 245,
    capName: 'Plzeň'
  },
  {
    id: 'JHC',
    name: 'Jihočeský',
    path: 'M 195,335 L 198,310 L 200,285 L 205,262 L 210,240 L 230,238 L 248,242 L 265,245 L 275,252 L 285,260 L 295,268 L 310,274 L 315,288 L 322,298 L 330,305 L 340,320 L 350,335 L 340,350 L 330,362 L 320,378 L 310,390 L 296,391 L 282,392 L 268,394 L 255,395 L 240,380 L 225,365 L 210,350 L 195,335 Z',
    labelX: 260,
    labelY: 320,
    capX: 255,
    capY: 355,
    capName: 'České Budějovice'
  },
  {
    id: 'ULK',
    name: 'Ústecký',
    path: 'M 110,130 L 122,125 L 138,118 L 155,110 L 172,105 L 190,102 L 205,100 L 210,110 L 215,120 L 225,130 L 235,140 L 225,145 L 215,150 L 210,165 L 195,178 L 180,185 L 157,172 L 135,160 L 128,150 L 122,142 L 115,138 L 110,130 Z',
    labelX: 160,
    labelY: 150,
    capX: 172,
    capY: 133,
    capName: 'Ústí nad Labem'
  },
  {
    id: 'LBK',
    name: 'Liberecký',
    path: 'M 205,100 L 222,95 L 240,90 L 258,90 L 275,90 L 280,102 L 285,115 L 290,128 L 290,135 L 280,136 L 265,135 L 250,138 L 235,140 L 225,130 L 215,120 L 210,110 L 205,100 Z',
    labelX: 246,
    labelY: 124,
    capX: 244,
    capY: 108,
    capName: 'Liberec'
  },
  {
    id: 'STC',
    name: 'Středočeský',
    path: 'M 180,185 L 195,178 L 210,165 L 215,150 L 225,145 L 235,140 L 250,138 L 265,135 L 280,136 L 290,135 L 295,145 L 305,150 L 315,158 L 320,165 L 332,160 L 342,154 L 350,150 L 360,162 L 370,175 L 375,185 L 380,200 L 390,205 L 385,220 L 382,240 L 378,255 L 375,275 L 358,275 L 342,275 L 325,275 L 310,274 L 295,268 L 285,260 L 275,252 L 265,245 L 248,242 L 230,238 L 210,240 L 200,232 L 188,225 L 175,215 L 176,200 L 180,185 Z',
    labelX: 305,
    labelY: 245,
    capX: 265,
    capY: 191,
    capName: 'Praha'
  },
  {
    id: 'PHA',
    name: 'Praha',
    path: 'M 255,188 L 260,183 L 268,181 L 274,185 L 276,192 L 271,199 L 262,201 L 255,195 L 255,188 Z',
    labelX: 265,
    labelY: 195,
    capX: 265,
    capY: 191,
    capName: 'Praha'
  },
  {
    id: 'HKK',
    name: 'Královéhradecký',
    path: 'M 290,135 L 290,128 L 285,115 L 280,102 L 295,95 L 312,110 L 332,120 L 352,112 L 375,105 L 388,115 L 397,127 L 410,138 L 420,150 L 408,158 L 397,167 L 385,176 L 375,185 L 368,172 L 362,167 L 350,150 L 342,154 L 332,160 L 320,165 L 315,158 L 305,150 L 295,145 L 290,135 Z',
    labelX: 355,
    labelY: 135,
    capX: 350,
    capY: 148,
    capName: 'Hradec Králové'
  },
  {
    id: 'PAK',
    name: 'Pardubický',
    path: 'M 375,185 L 385,176 L 397,167 L 408,158 L 420,150 L 430,162 L 442,170 L 454,180 L 465,190 L 455,202 L 445,217 L 435,230 L 425,245 L 412,252 L 400,260 L 388,268 L 375,275 L 378,252 L 375,230 L 376,208 L 375,185 Z',
    labelX: 415,
    labelY: 220,
    capX: 410,
    capY: 202,
    capName: 'Pardubice'
  },
  {
    id: 'VYS',
    name: 'Vysočina',
    path: 'M 310,275 L 325,275 L 342,275 L 358,275 L 375,275 L 388,268 L 400,260 L 412,252 L 425,245 L 428,262 L 432,280 L 436,298 L 440,315 L 422,326 L 407,337 L 392,348 L 375,360 L 368,348 L 362,347 L 350,335 L 340,320 L 330,305 L 322,298 L 315,288 L 310,275 Z',
    labelX: 375,
    labelY: 295,
    capX: 368,
    capY: 316,
    capName: 'Jihlava'
  },
  {
    id: 'JHM',
    name: 'Jihomoravský',
    path: 'M 375,360 L 392,348 L 407,337 L 422,326 L 440,315 L 452,318 L 462,320 L 474,322 L 485,325 L 495,332 L 505,340 L 515,348 L 525,355 L 526,368 L 527,382 L 528,396 L 530,410 L 515,412 L 500,415 L 485,418 L 470,420 L 448,418 L 425,415 L 402,412 L 380,410 L 378,398 L 377,385 L 376,372 L 375,360 Z',
    labelX: 435,
    labelY: 390,
    capX: 452,
    capY: 368,
    capName: 'Brno'
  },
  {
    id: 'OLK',
    name: 'Olomoucký',
    path: 'M 420,150 L 435,146 L 450,142 L 462,140 L 478,135 L 492,132 L 505,130 L 512,138 L 520,145 L 525,150 L 535,160 L 545,170 L 540,186 L 535,202 L 532,207 L 526,224 L 520,245 L 508,245 L 497,245 L 486,245 L 475,245 L 465,225 L 455,202 L 465,190 L 454,180 L 442,170 L 430,162 L 420,150 Z',
    labelX: 485,
    labelY: 170,
    capX: 478,
    capY: 191,
    capName: 'Olomouc'
  },
  {
    id: 'ZLK',
    name: 'Zlínský',
    path: 'M 520,245 L 526,224 L 532,207 L 535,202 L 540,186 L 545,170 L 558,198 L 572,228 L 585,260 L 585,274 L 585,287 L 585,301 L 585,315 L 570,323 L 555,335 L 540,345 L 525,355 L 515,348 L 505,340 L 495,332 L 485,325 L 497,245 L 508,245 L 520,245 Z',
    labelX: 535,
    labelY: 315,
    capX: 538,
    capY: 292,
    capName: 'Zlín'
  },
  {
    id: 'MSK',
    name: 'Moravskoslezský',
    path: 'M 505,130 L 518,128 L 532,126 L 545,125 L 560,122 L 572,121 L 585,120 L 598,132 L 610,142 L 622,154 L 635,165 L 628,184 L 622,202 L 616,221 L 610,240 L 594,242 L 577,242 L 561,243 L 545,245 L 535,160 L 525,150 L 520,145 L 512,138 L 505,130 Z',
    labelX: 575,
    labelY: 175,
    capX: 588,
    capY: 184,
    capName: 'Ostrava'
  }
];

export default function CzechMap({
  completedRegionIds,
  activeRegionId,
  onSelectRegion,
  gameStarted,
  activePlayerColor
}: CzechMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<RegionInfo | null>(null);

  return (
    <div className="relative w-full aspect-[4/3] max-w-2xl mx-auto bg-slate-900/35 rounded-3xl p-5 border border-slate-800/80 backdrop-blur-md shadow-2xl overflow-hidden">
      <h3 className="text-center font-sans text-xs font-bold tracking-widest text-slate-500 uppercase mb-3 flex items-center justify-center gap-2">
        <Compass className="w-4 h-4 text-indigo-500 animate-spin-slow" />
        INTERAKTIVNÍ MAPA REGIONŮ ČR
      </h3>

      <svg
        viewBox="0 0 680 460"
        className="w-full h-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.55)]"
      >
        <defs>
          {/* Jemná kartografická mřížka */}
          <pattern id="card-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(79, 70, 229, 0.08)" strokeWidth="1" />
            <circle cx="0" cy="0" r="1" fill="rgba(79, 70, 229, 0.25)" />
          </pattern>
        </defs>

        {/* Pozadí s mřížkou */}
        <rect width="100%" height="100%" fill="url(#card-grid)" className="pointer-events-none opacity-80" />

        {/* Směrová kompasová růžice (Legendární nádech) */}
        <g transform="translate(620, 65)" className="opacity-45 pointer-events-none transition-opacity hover:opacity-85 duration-500">
          <circle r="22" fill="none" stroke="rgba(148, 163, 184, 0.25)" strokeWidth="1.5" strokeDasharray="3,3" />
          <circle r="18" fill="none" stroke="rgba(148, 163, 184, 0.15)" strokeWidth="1" />
          <line x1="0" y1="-26" x2="0" y2="26" stroke="rgba(148, 163, 184, 0.4)" strokeWidth="1" />
          <line x1="-26" y1="0" x2="26" y2="0" stroke="rgba(148, 163, 184, 0.4)" strokeWidth="1" />
          {/* Střelky kompasu */}
          <polygon points="0,-24 5,-6 0,0" fill="#f87171" />
          <polygon points="0,-24 -5,-6 0,0" fill="#ef4444" />
          <polygon points="0,24 5,6 0,0" fill="#cbd5e1" />
          <polygon points="0,24 -5,6 0,0" fill="#94a3b8" />
          <text x="0" y="-29" textAnchor="middle" className="fill-slate-400 font-sans font-black text-[9px] tracking-wider">N</text>
        </g>

        <g id="regions-group">
          {MAP_REGIONS.map((region) => {
            const isCompleted = completedRegionIds.includes(region.id);
            const isActive = activeRegionId === region.id;
            const regionInfo = REGIONS[region.id];
            const isHovered = hoveredRegion?.id === region.id;

            // Barva ohraničení a výplně regionu
            let fillClass = 'rgba(15, 23, 42, 0.75)';
            let strokeColor = 'rgba(71, 85, 105, 0.35)';
            let strokeWidth = 1.5;

            if (isActive) {
              fillClass = 'rgba(49, 46, 129, 0.85)';
              strokeColor = activePlayerColor || '#6366f1';
              strokeWidth = 3;
            } else if (isCompleted) {
              fillClass = 'rgba(6, 78, 59, 0.45)';
              strokeColor = 'rgba(52, 211, 153, 0.55)';
              strokeWidth = 2;
            } else if (isHovered) {
              fillClass = 'rgba(30, 41, 59, 0.85)';
              strokeColor = 'rgba(99, 102, 241, 0.8)';
              strokeWidth = 2.5;
            }

            return (
              <g
                key={region.id}
                className="cursor-pointer transition-all duration-350"
                onClick={() => {
                  if (gameStarted && !isCompleted) {
                    onSelectRegion(region.id);
                  }
                }}
                onMouseEnter={() => setHoveredRegion(regionInfo || null)}
                onMouseLeave={() => setHoveredRegion(null)}
              >
                {/* 3D stínový efekt pod krajem pro hloubku */}
                <path
                  d={region.path}
                  fill="rgba(0,0,0,0.4)"
                  transform="translate(1.5, 3)"
                  className="pointer-events-none transition-transform duration-300"
                />

                {/* Aktivní těleso kraje */}
                <path
                  d={region.path}
                  fill={fillClass}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  className="transition-all duration-300 ease-out"
                  style={{
                    filter: isActive
                      ? `drop-shadow(0px 0px 8px ${activePlayerColor})`
                      : isHovered
                      ? 'drop-shadow(0px 0px 6px rgba(99, 102, 241, 0.45))'
                      : 'none'
                  }}
                />

                {/* Zlaté krajské město (pulsní bod) */}
                {region.capX && region.capY && (
                  <g transform={`translate(${region.capX}, ${region.capY})`} className="pointer-events-none">
                    {/* Vnější aura pulsu */}
                    <circle
                      r={isHovered ? 7 : 5}
                      className="fill-amber-400/25 stroke-amber-300/40 stroke-[0.5px] animate-ping"
                      style={{ animationDuration: '2s' }}
                    />
                    {/* Vnitřní bod */}
                    <circle
                      r={isHovered ? 3.5 : 2.5}
                      className="fill-amber-400 stroke-slate-950 stroke-[1px] shadow-lg transition-transform duration-300"
                    />
                    {/* Plovoucí mikro text krajského sídla */}
                    {isHovered && (
                      <motion.text
                        x="7"
                        y="3"
                        initial={{ opacity: 0, x: 2 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="fill-amber-300 font-sans font-bold text-[8px] tracking-wider pointer-events-none uppercase drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.99)]"
                      >
                        {region.capName}
                      </motion.text>
                    )}
                  </g>
                )}

                {/* Region Label (zkratka kraje s elegantním pozadím/badge efektem) */}
                <g transform={`translate(${region.labelX}, ${region.labelY})`}>
                  {/* Glassmorphic podklad zkratky na hoveru */}
                  {isHovered && (
                    <rect
                      x="-18"
                      y="-12"
                      width="36"
                      height="16"
                      rx="4"
                      fill="rgba(15, 23, 42, 0.85)"
                      stroke="rgba(99, 102, 241, 0.4)"
                      strokeWidth="0.5"
                      className="pointer-events-none"
                    />
                  )}
                  <text
                    x="0"
                    y="0"
                    textAnchor="middle"
                    className={`pointer-events-none font-sans font-black tracking-tight text-[11px] select-none uppercase ${
                      isActive
                        ? 'fill-indigo-100 font-black scale-110 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]'
                        : isCompleted
                        ? 'fill-emerald-400'
                        : isHovered
                        ? 'fill-slate-100 font-black'
                        : 'fill-slate-300/80'
                    }`}
                    style={{
                      textShadow: '0px 1.5px 3px rgba(0,0,0,0.95)'
                    }}
                  >
                    {region.id === 'PHA' ? 'PHA' : regionInfo?.shortName}
                  </text>
                </g>

                {/* Kompletní / Vyřešeno ikonka zeleného puntíku */}
                {isCompleted && (
                  <g transform={`translate(${region.labelX - 7}, ${region.labelY + 6})`}>
                    <circle cx="7" cy="7" r="7" className="fill-emerald-500 stroke-slate-950 stroke-[1px]" />
                    <path
                      d="M 4 7 L 6 9 L 10 5"
                      fill="none"
                      className="stroke-slate-950 stroke-[2px]"
                    />
                  </g>
                )}
              </g>
            );
          })}
        </g>
      </svg>

      {/* Spodní info popisek při najetí myší */}
      <div className="absolute bottom-4 left-4 right-4 min-h-[55px] bg-slate-950/85 border border-slate-800/85 rounded-2xl p-2.5 px-4 flex items-start gap-3 backdrop-blur-md shadow-xl transition-all duration-300 ease-out">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-400/20 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
          <Info className="w-4 h-4" />
        </div>
        <div className="text-left w-full">
          {hoveredRegion ? (
            <>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-extrabold text-slate-100 text-sm tracking-tight">
                  {hoveredRegion.name}
                </span>
                <span className="text-[10px] bg-slate-800/80 text-amber-300 font-bold font-mono px-2 py-0.5 rounded-md border border-slate-700/50">
                  Krajské sídlo: {hoveredRegion.capital}
                </span>
                {completedRegionIds.includes(hoveredRegion.id) && (
                  <span className="text-[10px] bg-emerald-950/80 text-emerald-450 border border-emerald-500/20 font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Check className="w-3 h-3" /> ODEHRÁNO
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-1 line-clamp-1 leading-relaxed">
                {hoveredRegion.description}
              </p>
            </>
          ) : (
            <>
              <div className="font-extrabold text-slate-200 text-sm tracking-tight">
                Zvolte region pro další kolo vlastivědy
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {gameStarted
                  ? 'Klikněte na jakýkoliv neprozkoumaný kraj na mapě ČR k odemčení bodovaných otázek.'
                  : 'Napište jména badatelů a spusťte hru.'}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

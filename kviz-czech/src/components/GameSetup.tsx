import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Play, PlayCircle, HelpCircle, Swords } from 'lucide-react';

export interface PlayerSetup {
  name: string;
  color: string;
}

interface GameSetupProps {
  onStartGame: (players: PlayerSetup[], gameMode: 'quick' | 'multi') => void;
}

const PRESET_COLORS = [
  '#ef4444', // Red
  '#3b82f6', // Blue
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#8b5cf6', // Purple
  '#ec4899', // Pink
];

const CZECH_NAMES = [
  'Honza', 'Petra', 'Martin', 'Eliška', 'Karel', 'Lucie', 
  'Pavel', 'Tereza', 'Tomáš', 'Veronika', 'Jiří', 'Adéla'
];

export default function GameSetup({ onStartGame }: GameSetupProps) {
  const [playerCount, setPlayerCount] = useState<number>(3);
  const [players, setPlayers] = useState<PlayerSetup[]>([
    { name: 'Honza', color: PRESET_COLORS[0] },
    { name: 'Petra', color: PRESET_COLORS[1] },
    { name: 'Martin', color: PRESET_COLORS[2] },
    { name: '', color: PRESET_COLORS[3] },
    { name: '', color: PRESET_COLORS[4] },
    { name: '', color: PRESET_COLORS[5] },
  ]);
  const [gameMode, setGameMode] = useState<'quick' | 'multi'>('multi');

  const handlePlayerCountChange = (count: number) => {
    setPlayerCount(count);
    // Nastavit výchozí jména pro nové hráče, pokud jsou prázdná
    const updated = [...players];
    for (let i = 0; i < count; i++) {
      if (!updated[i].name) {
        // Vybereme náhodné české jméno, které ještě není použito
        const usedNames = updated.slice(0, i).map(p => p.name);
        const availableNames = CZECH_NAMES.filter(n => !usedNames.includes(n));
        const randomName = availableNames[Math.floor(Math.random() * availableNames.length)] || `Hráč ${i + 1}`;
        updated[i].name = randomName;
      }
    }
    setPlayers(updated);
  };

  const handleNameChange = (index: number, name: string) => {
    const updated = [...players];
    updated[index].name = name;
    setPlayers(updated);
  };

  const handleColorChange = (index: number, color: string) => {
    const updated = [...players];
    updated[index].color = color;
    setPlayers(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Odfiltrujeme pouze aktivní počet hráčů
    const activePlayers = players.slice(0, playerCount).map((p, idx) => ({
      name: p.name.trim() || `Hráč ${idx + 1}`,
      color: p.color
    }));
    onStartGame(activePlayers, gameMode);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-xl mx-auto bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-lg shadow-2xl relative overflow-hidden"
    >
      {/* Absolute glow design element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col items-center mb-6 relative z-10">
        <div className="w-16 h-16 bg-indigo-600/15 border border-indigo-500/30 rounded-2xl flex items-center justify-center mb-4 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.25)]">
          <PlayCircle className="w-10 h-10 animate-pulse text-indigo-400" />
        </div>
        <h2 className="text-3xl font-sans font-black tracking-tight text-white text-center uppercase">
          Poznej Česko
        </h2>
        <p className="text-xs text-slate-400 text-center mt-2 max-w-sm font-sans uppercase tracking-wider">
          Vlastivědná klanová interaktivní výzva
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        {/* POČET HRÁČŮ */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-400" /> Počet hráčů v klanu
          </label>
          <div className="grid grid-cols-5 gap-2">
            {[2, 3, 4, 5, 6].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => handlePlayerCountChange(num)}
                className={`py-3 px-4 rounded-xl font-bold font-sans text-lg border transition-all cursor-pointer ${
                  playerCount === num
                    ? 'bg-indigo-600 text-white border-indigo-505 shadow-lg shadow-indigo-500/20 scale-[1.03]'
                    : 'bg-slate-950/60 text-slate-400 border-slate-800/80 hover:text-slate-250 hover:border-slate-700'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* JMÉNA A BARVY HRÁČŮ */}
        <div className="space-y-3 bg-slate-950/50 p-4 border border-slate-800/80 rounded-2xl max-h-[280px] overflow-y-auto custom-scrollbar">
          <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase font-mono">
            Jména a barevné erby hráčů:
          </span>
          <div className="space-y-3 pt-2">
            {players.slice(0, playerCount).map((player, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: idx * 0.05 }}
                className="flex items-center gap-3 bg-slate-900/30 p-2.5 rounded-xl border border-slate-800"
              >
                {/* Označení barvy s paletou */}
                <div className="relative shrink-0">
                  <div
                    className="w-8 h-8 rounded-lg shadow-inner flex items-center justify-center font-black text-slate-950 text-sm"
                    style={{ backgroundColor: player.color }}
                  >
                    {idx + 1}
                  </div>
                  <input
                    type="color"
                    value={player.color}
                    onChange={(e) => handleColorChange(idx, e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                </div>

                {/* Input jména */}
                <input
                  type="text"
                  required
                  placeholder={`Hráč ${idx + 1}`}
                  value={player.name}
                  onChange={(e) => handleNameChange(idx, e.target.value)}
                  className="bg-transparent text-slate-200 font-sans font-bold placeholder-slate-600 focus:outline-none w-full border-b border-transparent focus:border-indigo-505/50 pb-0.5 transition"
                />

                {/* Náhodné jméno - tlačítko */}
                <button
                  type="button"
                  onClick={() => {
                    const available = CZECH_NAMES.filter(n => !players.slice(0, playerCount).map(p => p.name).includes(n));
                    const randomName = available[Math.floor(Math.random() * available.length)] || `Hráč ${idx + 1}`;
                    handleNameChange(idx, randomName);
                  }}
                  className="text-[10px] text-slate-400 hover:text-slate-200 font-mono underline shrink-0 cursor-pointer"
                >
                  Náhoda
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* HERNÍ REŽIMY */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
            Zvolit herní styl
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* MULTI REŽIM */}
            <button
              type="button"
              onClick={() => setGameMode('multi')}
              className={`p-4 rounded-xl text-left border flex gap-3 transition-all cursor-pointer ${
                gameMode === 'multi'
                  ? 'bg-indigo-950/40 text-slate-100 border-indigo-500 ring-2 ring-indigo-500/10'
                  : 'bg-slate-950/40 text-slate-400 border-slate-805 hover:border-slate-700'
              }`}
            >
              <Swords className={`w-5 h-5 shrink-0 ${gameMode === 'multi' ? 'text-indigo-400' : 'text-slate-500'}`} />
              <div>
                <div className="font-bold font-sans text-sm text-slate-200 flex items-center gap-1.5">
                  Standardní turnaj <span className="text-[9px] bg-indigo-600 text-white font-extrabold py-0.5 px-1.5 rounded uppercase tracking-wider font-mono">Doporučeno</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  V každém zvoleném kraji hrajete, dokud se <strong>nevyčerpají všechny kartičky</strong> (20 otázek). Střídáte se.
                </div>
              </div>
            </button>

            {/* QUICK REŽIM */}
            <button
              type="button"
              onClick={() => setGameMode('quick')}
              className={`p-4 rounded-xl text-left border flex gap-3 transition-all cursor-pointer ${
                gameMode === 'quick'
                  ? 'bg-indigo-950/40 text-slate-100 border-indigo-500 ring-2 ring-indigo-500/10'
                  : 'bg-slate-950/40 text-slate-400 border-slate-805 hover:border-slate-700'
              }`}
            >
              <Play className={`w-5 h-5 shrink-0 ${gameMode === 'quick' ? 'text-indigo-400' : 'text-slate-500'}`} />
              <div>
                <div className="font-bold font-sans text-sm text-slate-200">
                  Rychlá bleskovka
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Vybraný kraj vyřeší <strong>pouze aktivní hráč</strong> (1 otázka). Hra končí po 6 celkových otázkách.
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* SPUSTIT HRU */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 border border-indigo-400/20 text-white font-sans font-extrabold text-lg py-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition shadow-xl shadow-indigo-950/50 glow-btn"
        >
          <Play className="w-5 h-5 fill-white" /> Vstoupit do mapy & Losovat pořadí
        </button>
      </form>
    </motion.div>
  );
}

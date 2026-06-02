import { motion } from 'motion/react';
import { Trophy, RefreshCw, Star, BarChart3, CheckSquare, Sparkles, Map } from 'lucide-react';
import { Player } from './ScoreBoard';
import { REGIONS } from '../questions';

interface GameOverProps {
  players: Player[];
  visitedRegionIds: string[];
  onRestart: () => void;
}

export default function GameOver({ players, visitedRegionIds, onRestart }: GameOverProps) {
  // Seřadíme hráče podle skóre sestupně
  const podium = [...players].sort((a, b) => b.score - a.score);
  const winner = podium[0];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto space-y-6"
    >
      {/* VELKÝ VÍTĚZNÝ DISPLAY */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-950 border border-slate-800 rounded-3xl p-8 text-center relative overflow-hidden shadow-2xl">
        {/* Světelné pruhy na pozadí */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-36 h-36 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />

        {/* Velká animovaná trofej */}
        <motion.div
          animate={{ rotate: [0, -5, 5, -5, 5, 0], y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          className="w-20 h-20 mx-auto bg-gradient-to-tr from-yellow-500 to-amber-300 rounded-2xl flex items-center justify-center text-slate-950 shadow-xl shadow-yellow-500/10 mb-5 border border-yellow-300/30"
        >
          <Trophy className="w-10 h-10 stroke-[2px]" />
        </motion.div>

        <span className="text-[10px] font-black tracking-widest text-yellow-500 uppercase font-mono bg-yellow-950/60 border border-yellow-900 px-3 py-1 rounded-full">
          Hra dokončena • Výsledky turnaje
        </span>

        <h2 className="text-3xl md:text-4xl font-sans font-black text-white mt-4 tracking-tight leading-tight">
          Vítězem se stává:
          <span className="block text-4xl md:text-5xl font-sans text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-200 to-yellow-500 uppercase mt-2 font-black">
            {winner?.name} !
          </span>
        </h2>

        {winner && (
          <p className="text-slate-400 text-sm mt-3 max-w-md mx-auto">
            Hráč <strong style={{ color: winner.color }}>{winner.name}</strong> s přehledem ovládl herní pole se ziskem <strong>{winner.score} bodů</strong> a prokázal excelentní vlastivědné znalosti!
          </p>
        )}
      </div>

      {/* STUPNĚ VÍTĚZŮ & CELKOVÁ TABULKA */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 backdrop-blur-md">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono mb-4 flex items-center gap-1.5 justify-center">
          <BarChart3 className="w-4 h-4 text-blue-400" /> Konečné pořadí a statistiky
        </h3>

        <div className="space-y-3">
          {podium.map((player, idx) => {
            const isWinner = idx === 0;
            const accuracy = player.totalAnswers > 0 ? Math.round((player.correctAnswers / player.totalAnswers) * 100) : 0;

            return (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className={`relative flex flex-col md:flex-row md:items-center justify-between p-4 rounded-2xl border transition-all ${
                  isWinner
                    ? 'border-yellow-500/30 bg-slate-950/80 shadow-md shadow-yellow-950/10'
                    : 'border-slate-800/60 bg-slate-950/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Pozice */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-base font-mono ${
                    idx === 0 
                      ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' 
                      : idx === 1 
                      ? 'bg-slate-300/10 text-slate-300 border border-slate-300/20' 
                      : idx === 2 
                      ? 'bg-amber-700/15 text-amber-500 border border-amber-700/20' 
                      : 'bg-slate-950 text-slate-500 border border-slate-850'
                  }`}>
                    {idx === 0 ? '👑' : `${idx + 1}.`}
                  </div>

                  {/* Detaily hráče */}
                  <div>
                    <h4 className="font-extrabold font-sans text-base text-slate-100 flex items-center gap-2">
                      {player.name}
                      <span
                        className="w-2.5 h-2.5 rounded-full inline-block"
                        style={{ backgroundColor: player.color }}
                      />
                    </h4>
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mt-0.5 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <CheckSquare className="w-3.5 h-3.5" /> Úspěšnost: <strong>{accuracy}%</strong>
                      </span>
                      <span>•</span>
                      <span>Odpovědi: <strong>{player.correctAnswers} správných</strong> z {player.totalAnswers} celkově</span>
                    </div>
                  </div>
                </div>

                {/* Velké finální skóre */}
                <div className="mt-3 md:mt-0 text-left md:text-right shrink-0">
                  <span
                    className="text-2xl font-black font-sans font-mono tracking-tight"
                    style={{ color: player.color }}
                  >
                    {player.score} <span className="text-xs font-bold text-slate-600 uppercase font-mono">B</span>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* NAVŠTÍVENÉ KRAJE */}
      <div className="bg-slate-900/40 p-4 border border-slate-850 rounded-2xl">
        <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono mb-2.5 flex items-center gap-1">
          <Map className="w-3.5 h-3.5 text-slate-400" /> Navštívená herní bojiště ({visitedRegionIds.length})
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {visitedRegionIds.map((id) => {
            const reg = REGIONS[id];
            if (!reg) return null;
            return (
              <span
                key={id}
                className="text-xs bg-slate-950 border border-slate-800 text-slate-300 font-sans px-2.5 py-1 rounded-lg flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                {reg.name}
              </span>
            );
          })}
        </div>
      </div>

      {/* SPODNÍ RESTART BUTTON */}
      <button
        onClick={onRestart}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 border border-blue-400/20 text-white font-sans font-extrabold text-lg py-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition shadow-xl shadow-blue-900/30 active:translate-y-0.5 hover:scale-[1.01]"
      >
        <RefreshCw className="w-5 h-5" /> Hrát od začátku s novým nastavením
      </button>
    </motion.div>
  );
}

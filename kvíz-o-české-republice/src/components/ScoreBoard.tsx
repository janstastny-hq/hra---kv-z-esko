import { motion } from 'motion/react';
import { Trophy, HelpCircle, ArrowRight, Star, RefreshCw } from 'lucide-react';

export interface Player {
  id: string;
  name: string;
  color: string;
  score: number;
  correctAnswers: number;
  totalAnswers: number;
}

interface ScoreBoardProps {
  players: Player[];
  activePlayerId: string;
  round: number; // 1 až 6
  maxRounds: number;
  gameMode: 'quick' | 'multi';
  activeRegionName: string | null;
  onResetGame: () => void;
}

export default function ScoreBoard({
  players,
  activePlayerId,
  round,
  maxRounds,
  gameMode,
  activeRegionName,
  onResetGame
}: ScoreBoardProps) {
  // Seřadíme hráče pro určení pořadí (ale chceme je zobrazovat ve stálém pořadí s odznaky)
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  const getRankEmoji = (player: Player) => {
    const position = sortedPlayers.findIndex(p => p.id === player.id);
    if (position === 0) return '🥇';
    if (position === 1) return '🥈';
    if (position === 2) return '🥉';
    return `${position + 1}.`;
  };

  const getAccuracy = (player: Player) => {
    if (player.totalAnswers === 0) return 0;
    return Math.round((player.correctAnswers / player.totalAnswers) * 100);
  };

  const activePlayer = players.find(p => p.id === activePlayerId);

  return (
    <div className="w-full space-y-4">
      {/* INFO O STAVU HRY */}
      <div className="bg-slate-900/40 border border-slate-800 p-5 rounded-2xl backdrop-blur-md shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
            HERNÍ PROGRESS
          </span>
          <span className="text-[10px] bg-slate-800/80 text-indigo-400 font-extrabold px-2.5 py-1 rounded border border-indigo-500/20 uppercase font-mono tracking-wider">
            {gameMode === 'multi' ? 'Souboj' : 'Bleskovka'}
          </span>
        </div>

        <div className="flex items-baseline justify-between mb-1">
          <span className="text-xs text-slate-400 font-medium">Uzavřené regiony:</span>
          <p className="text-2xl font-black font-mono text-white">
            {Math.min(round, maxRounds)} <span className="text-xs text-slate-600 font-bold uppercase">/ {maxRounds}</span>
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden mt-3 border border-slate-900">
          <div
            className="bg-indigo-600 h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]"
            style={{ width: `${(Math.min(round, maxRounds) / maxRounds) * 100}%` }}
          />
        </div>

        {activeRegionName && (
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2 text-xs text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 pulse-glow shrink-0" />
            <span className="font-sans">Lokalita boje: <strong className="text-indigo-400 font-extrabold uppercase">{activeRegionName}</strong></span>
          </div>
        )}
      </div>

      {/* ŽEBŘÍČEK HRÁČŮ */}
      <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-5 flex flex-col gap-3 backdrop-blur-sm">
        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono mb-1">
          Klanový žebříček skóre
        </h3>

        <div className="space-y-3">
          {players.map((player) => {
            const isActive = player.id === activePlayerId;
            const rank = getRankEmoji(player);
            const accuracy = getAccuracy(player);

            return (
              <motion.div
                key={player.id}
                className={`relative flex flex-col p-4 rounded-xl border transition-all ${
                  isActive
                    ? 'bg-indigo-950/45 border-indigo-500/50 shadow-[0_0_20px_rgba(79,70,229,0.15)] animate-pulse-glow'
                    : 'bg-slate-800/25 border-slate-800/80 opacity-75 hover:opacity-90'
                }`}
                animate={isActive ? { scale: [1, 1.01, 1] } : {}}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              >
                {/* Horní řádek: Pořadí, jméno, status */}
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-400 font-mono">
                      {rank}
                    </span>
                    <div
                      className="w-2.5 h-2.5 rounded-full shrink-0 border border-slate-950 shadow-sm"
                      style={{ backgroundColor: player.color }}
                    />
                    <span className={`font-sans font-extrabold text-sm tracking-tight ${isActive ? 'text-white' : 'text-slate-300'}`}>
                      {player.name}
                    </span>
                  </div>

                  {isActive ? (
                    <span className="text-[9px] font-black tracking-widest text-indigo-400 uppercase flex items-center gap-1 bg-indigo-950/85 border border-indigo-500/30 px-2 py-0.5 rounded-full font-sans">
                      <span className="w-1 h-1 rounded-full bg-indigo-400 animate-ping" /> NA TAHU
                    </span>
                  ) : (
                    <span className="text-[9px] font-bold tracking-widest text-slate-500 uppercase font-sans">
                      Čeká
                    </span>
                  )}
                </div>

                {/* Spodní část s velkým skóre */}
                <div className="flex items-end justify-between mt-1">
                  <div className="flex items-center gap-2.5 text-[10px] text-slate-500 font-mono">
                    <span>Přesnost: <strong className="text-slate-400">{accuracy}%</strong></span>
                    <span>•</span>
                    <span>{player.correctAnswers}/{player.totalAnswers} tref</span>
                  </div>
                  
                  <div className="text-3xl font-black font-mono tracking-tight" style={{ color: player.color, textShadow: isActive ? `0 0 15px ${player.color}25` : 'none' }}>
                    {player.score} <span className="text-xs text-slate-500 uppercase">pts</span>
                  </div>
                </div>

                {/* Blikající indikátor po stranách */}
                {isActive && (
                  <div
                    className="absolute right-3 top-3 w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: player.color, boxShadow: `0 0 8px ${player.color}` }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* PANEL AKTIVNÍHO TAHU */}
      {activePlayer && (
        <div className="p-4 bg-slate-950/40 border border-slate-850 rounded-2xl flex flex-col items-center text-center">
          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest font-mono">
            Hráč na řadě:
          </span>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: activePlayer.color }} />
            <h4 className="text-lg font-black font-sans text-slate-100 uppercase">
              {activePlayer.name}
            </h4>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-[200px]">
            {activeRegionName 
              ? 'Vyber si otázku, na kterou odpovíš.' 
              : 'Vyber kraj na mapě k aktivaci herního kola!'}
          </p>
        </div>
      )}

      {/* RESTART TLAČÍTKO */}
      <button
        onClick={() => {
          if (confirm('Opravdu chcete restartovat celou hru? Dosavadní skóre bude smazáno.')) {
            onResetGame();
          }
        }}
        className="w-full py-2 px-3 border border-slate-800 hover:border-red-800/40 hover:bg-red-950/10 text-xs text-slate-500 hover:text-red-400 font-sans font-semibold rounded-xl flex items-center justify-center gap-1 cursor-pointer transition"
      >
        <RefreshCw className="w-3.5 h-3.5" /> Restartovat relaci hry
      </button>
    </div>
  );
}

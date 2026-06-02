import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  MapPin, 
  Info, 
  User, 
  Flag, 
  BookOpen, 
  AlertCircle,
  PlayCircle
} from 'lucide-react';

import GameSetup, { PlayerSetup } from './components/GameSetup';
import ScoreBoard, { Player } from './components/ScoreBoard';
import CzechMap from './components/CzechMap';
import TriviaBoard from './components/TriviaBoard';
import GameOverProps from './components/GameOver';

import { getQuestionsForRegion, REGIONS, Question } from './questions';

export default function App() {
  // Stav hrací fáze
  const [gameStage, setGameStage] = useState<'setup' | 'playing' | 'gameover'>('setup');
  
  // Herní nastavení
  const [gameMode, setGameMode] = useState<'quick' | 'multi'>('multi');
  const [players, setPlayers] = useState<Player[]>([]);
  const [activePlayerIndex, setActivePlayerIndex] = useState<number>(0);
  
  // Stav postupu hrou
  const [round, setRound] = useState<number>(0); // Počet odehraných krajů (končí po 6)
  const MAX_ROUNDS = 6;
  const [visitedRegionIds, setVisitedRegionIds] = useState<string[]>([]);
  const [activeRegionId, setActiveRegionId] = useState<string | null>(null);
  const [playedInActiveRegionCount, setPlayedInActiveRegionCount] = useState<number>(0); // Kolik hráčů už hrálo v tomto kraji
  const [pickerNotification, setPickerNotification] = useState<string | null>(null);

  // Globální seznam již zodpovězených otázek v této hře (IDS typu regionId_points_index)
  const [answeredQuestionIds, setAnsweredQuestionIds] = useState<string[]>([]);

  // Aktuálně vygenerované stabilní otázky pro vybraný kraj
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);

  // Přehrání zvuku / haptické zpětné vazby (lze simulovat nebo využít Audio API pokud o to uživatel požádá)
  const playSoundEffect = (type: 'success' | 'fail' | 'click' | 'victory') => {
    try {
      const frequencies = {
        success: [523.25, 659.25, 783.99], // C Major chord
        fail: [220, 196], // Sad slide down
        click: [440], // Blip
        victory: [523.25, 659.25, 783.99, 1046.50] // Gold chord
      };
      
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const now = ctx.currentTime;
      
      const freqs = frequencies[type];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = type === 'fail' ? 'sawtooth' : 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);
        
        gain.gain.setValueAtTime(0.15, now + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.1 + 0.2);
        
        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 0.25);
      });
    } catch (e) {
      // Ignorovat, pokud prohlížeč blokuje audio před interakcí
    }
  };

  // Inicializace hry (Klik z nastavení)
  const handleStartGame = (setupPlayers: PlayerSetup[], selectedMode: 'quick' | 'multi') => {
    // Náhodně vylosujeme počáteční pořadí hráčů
    const shuffled = [...setupPlayers]
      .map((p, idx) => ({ ...p, sortKey: Math.random(), id: `p_${idx}` }))
      .sort((a, b) => a.sortKey - b.sortKey)
      .map((p, idx) => ({
        id: p.id,
        name: p.name,
        color: p.color,
        score: 0,
        correctAnswers: 0,
        totalAnswers: 0
      }));

    playSoundEffect('victory');

    setPlayers(shuffled);
    setGameMode(selectedMode);
    setGameStage('playing');
    setActivePlayerIndex(0);
    setRound(0);
    setVisitedRegionIds([]);
    setActiveRegionId(null);
    setPlayedInActiveRegionCount(0);
    setAnsweredQuestionIds([]);
    setPickerNotification(null);
    setCurrentQuestions([]);
  };

  // Volba kraje z mapy
  const handleSelectRegion = (regionId: string) => {
    if (visitedRegionIds.includes(regionId)) return; // Již odehraný kraj
    
    playSoundEffect('click');
    setActiveRegionId(regionId);
    setPlayedInActiveRegionCount(0);

    // Vygenerujeme novou sadu unikátních otázek pro vybraný kraj v tomto herním sezení
    const targetQuestions = getQuestionsForRegion(regionId);
    setCurrentQuestions(targetQuestions);
  };

  // Zodpovězení otázky
  const handleQuestionAnswered = (question: Question, isCorrect: boolean, playerId: string) => {
    // 1. Aktualizace statistik a bodů daného hráče
    setPlayers(prevPlayers => prevPlayers.map(p => {
      if (p.id === playerId) {
        return {
          ...p,
          score: isCorrect ? p.score + question.points : p.score - Math.floor(question.points / 2),
          correctAnswers: isCorrect ? p.correctAnswers + 1 : p.correctAnswers,
          totalAnswers: p.totalAnswers + 1
        };
      }
      return p;
    }));

    // 2. Přidání otázky do globálního registru vyřešených
    const newAnsweredIds = [...answeredQuestionIds, question.id];
    setAnsweredQuestionIds(newAnsweredIds);

    // Zvuková zpětná vazba
    playSoundEffect(isCorrect ? 'success' : 'fail');

    // 3. Řízení střídání tahů
    if (gameMode === 'quick') {
      // QUICK: Kraj se okamžitě uzavře po 1 otázce. Tah přechází na dalšího hráče na mapě.
      const nextVisited = [...visitedRegionIds, activeRegionId!];
      setVisitedRegionIds(nextVisited);
      setActiveRegionId(null);
      
      const nextRound = round + 1;
      setRound(nextRound);

      if (nextRound >= MAX_ROUNDS) {
        playSoundEffect('victory');
        setGameStage('gameover');
      } else {
        // Určíme, kdo bude vybírat další kraj
        let nextPickerIndex = 0;
        if (nextRound < players.length) {
          nextPickerIndex = nextRound;
          setPickerNotification(null);
        } else {
          // Náhodný výběr hráče
          nextPickerIndex = Math.floor(Math.random() * players.length);
          setPickerNotification(`Systém náhodně vylosoval hráče ${players[nextPickerIndex].name}, aby vybral další kraj!`);
        }
        setActivePlayerIndex(nextPickerIndex);
      }
    } else {
      // MULTI (SOUBOJ): Hrajeme, dokud se nevyčerpají všechny kartičky v kraji (20 otázek)!
      const answeredInThisRegion = currentQuestions.filter(q => newAnsweredIds.includes(q.id));

      if (answeredInThisRegion.length >= currentQuestions.length) {
        // VŠECHNY kartičky v tomto kraji jsou vyčerpány! Kraj se uzavírá.
        const nextVisited = [...visitedRegionIds, activeRegionId!];
        setVisitedRegionIds(nextVisited);
        setActiveRegionId(null);
        setPlayedInActiveRegionCount(0);
        
        const nextRound = round + 1;
        setRound(nextRound);

        if (nextRound >= MAX_ROUNDS) {
          playSoundEffect('victory');
          setGameStage('gameover');
        } else {
          // Stanovení hráče pro výběr kraje ve spravedlivém nebo náhodném pořadí dle požadavku:
          // "Pokud bude například 4 hráčů, tak si každý z nich vybere svůj kraj a poté ty zbylé 2 by systém vybral náhodně hráče, který je vybere"
          let nextPickerIndex = 0;
          if (nextRound < players.length) {
            nextPickerIndex = nextRound;
            setPickerNotification(null);
          } else {
            // Náhodný výběr hráče, protože je počet odehraných krajů větší než počet hráčů
            nextPickerIndex = Math.floor(Math.random() * players.length);
            setPickerNotification(`Systém náhodně vylosoval hráče ${players[nextPickerIndex].name}, aby vybral další kraj!`);
          }
          setActivePlayerIndex(nextPickerIndex);
        }
      } else {
        // Ještě zbývají otázky v kraji - rotujeme odpovědi mezi hráči
        setActivePlayerIndex((activePlayerIndex + 1) % players.length);
        setPlayedInActiveRegionCount(prev => prev + 1);
      }
    }
  };

  // Uživatel klikne zpět / odejde z kraje bez dohrání (Moderátorská zpátečka)
  const handleExitRegion = () => {
    setActiveRegionId(null);
    setPlayedInActiveRegionCount(0);
  };

  // Reset/Restart hry do úvodního nastavení
  const handleResetGame = () => {
    setGameStage('setup');
    setPlayers([]);
    setActivePlayerIndex(0);
    setRound(0);
    setVisitedRegionIds([]);
    setActiveRegionId(null);
    setPlayedInActiveRegionCount(0);
    setAnsweredQuestionIds([]);
    setPickerNotification(null);
  };

  const activePlayer = players[activePlayerIndex];
  const activeRegionInfo = activeRegionId ? REGIONS[activeRegionId] : null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-500/30 selection:text-blue-100 custom-scrollbar">
      
      {/* GLOWING AMBIENT EMBERS (Aesthetic design upgrade) */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-indigo-900/10 rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* HLAVIČKA A BRANDING */}
      <header className="border-b border-slate-850/80 bg-slate-900/85 backdrop-blur-md sticky top-0 z-40 px-4 py-3 md:px-8 h-auto min-h-20 flex items-center">
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 py-1">
          {/* Logo & Category */}
          <div className="flex items-center gap-3.5 self-start md:self-auto">
            <div className="w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-[0_0_15px_rgba(79,70,229,0.55)] border border-indigo-400/20 shrink-0">
              CZ
            </div>
            <div>
              <h1 className="font-sans font-black text-lg md:text-xl tracking-tight text-white uppercase leading-none">
                Poznej Česko
              </h1>
              <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase block mt-1">
                KATEGORIE: GEOGRAFIE & HISTORIE & PAMÁTKY
              </span>
            </div>
          </div>

          {/* Sled-like status pill in center */}
          {gameStage === 'playing' ? (
            <div className="bg-slate-800/40 px-5 py-2 rounded-full border border-slate-700/60 backdrop-blur-md flex items-center gap-2.5 shadow-sm text-sm">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-medium font-sans">Kraj:</span>
              <span className="font-extrabold text-indigo-400 uppercase tracking-tight font-sans">
                {activeRegionInfo ? `${activeRegionInfo.name}` : 'Mapa republiky'}
              </span>
              <span className="text-slate-600 font-sans">•</span>
              <span className="font-bold text-slate-300 font-mono">
                ({round + 1}/6)
              </span>
            </div>
          ) : (
            <div className="bg-slate-800/30 px-5 py-2 rounded-full border border-slate-700/30 text-xs text-slate-400 font-sans tracking-wide">
              Vlastivědná interaktivní výzva
            </div>
          )}

          {/* Turn stats / active player indicator */}
          {gameStage === 'playing' && activePlayer ? (
            <div className="flex gap-4 md:gap-6 items-center self-end md:self-auto">
              <div className="text-right">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Zodpovězeno</p>
                <p className="text-sm md:text-base font-extrabold font-mono text-slate-200">
                  {answeredQuestionIds.length} <span className="text-[11px] text-slate-500">otázek</span>
                </p>
              </div>
              <div className="w-px h-8 bg-slate-800"></div>
              <div className="text-right">
                <p className="text-[10px] text-indigo-400 uppercase font-black tracking-wider">Na tahu je:</p>
                <p 
                  className="text-base md:text-lg font-black tracking-tight uppercase"
                  style={{ color: activePlayer.color, textShadow: `0 0 10px ${activePlayer.color}20` }}
                >
                  {activePlayer.name}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-[10px] bg-slate-900 border border-slate-800 text-slate-400 font-mono px-2 py-0.5 rounded flex items-center gap-1.5 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> VERZE 2026
              </span>
            </div>
          )}
        </div>
      </header>

      {/* HLAVNÍ OBSAH */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 md:py-10 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {/* FÁZE 1: SETUP NASTAVENÍ */}
          {gameStage === 'setup' && (
            <GameSetup onStartGame={handleStartGame} />
          )}

          {/* FÁZE 2: AKTIVNÍ HRANÍ */}
          {gameStage === 'playing' && (
            <motion.div
              key="playing-stage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
            >
              {/* Levé křídlo: Žebříček, Stav kola (4 sloupce na velké obrazovce) */}
              <div className="lg:col-span-4 space-y-4">
                <ScoreBoard
                  players={players}
                  activePlayerId={activePlayer.id}
                  round={round}
                  maxRounds={MAX_ROUNDS}
                  gameMode={gameMode}
                  activeRegionName={activeRegionInfo ? activeRegionInfo.name : null}
                  onResetGame={handleResetGame}
                />
              </div>

              {/* Pravé křídlo: Mapa republiky / Jeopardy deska (8 sloupců) */}
              <div className="lg:col-span-8">
                {activeRegionId && activeRegionInfo ? (
                  /* JSME V INTERIÉRU KRAJE - HRÁČI RESPONDÍ TRIVII */
                  <TriviaBoard
                    region={activeRegionInfo}
                    questions={currentQuestions}
                    answeredQuestionIds={answeredQuestionIds}
                    activePlayer={activePlayer}
                    players={players}
                    gameMode={gameMode}
                    playedInActiveRegionCount={playedInActiveRegionCount}
                    onQuestionAnswered={handleQuestionAnswered}
                    onExitRegion={handleExitRegion}
                  />
                ) : (
                  /* HLAVNÍ OBRAZOVKA S MAPOU ČESKÉ REPUBLIKY */
                  <div className="space-y-4">
                    {/* Instruktážní banner k mapě */}
                    <div className="bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-950/20 border border-slate-800 p-5 rounded-2xl flex items-start gap-3.5 text-left">
                      <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-200">
                          Tah {round + 1} z {MAX_ROUNDS}: Zvolte krajské bojiště!
                        </h4>
                        <p className="text-xs text-slate-400 mt-1 leading-normal">
                          Hráč <strong style={{ color: activePlayer.color }}>{activePlayer.name}</strong> vybírá na interaktivní mapě neprozkoumaný kraj. Odemknou se tím otázky v hodnotě 1, 2, 5 a 10 bodů.
                        </p>
                      </div>
                    </div>

                    {pickerNotification && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-amber-950/40 border border-amber-900/60 p-4 rounded-2xl flex items-center gap-3 text-left shadow-lg"
                      >
                        <span className="text-xl shrink-0">🎲</span>
                        <p className="text-xs text-amber-300 font-extrabold font-sans uppercase tracking-wider">
                          {pickerNotification}
                        </p>
                      </motion.div>
                    )}

                    <CzechMap
                      completedRegionIds={visitedRegionIds}
                      activeRegionId={activeRegionId}
                      onSelectRegion={handleSelectRegion}
                      gameStarted={true}
                      activePlayerColor={activePlayer.color}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* FÁZE 3: KONEC HRY */}
          {gameStage === 'gameover' && (
            <GameOverProps
              players={players}
              visitedRegionIds={visitedRegionIds}
              onRestart={handleResetGame}
            />
          )}
        </AnimatePresence>
      </main>

      {/* SPOLEČNÉ ELEMENTY V PATIČCE */}
      <footer className="border-t border-slate-900/60 py-6 text-center text-xs text-slate-600">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <span>
            © 2026 Znalostní Česko. Vyrobeno jako edukativní klenot o České republice.
          </span>
          <div className="flex gap-4">
            <span className="hover:text-slate-400 cursor-help flex items-center gap-0.5">
              <BookOpen className="w-3.5 h-3.5" /> Informační databáze: 14 krajů
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

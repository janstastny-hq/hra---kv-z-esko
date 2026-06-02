import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  Crown, 
  Building2, 
  Sparkles, 
  CheckCircle, 
  XCircle, 
  Award, 
  User, 
  ArrowRight,
  ChevronLeft,
  Settings
} from 'lucide-react';
import { Question, RegionInfo } from '../questions';
import { Player } from './ScoreBoard';

interface TriviaBoardProps {
  region: RegionInfo;
  questions: Question[];
  answeredQuestionIds: string[];
  activePlayer: Player;
  players: Player[];
  gameMode: 'quick' | 'multi';
  playedInActiveRegionCount: number; // Počet hráčů, co už odehráli v tomto kraji
  onQuestionAnswered: (question: Question, isCorrect: boolean, playerId: string) => void;
  onExitRegion: () => void;
}

export default function TriviaBoard({
  region,
  questions,
  answeredQuestionIds,
  activePlayer,
  players,
  gameMode,
  playedInActiveRegionCount,
  onQuestionAnswered,
  onExitRegion
}: TriviaBoardProps) {
  // Výpočet zbývajících kartiček v tomto kraji
  const remainingInThisRegionCount = questions.filter(q => !answeredQuestionIds.includes(q.id)).length;

  // Stav pro vybranou otázku na zodpovězení
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  
  // Stav odpovědi na vybranou otázku
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [isAnsweredCorrectly, setIsAnsweredCorrectly] = useState<boolean | null>(null);
  const [overriddenDecision, setOverriddenDecision] = useState<boolean | null>(null);

  // Ikona podle kategorie
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Geografie & Příroda':
        return <Compass className="w-4 h-4 text-emerald-400" />;
      case 'Historie & Osobnosti':
        return <Crown className="w-4 h-4 text-purple-400" />;
      case 'Památky & Města':
        return <Building2 className="w-4 h-4 text-rose-400" />;
      case 'Zajímavosti & Rekordy':
        return <Sparkles className="w-4 h-4 text-amber-400" />;
      default:
        return <Compass className="w-4 h-4 text-blue-400" />;
    }
  };

  // Rozřazení otázek podle bodů (1, 2, 5, 10)
  const groupedQuestions = {
    1: questions.filter(q => q.points === 1),
    2: questions.filter(q => q.points === 2),
    5: questions.filter(q => q.points === 5),
    10: questions.filter(q => q.points === 10),
  };

  // Výběr karty otázky
  const handleSelectQuestion = (q: Question) => {
    if (answeredQuestionIds.includes(q.id)) return;
    setSelectedQuestion(q);
    setUserAnswer(null);
    setIsAnsweredCorrectly(null);
    setOverriddenDecision(null);
  };

  // Kliknutí na volitelnou odpověď
  const handleAnswerSelect = (option: string) => {
    if (userAnswer !== null) return; // Již odpovězeno
    
    setUserAnswer(option);
    const correct = option === selectedQuestion?.answer;
    setIsAnsweredCorrectly(correct);
  };

  // Dokončení kola / potvrzení bodů
  const handleConfirmAnswer = () => {
    if (!selectedQuestion) return;

    // Pokud došlo k moderátorskému přepsání, použijeme to, jinak původní výsledek
    const finalResult = overriddenDecision !== null ? overriddenDecision : !!isAnsweredCorrectly;

    onQuestionAnswered(selectedQuestion, finalResult, activePlayer.id);
    setSelectedQuestion(null);
  };

  // Určení kolik lidí ještě zbývá v tomto kraji
  const remainingPlayersCount = players.length - playedInActiveRegionCount;

  return (
    <div className="w-full space-y-6">
      {/* VELKÝ BANNER KRAJE */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl">
        <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
          <Award className="w-48 h-48 text-blue-400" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="text-left">
            <button
              onClick={() => {
                if (answeredQuestionIds.length === 0 || confirm('Opravdu chcete opustit kraj? Žádný z hráčů nezíská body z tohoto kola.')) {
                  onExitRegion();
                }
              }}
              className="text-xs text-slate-400 hover:text-slate-200 font-sans font-bold flex items-center gap-1 mb-2.5 bg-slate-950 py-1.5 px-3 rounded-lg border border-slate-800 cursor-pointer transition-all hover:border-slate-700"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Zpět na mapu ČR
            </button>
            <h2 className="text-3xl font-sans font-black tracking-tight text-white flex flex-wrap items-center gap-2">
              {region.name}
              <span className="text-xs bg-indigo-950 text-indigo-400 border border-indigo-900/60 font-mono font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                Zbývá {remainingInThisRegionCount} {remainingInThisRegionCount === 1 ? 'kartička' : remainingInThisRegionCount > 1 && remainingInThisRegionCount < 5 ? 'kartičky' : 'kartiček'}
              </span>
            </h2>
            <p className="text-xs text-slate-400 max-w-2xl mt-1.5 font-sans leading-relaxed uppercase tracking-wider">
              {region.description}
            </p>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-2xl md:text-right flex flex-col md:items-end justify-center">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest font-mono">
              Právě odpovídá:
            </span>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-3.5 h-3.5 rounded-full shrink-0 border border-slate-950 shadow" style={{ backgroundColor: activePlayer.color }} />
              <span className="text-lg font-black font-sans text-slate-100 uppercase tracking-tight">
                {activePlayer.name}
              </span>
            </div>
            {gameMode === 'multi' && (
              <span className="text-[10px] text-slate-400 mt-1 font-mono">
                Kolo kraje: <strong className="text-indigo-400">{playedInActiveRegionCount + 1}. hráč</strong> z {players.length} v herním pořadí.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* JEOPARDY DESKA S OTÁZKAMI */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {([1, 2, 5, 10] as const).map((points) => (
          <div key={points} className="space-y-3">
            {/* Hlavička sloupce s body */}
            <div className="bg-slate-950/60 border border-slate-800/60 py-2.5 px-3 rounded-xl text-center shadow-md">
              <span className="font-extrabold font-sans text-xs uppercase tracking-widest text-slate-300 flex items-center justify-center gap-1.5 font-mono">
                <span className="text-yellow-500">★</span> {points} {points === 1 ? 'Bod' : points === 2 || points === 5 ? 'Body' : 'Bodů'}
              </span>
            </div>

            {/* Kartičky otázek pod danými body */}
            <div className="space-y-2.5">
              {groupedQuestions[points].map((q, index) => {
                const isSpent = answeredQuestionIds.includes(q.id);
                return (
                  <motion.button
                    key={q.id}
                    disabled={isSpent}
                    onClick={() => handleSelectQuestion(q)}
                    whileHover={!isSpent ? { scale: 1.025, y: -2 } : {}}
                    whileTap={!isSpent ? { scale: 0.98 } : {}}
                    className={`w-full p-4 rounded-xl border flex flex-col items-center justify-center text-center relative transition-all min-h-[96px] cursor-pointer ${
                      isSpent
                        ? 'bg-slate-950/20 text-slate-700 border-slate-950/30 line-through opacity-30 cursor-not-allowed'
                        : 'bg-slate-900/40 hover:bg-indigo-950/20 border-slate-800 hover:border-indigo-500/40 hover:shadow-[0_0_15px_rgba(99,102,241,0.08)]'
                    }`}
                  >
                    {/* Ikona kategorie v rohu kartičky */}
                    {!isSpent && (
                      <div className="absolute top-2 right-2 opacity-60">
                        {getCategoryIcon(q.category)}
                      </div>
                    )}

                    {/* Vnitřek kartičky */}
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest font-mono">
                      Karta {index + 1}
                    </span>
                    <span className={`text-[10px] uppercase font-bold tracking-wider mt-0.5 max-w-[80%] truncate ${isSpent ? 'text-slate-700' : 'text-slate-400'}`}>
                      {q.category.split(' ')[0]}
                    </span>

                    {/* Zvýraznění, že je karta ještě dostupná */}
                    {!isSpent && (
                      <span className="absolute bottom-2 font-mono text-[9px] text-indigo-400 font-bold uppercase tracking-widest bg-indigo-950/60 border border-indigo-900/40 px-1.5 py-0.2 rounded mt-2">
                        Otevřít
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* VELKÝ INTERAKTIVNÍ POPUP PRO ODPOVĚĎ */}
      <AnimatePresence>
        {selectedQuestion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -15 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="w-full max-w-2xl bg-slate-900/95 border border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(99,102,241,0.18)] relative overflow-hidden"
            >
              {/* Kategorie a bodová hodnota */}
              <div className="flex justify-between items-center mb-6">
                <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                  {getCategoryIcon(selectedQuestion.category)}
                  {selectedQuestion.category}
                </span>
                <span className="text-xs bg-indigo-950 text-indigo-400 border border-indigo-500/40 font-black px-3 py-1 rounded-full font-mono uppercase tracking-wide">
                  ★ HRAJE SE O {selectedQuestion.points} {selectedQuestion.points === 1 ? 'BOD' : selectedQuestion.points === 2 || selectedQuestion.points === 5 ? 'BODY' : 'BODŮ'}
                </span>
              </div>

              {/* Informace pro kterého hráče otázka je */}
              <div className="flex items-center gap-2 mb-4 bg-slate-950/60 p-2 px-3 rounded-xl border border-slate-800/40 w-fit">
                <User className="w-4 h-4" style={{ color: activePlayer.color }} />
                <span className="text-xs text-slate-400">
                  Otázku zodpovídá hráč: <span className="font-bold" style={{ color: activePlayer.color }}>{activePlayer.name}</span>
                </span>
              </div>

              {/* Tělo otázky */}
              <h3 className="text-xl md:text-2xl font-bold font-sans text-slate-100 leading-snug tracking-tight mb-8">
                {selectedQuestion.question}
              </h3>

              {/* Tlačítka s odpověďmi */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {selectedQuestion.options.map((option) => {
                  const isSelected = userAnswer === option;
                  const isCorrectAnswer = option === selectedQuestion.answer;
                  
                  let btnStyle = 'bg-slate-950/50 text-slate-300 border-slate-850 hover:bg-slate-800 hover:text-white hover:border-slate-700';
                  
                  if (userAnswer !== null) {
                    if (isCorrectAnswer) {
                      // Správná možnost svítí zeleně
                      btnStyle = 'bg-emerald-900/35 text-emerald-300 border-emerald-500 font-bold ring-2 ring-emerald-500/20';
                    } else if (isSelected) {
                      // Špatně vybraná možnost je červená
                      btnStyle = 'bg-red-900/35 text-red-350 border-red-500 ring-2 ring-red-550/20 font-medium';
                    } else {
                      // Ostatní nevybrané možnosti zhasnou
                      btnStyle = 'bg-slate-950/20 text-slate-650 border-slate-950 opacity-35';
                    }
                  }

                  return (
                    <button
                      key={option}
                      disabled={userAnswer !== null}
                      onClick={() => handleAnswerSelect(option)}
                      className={`p-4 rounded-xl text-left border text-xs font-bold font-sans tracking-wide transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                    >
                      <span>{option}</span>
                      {userAnswer !== null && isCorrectAnswer && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 ml-2 animate-bounce" />}
                      {userAnswer !== null && isSelected && !isCorrectAnswer && <XCircle className="w-4 h-4 text-red-400 shrink-0 ml-2 animate-shake" />}
                    </button>
                  );
                })}
              </div>

              {/* STAVOVÁ VÝZVA / ODPOVĚĎ */}
              {userAnswer !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl mb-6 border text-left flex gap-3 ${
                    isAnsweredCorrectly
                      ? 'bg-emerald-950/40 border-emerald-900/60'
                      : 'bg-red-950/40 border-red-900/60'
                  }`}
                >
                  <div className="mt-0.5">
                    {isAnsweredCorrectly ? (
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                  <div className="text-xs">
                    <h5 className={`font-bold uppercase ${isAnsweredCorrectly ? 'text-emerald-400' : 'text-red-400'}`}>
                      {isAnsweredCorrectly ? 'Vynikající! To je správná odpověď.' : 'Bohužel, toto není správná odpověď.'}
                    </h5>
                    <p className="text-slate-400 mt-1">
                      {isAnsweredCorrectly 
                        ? `Připisujeme hráči ${activePlayer.name} zasloužené body (${selectedQuestion.points} B) do celkové tabulky.`
                        : `Správná odpověď byla: "${selectedQuestion.answer}". Nezoufejte, příště to zaručeně vyjde!`}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* MODERÁTORSKÉ PŘEPSÁNÍ - GORGEOUS Party Game mechanism */}
              {userAnswer !== null && (
                <div className="p-3 bg-slate-950/80 border border-slate-850 rounded-xl mb-6 flex flex-col md:flex-row md:items-center justify-between gap-3 text-left">
                  <div className="flex items-center gap-2">
                    <Settings className="w-3.5 h-3.5 text-slate-500 shrink-0 animate-spin" style={{ animationDuration: '6s' }} />
                    <div className="text-[10px] text-slate-500 leading-normal">
                      <span className="font-bold text-slate-400 block">Moderátorská korekce</span>
                      Spoluhráči mohou ručně uznat nebo odebrat body (např. překlep, uznaná snaha).
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setOverriddenDecision(true)}
                      className={`text-[10px] px-2.5 py-1.5 rounded font-bold transition whitespace-nowrap cursor-pointer ${
                        overriddenDecision === true
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-900 hover:bg-slate-800 text-emerald-400'
                      }`}
                    >
                      Uznat body (+)
                    </button>
                    <button
                      type="button"
                      onClick={() => setOverriddenDecision(false)}
                      className={`text-[10px] px-2.5 py-1.5 rounded font-bold transition whitespace-nowrap cursor-pointer ${
                        overriddenDecision === false
                          ? 'bg-red-600 text-white'
                          : 'bg-slate-900 hover:bg-slate-800 text-red-400'
                      }`}
                    >
                      Sebrat body (-)
                    </button>
                    {overriddenDecision !== null && (
                      <button
                        type="button"
                        onClick={() => setOverriddenDecision(null)}
                        className="text-[9px] text-slate-500 underline ml-1 font-mono"
                      >
                        Zpět
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* TLAČÍTKO POTVRZENÍ KOLA */}
              <div className="flex justify-end pt-3">
                {userAnswer === null ? (
                  <button
                    onClick={() => setSelectedQuestion(null)}
                    className="py-2.5 px-4 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-200 hover:bg-slate-800 cursor-pointer transition border border-transparent hover:border-slate-800"
                  >
                    Zavřít & Vybrat jinou kartu
                  </button>
                ) : (
                  <button
                    onClick={handleConfirmAnswer}
                    className="bg-indigo-600 hover:bg-indigo-500 border border-indigo-400/20 text-white font-sans font-extrabold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl flex items-center gap-2 cursor-pointer shadow-lg shadow-indigo-950/40 transition hover:scale-[1.01] glow-btn"
                  >
                    Uložit & pokračovat <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

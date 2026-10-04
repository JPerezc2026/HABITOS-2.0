import React, { useState, useEffect, useRef } from 'react';
import { ENARM_SPECIALTIES, ENARM_QUESTIONS, NucleoStorage } from '../lib/storage';
import { ENARMQuestion } from '../types';
import { Dices, Timer, Award, CheckCircle2, XCircle, BookOpen, Sparkles, RefreshCw, Zap } from 'lucide-react';

interface EnarmRouletteViewProps {
  onXpGained: (amount: number) => void;
}

export const EnarmRouletteView: React.FC<EnarmRouletteViewProps> = ({ onXpGained }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [activeQuestion, setActiveQuestion] = useState<ENARMQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timerSeconds, setTimerSeconds] = useState(90);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);

  // Stats
  const [answeredCount, setAnsweredCount] = useState(14);
  const [correctCount, setCorrectCount] = useState(11);

  // Timer countdown
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0 && selectedAnswer === null) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && selectedAnswer === null) {
      // Time is up
      setSelectedAnswer(-1); // Marked as expired
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds, selectedAnswer]);

  const spinRoulette = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSelectedAnswer(null);
    setActiveQuestion(null);
    setSelectedSpecialty(null);

    // Random rotations + landing angle
    const extraSpins = 5 + Math.floor(Math.random() * 4);
    const randomDegree = Math.floor(Math.random() * 360);
    const newRotation = wheelRotation + extraSpins * 360 + randomDegree;
    setWheelRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      // Select specialty based on weight or random
      const randIdx = Math.floor(Math.random() * ENARM_SPECIALTIES.length);
      const specialty = ENARM_SPECIALTIES[randIdx];
      setSelectedSpecialty(specialty.name);

      // Pull corresponding clinical question
      const candidates = ENARM_QUESTIONS.filter((q) => q.specialtyId === specialty.id);
      const question = candidates.length > 0
        ? candidates[Math.floor(Math.random() * candidates.length)]
        : ENARM_QUESTIONS[Math.floor(Math.random() * ENARM_QUESTIONS.length)];

      setActiveQuestion(question);
      setTimerSeconds(90);
      setIsTimerRunning(true);
    }, 2800);
  };

  const handleSelectOption = (idx: number) => {
    if (selectedAnswer !== null || !activeQuestion) return;
    setSelectedAnswer(idx);
    setIsTimerRunning(false);

    setAnsweredCount((c) => c + 1);
    if (idx === activeQuestion.correctIndex) {
      setCorrectCount((c) => c + 1);
      onXpGained(50);
      NucleoStorage.addXp(50);
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#163a5d] gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <Dices className="w-5 h-5 text-[#f1b84b]" />
            <h1 className="font-mono text-lg font-bold text-white tracking-wider">
              CONSOLA ENARM // RULETA TÁCTICA PONDERADA
            </h1>
          </div>
          <p className="text-xs text-[#8ba3c7] mt-0.5">
            Generador estocástico de casos clínicos con temporizador táctico de 90s, fundamentación GPC CENETEC y perlas clave.
          </p>
        </div>

        {/* Stats Pill */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="px-3 py-1 rounded bg-[#081628] border border-[#163a5d] text-[#8ba3c7]">
            RESOLUCIÓN: <strong className="text-white">{answeredCount} CASOS</strong>
          </div>
          <div className="px-3 py-1 rounded bg-[#081628] border border-[#163a5d] text-[#65d9a5]">
            EFICACIA: <strong className="text-[#65d9a5]">{answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0}%</strong>
          </div>
        </div>
      </div>

      {/* Main Grid: Roulette Wheel (Left) & Active Question Stage (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Roulette Wheel Column (5 cols) */}
        <div className="lg:col-span-5 hud-panel p-5 flex flex-col items-center justify-between space-y-4">
          <div className="w-full flex items-center justify-between border-b border-[#163a5d] pb-2 font-mono text-xs">
            <span className="text-white font-bold uppercase tracking-wider">ROTOR PONDERADO</span>
            <span className="text-[#f1b84b] font-semibold">ENARM 2026</span>
          </div>

          {/* Graphical Roulette Wheel */}
          <div className="relative w-64 h-64 my-2 flex items-center justify-center">
            {/* Top Pointer Indicator */}
            <div className="absolute top-0 z-20 transform -translate-y-2">
              <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[16px] border-t-[#f1b84b] drop-shadow-[0_0_8px_#f1b84b]" />
            </div>

            {/* Rotating Disc */}
            <div
              className="w-56 h-56 rounded-full border-4 border-[#163a5d] relative shadow-[0_0_25px_rgba(241,184,75,0.2)] overflow-hidden transition-all duration-[2800ms] ease-out"
              style={{
                transform: `rotate(${wheelRotation}deg)`,
                background: `conic-gradient(
                  #36d7d0 0deg 115deg,
                  #65d9a5 115deg 200deg,
                  #f1b84b 200deg 280deg,
                  #ef7085 280deg 360deg
                )`,
              }}
            >
              {/* Inner Cross lines */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full h-0.5 bg-[#020711]/70" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none rotate-90">
                <div className="w-full h-0.5 bg-[#020711]/70" />
              </div>
            </div>

            {/* Center Core Hub */}
            <div className="absolute w-20 h-20 rounded-full bg-[#05101d] border-2 border-[#f1b84b] shadow-[0_0_15px_rgba(241,184,75,0.4)] flex flex-col items-center justify-center z-10 font-mono text-[10px] text-center p-1">
              <span className="text-[#f1b84b] font-bold">NÚCLEO</span>
              <span className="text-white text-[9px]">ENARM</span>
            </div>
          </div>

          {/* Specialties Weight Legend */}
          <div className="grid grid-cols-2 gap-2 w-full font-mono text-[11px]">
            {ENARM_SPECIALTIES.map((spec) => (
              <div
                key={spec.id}
                className="p-1.5 rounded bg-[#081628] border border-[#163a5d] flex items-center justify-between"
              >
                <div className="flex items-center space-x-1.5 truncate">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: spec.color }} />
                  <span className="text-white truncate">{spec.name}</span>
                </div>
                <span className="text-[#8ba3c7] shrink-0">{spec.weight}%</span>
              </div>
            ))}
          </div>

          {/* Spin Button */}
          <button
            onClick={spinRoulette}
            disabled={isSpinning}
            className={`w-full py-3 rounded font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(241,184,75,0.3)] ${
              isSpinning
                ? 'bg-[#193859] text-[#8ba3c7] cursor-not-allowed'
                : 'bg-[#f1b84b] text-[#020711] hover:bg-[#ffdea9] active:scale-98'
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
            {isSpinning ? 'CALCULANDO TRAYECTORIA ESTOCÁSTICA...' : 'GIRAR RULETA TÁCTICA'}
          </button>
        </div>

        {/* Active Question / Clinical Case Stage (7 cols) */}
        <div className="lg:col-span-7 hud-panel p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#163a5d] pb-2 font-mono text-xs">
            <span className="text-white font-bold flex items-center gap-2 uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-[#36d7d0]" />
              CASO CLÍNICO TÁCTICO // EXAMEN DE ALTA RENTABILIDAD
            </span>

            {activeQuestion && (
              <div
                className={`flex items-center gap-1.5 px-2 py-0.5 rounded border ${
                  timerSeconds <= 20
                    ? 'bg-[#ef7085]/15 text-[#ef7085] border-[#ef7085] animate-pulse'
                    : 'bg-[#081628] text-[#36d7d0] border-[#163a5d]'
                }`}
              >
                <Timer className="w-3.5 h-3.5" />
                <span className="font-bold">{timerSeconds}s</span>
              </div>
            )}
          </div>

          {activeQuestion ? (
            <div className="space-y-4 animate-fade-in font-mono">
              {/* Specialty & Citation Header */}
              <div className="flex items-center justify-between text-xs">
                <span className="px-2 py-0.5 rounded bg-[#f1b84b]/15 text-[#f1b84b] border border-[#f1b84b]/30 font-bold uppercase">
                  {activeQuestion.specialtyName}
                </span>
                <span className="text-[#526f8c] text-[11px] truncate max-w-xs">
                  {activeQuestion.gpcCitation}
                </span>
              </div>

              {/* Clinical Case Scenario Box */}
              <div className="p-3.5 rounded bg-[#081628] border border-[#163a5d] text-white text-xs leading-relaxed font-sans">
                <span className="text-[#36d7d0] font-mono font-bold block mb-1 text-[11px]">
                  PRESENTACIÓN DEL CASO:
                </span>
                {activeQuestion.clinicalCase}
              </div>

              {/* Specific Question Prompt */}
              <div className="text-xs text-[#36d7d0] font-bold pt-1">
                {activeQuestion.question}
              </div>

              {/* Options A, B, C, D */}
              <div className="space-y-2">
                {activeQuestion.options.map((opt, idx) => {
                  const letters = ['A', 'B', 'C', 'D'];
                  const isSelected = selectedAnswer === idx;
                  const isCorrect = idx === activeQuestion.correctIndex;
                  const showResult = selectedAnswer !== null;

                  let btnStyle = 'bg-[#040f1c] border-[#163a5d] text-white hover:border-[#36d7d0]';
                  if (showResult) {
                    if (isCorrect) {
                      btnStyle = 'bg-[#65d9a5]/20 border-[#65d9a5] text-[#65d9a5] font-bold';
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'bg-[#ef7085]/20 border-[#ef7085] text-[#ef7085] font-bold';
                    } else {
                      btnStyle = 'bg-[#040f1c]/50 border-[#163a5d]/40 text-[#526f8c]';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={selectedAnswer !== null}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full p-2.5 rounded border text-left text-xs transition-all flex items-start gap-2.5 ${btnStyle}`}
                    >
                      <span className="font-bold px-1.5 py-0.5 rounded bg-[#081628] border border-[#163a5d] shrink-0 text-[11px]">
                        {letters[idx]}
                      </span>
                      <span className="flex-1 font-sans">{opt}</span>
                      {showResult && isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-[#65d9a5] shrink-0 mt-0.5" />
                      )}
                      {showResult && isSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-[#ef7085] shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Clinical Pearl Feedback (shown after answer) */}
              {selectedAnswer !== null && (
                <div className="p-3.5 rounded bg-[#081628] border border-[#f1b84b]/40 space-y-2 animate-fade-in">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#f1b84b] font-bold flex items-center gap-1.5 uppercase">
                      <Sparkles className="w-4 h-4" />
                      PERLA DE ALTA RENTABILIDAD // GPC CENETEC
                    </span>
                    {selectedAnswer === activeQuestion.correctIndex ? (
                      <span className="text-[#65d9a5] font-bold flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5" />
                        +50 XP ASIGNADOS
                      </span>
                    ) : (
                      <span className="text-[#ef7085] font-bold">ERROR DE ANÁLISIS</span>
                    )}
                  </div>
                  <p className="text-xs text-[#d8e3f6] font-sans leading-relaxed">
                    {activeQuestion.highYieldPearl}
                  </p>
                  <div className="pt-1 text-[11px] text-[#526f8c]">
                    Fuente normativa: {activeQuestion.gpcCitation}
                  </div>
                  <button
                    onClick={spinRoulette}
                    className="w-full mt-2 py-2 rounded bg-[#36d7d0] text-[#020711] font-bold hover:bg-[#5ef4ec] transition-all text-xs"
                  >
                    SIGUIENTE CASO RULETA &rarr;
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="py-16 text-center space-y-3 font-mono text-xs text-[#8ba3c7]">
              <div className="w-12 h-12 rounded-full bg-[#081628] border border-[#163a5d] flex items-center justify-center mx-auto text-[#f1b84b]">
                <Dices className="w-6 h-6 animate-pulse" />
              </div>
              <div className="text-white font-semibold">RULETA EN ESPERA DE IGNICIÓN</div>
              <p className="max-w-xs mx-auto text-[#526f8c]">
                Haz clic en "Girar Ruleta Táctica" para seleccionar al azar un área médica y resolver un caso real del ENARM bajo presión de tiempo.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

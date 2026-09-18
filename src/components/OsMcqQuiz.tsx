import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  Shuffle, 
  Check, 
  Sparkles,
  Cpu,
  ListChecks,
  X,
  BookOpen,
  Filter,
  Eye,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { OS_QUESTIONS, OS_WEEKS, OsQuestion } from '../data/osQuestions';

interface ShuffledOption {
  originalId: string;
  text: string;
}

interface ProcessedQuestion {
  question: OsQuestion;
  shuffledOptions: ShuffledOption[];
}

export const OsMcqQuiz: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState<number>(0); // 0 = All 80, 1-8 = Weeks
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({}); // { questionId: optionId }
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [shuffleQuestions, setShuffleQuestions] = useState<boolean>(false);
  const [shuffleOptions, setShuffleOptions] = useState<boolean>(false);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'correct' | 'incorrect' | 'unanswered'>('all');
  const [quizKey, setQuizKey] = useState<number>(0);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [showMobilePalette, setShowMobilePalette] = useState<boolean>(false);

  // Filter raw questions based on selected week
  const baseQuestions = useMemo(() => {
    if (selectedWeek === 0) {
      return OS_QUESTIONS;
    }
    return OS_QUESTIONS.filter(q => q.week === selectedWeek);
  }, [selectedWeek]);

  // Processed questions with optional shuffling
  const processedQuestions: ProcessedQuestion[] = useMemo(() => {
    let list = [...baseQuestions];

    if (shuffleQuestions) {
      for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
      }
    }

    return list.map(q => {
      let opts = q.options.map(o => ({ originalId: o.id, text: o.text }));
      if (shuffleOptions) {
        for (let i = opts.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [opts[i], opts[j]] = [opts[j], opts[i]];
        }
      }
      return {
        question: q,
        shuffledOptions: opts
      };
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseQuestions, shuffleQuestions, shuffleOptions, quizKey]);

  const currentItem = processedQuestions[activeQuestionIndex] || processedQuestions[0];

  const handleSelectOption = (questionId: number, optionId: string) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleSelectWeek = (weekId: number) => {
    setSelectedWeek(weekId);
    setActiveQuestionIndex(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setQuizKey(k => k + 1);
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setActiveQuestionIndex(0);
    setQuizKey(k => k + 1);
  };

  const calculateScore = () => {
    let score = 0;
    processedQuestions.forEach(item => {
      if (selectedAnswers[item.question.id] === item.question.correctOptionId) {
        score += 1;
      }
    });
    return score;
  };

  const handleSubmit = () => {
    setShowConfirmModal(false);
    setIsSubmitted(true);
    setActiveQuestionIndex(0);
  };

  const score = calculateScore();
  const total = processedQuestions.length;
  const percentage = Math.round((score / total) * 100) || 0;
  const answeredCount = Object.keys(selectedAnswers).filter(k => 
    processedQuestions.some(item => item.question.id === Number(k))
  ).length;

  // Filtered review questions
  const reviewQuestions = useMemo(() => {
    if (!isSubmitted) return [];
    return processedQuestions.filter(item => {
      const userAns = selectedAnswers[item.question.id];
      const isCorrect = userAns === item.question.correctOptionId;
      if (reviewFilter === 'correct') return isCorrect;
      if (reviewFilter === 'incorrect') return userAns !== undefined && !isCorrect;
      if (reviewFilter === 'unanswered') return userAns === undefined;
      return true;
    });
  }, [isSubmitted, processedQuestions, selectedAnswers, reviewFilter]);

  return (
    <div id="os-mcq-container" className="w-full max-w-5xl mx-auto px-1 sm:px-4 py-2 sm:py-6">
      {/* Top Banner / Navigation */}
      <div className="bg-gradient-to-r from-violet-900 via-indigo-800 to-slate-900 rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 text-white shadow-xl mb-3 sm:mb-6 border border-violet-700/40">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-violet-600/30 border border-violet-400/40 flex items-center justify-center text-violet-300 shadow-inner">
              <Cpu className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-violet-500/30 text-violet-200 px-2 py-0.5 rounded-full border border-violet-400/30">
                  NPTEL IIT • 80 MCQs
                </span>
                <span className="text-[10px] sm:text-xs font-semibold text-violet-300">
                  Weeks 1 to 8
                </span>
              </div>
              <h1 className="text-base sm:text-2xl font-black tracking-tight text-white mt-0.5">
                Operating Systems (OS) Quiz
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="os-shuffle-options-btn"
              onClick={() => {
                setShuffleOptions(!shuffleOptions);
                setQuizKey(k => k + 1);
              }}
              title="Shuffle Options Order (A, B, C, D)"
              className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold border transition-all ${
                shuffleOptions
                  ? 'bg-amber-500/20 border-amber-400/80 text-amber-200 shadow-sm'
                  : 'bg-white/10 border-white/20 text-slate-200 hover:bg-white/15'
              }`}
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Shuffle Options</span>
              {shuffleOptions && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />}
            </button>

            <button
              id="os-reset-quiz-btn"
              onClick={resetQuiz}
              title="Reset Quiz"
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-semibold bg-white/10 border border-white/20 text-slate-200 hover:bg-white/20 transition-all active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* Week Selector Chips (Horizontal Scrollable) */}
        <div className="mt-3 sm:mt-5 pt-3 border-t border-violet-500/30">
          <div className="text-[11px] sm:text-xs font-semibold text-violet-200 mb-2 flex items-center justify-between">
            <span>Select Practice Week / Complete Mock:</span>
            <span className="text-[10px] text-violet-300">
              {answeredCount}/{total} Answered
            </span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-violet-700">
            <button
              id="os-week-all-btn"
              onClick={() => handleSelectWeek(0)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedWeek === 0
                  ? 'bg-white text-violet-900 shadow-md scale-105'
                  : 'bg-violet-900/50 hover:bg-violet-800/60 text-violet-100 border border-violet-600/40'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>All 80 Questions</span>
            </button>

            {OS_WEEKS.map(w => (
              <button
                key={w.id}
                id={`os-week-${w.id}-btn`}
                onClick={() => handleSelectWeek(w.id)}
                className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1 ${
                  selectedWeek === w.id
                    ? 'bg-amber-400 text-slate-950 shadow-md scale-105'
                    : 'bg-violet-900/50 hover:bg-violet-800/60 text-violet-200 border border-violet-600/40'
                }`}
              >
                <span>W{w.id}</span>
                <span className="text-[10px] opacity-75 hidden sm:inline">(10Q)</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {!isSubmitted ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-6">
          {/* Question View (Left 3 columns) */}
          <div className="lg:col-span-3 space-y-3 sm:space-y-4">
            {/* Question Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 shadow-sm border border-slate-200 dark:border-slate-800">
              {/* Question Header & Indicators */}
              <div className="flex items-center justify-between gap-2 pb-2.5 sm:pb-3 border-b border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-violet-600 dark:text-violet-400 text-xs sm:text-sm">
                    Q{activeQuestionIndex + 1} of {total}
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold px-2 py-0.5 rounded-md text-[10px] sm:text-xs truncate max-w-[140px] sm:max-w-none">
                    {currentItem.question.topic}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    id="os-open-palette-mobile-btn"
                    onClick={() => setShowMobilePalette(true)}
                    className="lg:hidden flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-slate-700 dark:text-slate-300"
                  >
                    <ListChecks className="w-3.5 h-3.5" />
                    <span>Grid</span>
                  </button>
                </div>
              </div>

              {/* Question Text */}
              <div className="py-3 sm:py-4">
                <p className="text-slate-900 dark:text-slate-100 text-sm sm:text-base font-semibold leading-relaxed whitespace-pre-line break-words">
                  {currentItem.question.question}
                </p>
              </div>

              {/* Options List */}
              <div className="space-y-2 sm:space-y-2.5 pt-1">
                {currentItem.shuffledOptions.map((opt, idx) => {
                  const letter = String.fromCharCode(65 + idx);
                  const isSelected = selectedAnswers[currentItem.question.id] === opt.originalId;

                  return (
                    <button
                      key={opt.originalId}
                      id={`os-q${currentItem.question.id}-opt-${opt.originalId}`}
                      onClick={() => handleSelectOption(currentItem.question.id, opt.originalId)}
                      className={`w-full text-left p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border transition-all flex items-start gap-2.5 sm:gap-3 group active:scale-[0.99] ${
                        isSelected
                          ? 'bg-violet-50 dark:bg-violet-950/40 border-violet-600 dark:border-violet-500 shadow-sm text-violet-950 dark:text-violet-100'
                          : 'bg-slate-50/70 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <span
                        className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl text-xs sm:text-sm font-black flex items-center justify-center shrink-0 transition-colors mt-0.5 ${
                          isSelected
                            ? 'bg-violet-600 text-white shadow-sm'
                            : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 group-hover:border-violet-400'
                        }`}
                      >
                        {letter}
                      </span>
                      <span className="text-xs sm:text-sm font-medium leading-snug break-words flex-1 pt-0.5">
                        {opt.text}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Prev / Next / Submit Controls */}
              <div className="flex items-center justify-between gap-2 pt-4 sm:pt-6 mt-3 sm:mt-5 border-t border-slate-100 dark:border-slate-800">
                <button
                  id="os-prev-btn"
                  onClick={() => setActiveQuestionIndex(i => Math.max(0, i - 1))}
                  disabled={activeQuestionIndex === 0}
                  className="flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-all"
                >
                  <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Prev</span>
                </button>

                <div className="text-[11px] sm:text-xs font-semibold text-slate-400">
                  {activeQuestionIndex + 1} / {total}
                </div>

                {activeQuestionIndex < total - 1 ? (
                  <button
                    id="os-next-btn"
                    onClick={() => setActiveQuestionIndex(i => Math.min(total - 1, i + 1))}
                    className="flex items-center gap-1 sm:gap-1.5 px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-violet-600 hover:bg-violet-700 text-white shadow-sm hover:shadow transition-all active:scale-95"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                ) : (
                  <button
                    id="os-finish-btn"
                    onClick={() => setShowConfirmModal(true)}
                    className="flex items-center gap-1 sm:gap-1.5 px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-extrabold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg transition-all active:scale-95 animate-pulse"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Submit Exam</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Question Palette Sidebar (Desktop) */}
          <div className="hidden lg:block lg:col-span-1 space-y-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 sticky top-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                  Question Palette
                </span>
                <span className="text-xs font-bold text-violet-600 bg-violet-50 dark:bg-violet-950/40 px-2 py-0.5 rounded-full">
                  {answeredCount}/{total} Done
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
                <div 
                  className="bg-violet-600 h-full transition-all duration-300"
                  style={{ width: `${(answeredCount / total) * 100}%` }}
                />
              </div>

              {/* Grid of numbers */}
              <div className="grid grid-cols-5 gap-1.5 mt-4 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-300">
                {processedQuestions.map((item, idx) => {
                  const isAnswered = selectedAnswers[item.question.id] !== undefined;
                  const isActive = idx === activeQuestionIndex;

                  return (
                    <button
                      key={item.question.id}
                      id={`os-palette-btn-${idx + 1}`}
                      onClick={() => setActiveQuestionIndex(idx)}
                      className={`h-8 rounded-lg text-xs font-bold flex items-center justify-center transition-all ${
                        isActive
                          ? 'ring-2 ring-violet-500 bg-violet-600 text-white'
                          : isAnswered
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                          : 'bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
                <button
                  id="os-sidebar-submit-btn"
                  onClick={() => setShowConfirmModal(true)}
                  className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow transition-all active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Submit Quiz ({answeredCount}/{total})</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Results & Review Mode */
        <div className="space-y-4 sm:space-y-6">
          {/* Score Header */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800 text-center relative overflow-hidden">
            <div className="max-w-md mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-violet-100 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 mb-3 border-4 border-violet-200 dark:border-violet-800">
                <span className="text-xl sm:text-2xl font-black">{percentage}%</span>
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white">
                Exam Completed!
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                You scored <span className="font-bold text-violet-600 dark:text-violet-400">{score}</span> out of <span className="font-bold">{total}</span> questions.
              </p>

              {/* Stats badges */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-4 sm:mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="bg-emerald-50 dark:bg-emerald-950/40 p-2 sm:p-3 rounded-xl border border-emerald-200 dark:border-emerald-800/60">
                  <span className="block text-[10px] sm:text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase">Correct</span>
                  <span className="text-base sm:text-xl font-black text-emerald-800 dark:text-emerald-200">{score}</span>
                </div>
                <div className="bg-rose-50 dark:bg-rose-950/40 p-2 sm:p-3 rounded-xl border border-rose-200 dark:border-rose-800/60">
                  <span className="block text-[10px] sm:text-xs font-bold text-rose-700 dark:text-rose-400 uppercase">Incorrect</span>
                  <span className="text-base sm:text-xl font-black text-rose-800 dark:text-rose-200">{answeredCount - score}</span>
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 p-2 sm:p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="block text-[10px] sm:text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">Skipped</span>
                  <span className="text-base sm:text-xl font-black text-slate-700 dark:text-slate-300">{total - answeredCount}</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 mt-5">
                <button
                  id="os-retake-quiz-btn"
                  onClick={resetQuiz}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-violet-600 hover:bg-violet-700 text-white shadow transition-all active:scale-95"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retake Quiz</span>
                </button>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1">
            <div className="flex items-center gap-1.5">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Filter Review:</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-1.5">
              {(['all', 'correct', 'incorrect', 'unanswered'] as const).map(f => (
                <button
                  key={f}
                  id={`os-filter-${f}-btn`}
                  onClick={() => setReviewFilter(f)}
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold capitalize transition-all ${
                    reviewFilter === f
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Questions Review List */}
          <div className="space-y-3 sm:space-y-4">
            {reviewQuestions.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 text-center text-slate-500 border border-slate-200 dark:border-slate-800">
                No questions found under this filter.
              </div>
            ) : (
              reviewQuestions.map((item, qIdx) => {
                const userAns = selectedAnswers[item.question.id];
                const isCorrect = userAns === item.question.correctOptionId;
                const isSkipped = userAns === undefined;

                return (
                  <div
                    key={item.question.id}
                    id={`os-review-item-${item.question.id}`}
                    className={`bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 border shadow-sm ${
                      isSkipped
                        ? 'border-slate-200 dark:border-slate-800'
                        : isCorrect
                        ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/20'
                        : 'border-rose-200 dark:border-rose-900/60 bg-rose-50/20'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                          Question {qIdx + 1} ({item.question.weekTitle})
                        </span>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-500 font-medium">{item.question.topic}</span>
                      </div>
                      <div>
                        {isSkipped ? (
                          <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 font-bold px-2 py-0.5 rounded text-[10px]">
                            Skipped
                          </span>
                        ) : isCorrect ? (
                          <span className="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold px-2 py-0.5 rounded text-[10px] flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Correct
                          </span>
                        ) : (
                          <span className="bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 font-bold px-2 py-0.5 rounded text-[10px] flex items-center gap-1">
                            <X className="w-3 h-3" /> Incorrect
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Question text */}
                    <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 py-2.5 whitespace-pre-line break-words">
                      {item.question.question}
                    </p>

                    {/* Options status */}
                    <div className="space-y-1.5 pt-1">
                      {item.question.options.map(opt => {
                        const isChosen = userAns === opt.id;
                        const isRightAnswer = item.question.correctOptionId === opt.id;

                        let style = 'bg-slate-50/80 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300';
                        if (isRightAnswer) {
                          style = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-100 font-semibold';
                        } else if (isChosen && !isRightAnswer) {
                          style = 'bg-rose-50 dark:bg-rose-950/60 border-rose-400 text-rose-900 dark:text-rose-200 line-through opacity-80';
                        }

                        return (
                          <div
                            key={opt.id}
                            className={`p-2 rounded-xl text-xs border flex items-start gap-2 ${style}`}
                          >
                            <span className="font-bold uppercase w-5 text-center mt-0.5">{opt.id}.</span>
                            <span className="flex-1 break-words leading-tight">{opt.text}</span>
                            {isRightAnswer && (
                              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                            )}
                            {isChosen && !isRightAnswer && (
                              <X className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    <div className="mt-3 p-2.5 sm:p-3 rounded-xl bg-violet-50/70 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-900/60 text-[11px] sm:text-xs">
                      <div className="font-bold text-violet-900 dark:text-violet-300 flex items-center gap-1 mb-1">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Explanation & Solution:</span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed break-words whitespace-pre-line">
                        {item.question.explanation}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Confirmation Modal before submission */}
      <AnimatePresence>
        {showConfirmModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 max-w-sm w-full border border-slate-200 dark:border-slate-800 shadow-2xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-3">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-black text-center text-slate-900 dark:text-white">
                Submit Your Quiz?
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 text-center mt-1.5">
                You have answered <span className="font-bold text-violet-600">{answeredCount}</span> of <span className="font-bold">{total}</span> questions.
                {total - answeredCount > 0 && (
                  <span className="block text-rose-500 font-semibold mt-1">
                    {total - answeredCount} question(s) are still unanswered!
                  </span>
                )}
              </p>

              <div className="flex items-center gap-2.5 mt-5">
                <button
                  id="os-cancel-submit-modal-btn"
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Continue
                </button>
                <button
                  id="os-confirm-submit-modal-btn"
                  onClick={handleSubmit}
                  className="flex-1 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow"
                >
                  Confirm & Score
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Sheet Question Palette */}
      <AnimatePresence>
        {showMobilePalette && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 lg:hidden"
            onClick={() => setShowMobilePalette(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 rounded-t-3xl p-5 max-w-lg w-full max-h-[75vh] flex flex-col shadow-2xl border-t border-slate-200 dark:border-slate-800"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white">
                    Question Navigator
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {answeredCount} of {total} answered
                  </p>
                </div>
                <button
                  id="os-close-mobile-palette-btn"
                  onClick={() => setShowMobilePalette(false)}
                  className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-5 gap-1.5 overflow-y-auto py-4 flex-1">
                {processedQuestions.map((item, idx) => {
                  const isAnswered = selectedAnswers[item.question.id] !== undefined;
                  const isActive = idx === activeQuestionIndex;

                  return (
                    <button
                      key={item.question.id}
                      id={`os-mobile-palette-item-${idx + 1}`}
                      onClick={() => {
                        setActiveQuestionIndex(idx);
                        setShowMobilePalette(false);
                      }}
                      className={`h-9 rounded-xl text-xs font-bold flex items-center justify-center transition-all ${
                        isActive
                          ? 'ring-2 ring-violet-500 bg-violet-600 text-white'
                          : isAnswered
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                          : 'bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <button
                id="os-mobile-palette-submit-btn"
                onClick={() => {
                  setShowMobilePalette(false);
                  setShowConfirmModal(true);
                }}
                className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-extrabold text-xs shadow mt-2"
              >
                Submit Exam Now
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OsMcqQuiz;

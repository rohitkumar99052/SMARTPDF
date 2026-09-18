import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Shuffle, 
  Award, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles,
  BookOpen,
  Filter,
  Eye,
  AlertTriangle,
  ListChecks,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NPTEL_QUESTIONS, NPTEL_PARTS, Question } from '../data/nptelQuestions';

interface ShuffledOption {
  originalId: string;
  text: string;
}

interface ProcessedQuestion {
  question: Question;
  shuffledOptions: ShuffledOption[];
}

export default function NptelMcqQuiz() {
  const [selectedPart, setSelectedPart] = useState<number>(1); // 1, 2, 3, 4, or 0 for All
  const [shuffleQuestions, setShuffleQuestions] = useState<boolean>(true);
  const [shuffleOptions, setShuffleOptions] = useState<boolean>(true);
  
  // Quiz state
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({}); // question.id -> originalId
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'correct' | 'incorrect' | 'unanswered'>('all');
  const [quizKey, setQuizKey] = useState<number>(0); // increment to re-shuffle
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [showMobilePalette, setShowMobilePalette] = useState<boolean>(false);

  // Filter raw questions based on selected part
  const baseQuestions = useMemo(() => {
    if (selectedPart === 0) {
      return NPTEL_QUESTIONS;
    }
    return NPTEL_QUESTIONS.filter(q => q.part === selectedPart);
  }, [selectedPart]);

  // Shuffle questions and options according to user preference
  const processedQuestions = useMemo<ProcessedQuestion[]>(() => {
    let list = [...baseQuestions];
    if (shuffleQuestions) {
      // Fisher-Yates shuffle
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
  }, [baseQuestions, shuffleQuestions, shuffleOptions, quizKey]);

  // Reset progress when switching part or restarting
  const resetQuiz = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setActiveQuestionIndex(0);
    setReviewFilter('all');
    setQuizKey(k => k + 1);
  };

  const handleSelectPart = (partId: number) => {
    if (partId !== selectedPart) {
      setSelectedPart(partId);
      setSelectedAnswers({});
      setIsSubmitted(false);
      setActiveQuestionIndex(0);
      setReviewFilter('all');
      setQuizKey(k => k + 1);
    }
  };

  const handleSelectOption = (questionId: number, originalId: string) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: prev[questionId] === originalId ? '' : originalId
    }));
  };

  const currentItem = processedQuestions[activeQuestionIndex];

  // Calculate score & statistics
  const stats = useMemo(() => {
    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;

    processedQuestions.forEach(item => {
      const chosen = selectedAnswers[item.question.id];
      if (!chosen) {
        unansweredCount++;
      } else if (chosen === item.question.correctOptionId) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    });

    const total = processedQuestions.length;
    const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;

    return {
      total,
      correctCount,
      incorrectCount,
      unansweredCount,
      percentage
    };
  }, [processedQuestions, selectedAnswers]);

  const handleSubmit = () => {
    if (!isSubmitted && stats.unansweredCount > 0) {
      setShowConfirmModal(true);
    } else {
      setIsSubmitted(true);
    }
  };

  const confirmSubmit = () => {
    setShowConfirmModal(false);
    setIsSubmitted(true);
  };

  // Filtered list for review
  const reviewQuestions = useMemo(() => {
    if (!isSubmitted) return [];
    return processedQuestions.filter(item => {
      const chosen = selectedAnswers[item.question.id];
      if (reviewFilter === 'correct') return chosen === item.question.correctOptionId;
      if (reviewFilter === 'incorrect') return !!chosen && chosen !== item.question.correctOptionId;
      if (reviewFilter === 'unanswered') return !chosen;
      return true;
    });
  }, [processedQuestions, selectedAnswers, isSubmitted, reviewFilter]);

  const answeredCount = Object.values(selectedAnswers).filter(Boolean).length;
  const progressPercent = Math.round((answeredCount / (processedQuestions.length || 1)) * 100);

  return (
    <div id="nptel-quiz-container" className="w-full max-w-5xl mx-auto space-y-3 sm:space-y-6">
      {/* Top Header Card */}
      <div id="quiz-header-banner" className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-1.5 sm:space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-indigo-500/30 border border-indigo-400/30 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider text-indigo-200">
                NPTEL Soft Skills
              </span>
              <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-[11px] sm:text-xs font-bold text-emerald-300 flex items-center gap-1">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> 80 Total Questions
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold tracking-tight">
              Objective MCQ Practice & Assessment
            </h2>
            <p className="text-indigo-200/90 text-xs sm:text-sm max-w-2xl leading-relaxed hidden sm:block">
              Divided into 4 parts of 20 questions each. Questions and options are shuffled for realistic exam practice. Check your score and view explanations after submitting!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              id="toggle-shuffle-questions-btn"
              onClick={() => {
                setShuffleQuestions(p => !p);
                setQuizKey(k => k + 1);
              }}
              className={`px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold flex items-center gap-1 sm:gap-1.5 transition-all border ${
                shuffleQuestions
                  ? 'bg-indigo-600/60 border-indigo-400 text-white shadow-sm'
                  : 'bg-white/10 border-white/20 text-indigo-200 hover:bg-white/20'
              }`}
              title="Shuffle Questions"
            >
              <Shuffle className="w-3.5 h-3.5" />
              {shuffleQuestions ? 'Q-Order Shuffled' : 'Sequential Qs'}
            </button>

            <button
              id="toggle-shuffle-options-btn"
              onClick={() => {
                setShuffleOptions(p => !p);
                setQuizKey(k => k + 1);
              }}
              className={`px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold flex items-center gap-1 sm:gap-1.5 transition-all border ${
                shuffleOptions
                  ? 'bg-indigo-600/60 border-indigo-400 text-white shadow-sm'
                  : 'bg-white/10 border-white/20 text-indigo-200 hover:bg-white/20'
              }`}
              title="Shuffle Options inside questions"
            >
              <Shuffle className="w-3.5 h-3.5" />
              {shuffleOptions ? 'Options Shuffled' : 'Fixed Options'}
            </button>

            <button
              id="reset-quiz-btn"
              onClick={resetQuiz}
              className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white text-indigo-900 hover:bg-indigo-50 font-bold text-[11px] sm:text-xs rounded-lg sm:rounded-xl transition-all shadow-md flex items-center gap-1 active:scale-95 ml-auto sm:ml-0"
            >
              <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Reset Quiz
            </button>
          </div>
        </div>

        {/* 4 Parts Tabs */}
        <div className="mt-4 sm:mt-8 pt-3 sm:pt-6 border-t border-indigo-700/50">
          <div className="text-[11px] sm:text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-2 sm:mb-3 flex items-center justify-between">
            <span>Select Practice Part:</span>
            <span>{selectedPart === 0 ? 'All 80 Qs' : `Part ${selectedPart} of 4`}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-2.5">
            {NPTEL_PARTS.map(part => {
              const isCurrent = selectedPart === part.id;
              return (
                <button
                  key={part.id}
                  id={`part-tab-${part.id}`}
                  onClick={() => handleSelectPart(part.id)}
                  className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl text-left transition-all border relative overflow-hidden ${
                    isCurrent
                      ? 'bg-white text-slate-900 border-white shadow-lg font-bold'
                      : 'bg-indigo-950/40 border-indigo-700/40 text-indigo-100 hover:bg-indigo-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5 sm:mb-1">
                    <span className="text-[11px] sm:text-xs font-bold uppercase">Part {part.id}</span>
                    <span className={`text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      isCurrent ? 'bg-indigo-100 text-indigo-800' : 'bg-indigo-800 text-indigo-200'
                    }`}>
                      20 Qs
                    </span>
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-medium leading-snug line-clamp-1 sm:line-clamp-2 opacity-90">
                    {part.title.replace(`Part ${part.id}: `, '')}
                  </div>
                </button>
              );
            })}

            {/* Option to practice All 80 Questions */}
            <button
              id="part-tab-all"
              onClick={() => handleSelectPart(0)}
              className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl text-left transition-all border relative col-span-2 sm:col-span-1 ${
                selectedPart === 0
                  ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-lg font-bold'
                  : 'bg-indigo-950/40 border-indigo-700/40 text-indigo-100 hover:bg-indigo-800/40'
              }`}
            >
              <div className="flex items-center justify-between mb-0.5 sm:mb-1">
                <span className="text-[11px] sm:text-xs font-bold uppercase">All Parts</span>
                <span className={`text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  selectedPart === 0 ? 'bg-amber-100 text-amber-900' : 'bg-indigo-800 text-indigo-200'
                }`}>
                  80 Qs
                </span>
              </div>
              <div className="text-[10px] sm:text-[11px] font-medium leading-snug opacity-90 truncate">
                Full 80 Mock Exam
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area: Quiz Taking Mode vs Result Mode */}
      {!isSubmitted ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Question Panel (3 Columns) */}
          <div className="lg:col-span-3 space-y-2 sm:space-y-6">
            {/* Progress Tracker */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
              <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-3 flex-wrap">
                <span className="text-xs sm:text-sm font-bold text-slate-800">
                  Question {activeQuestionIndex + 1} of {processedQuestions.length}
                </span>
                <span className="text-[10px] sm:text-[11px] px-2 py-0.5 sm:py-1 bg-slate-100 text-slate-600 rounded-md font-medium">
                  {currentItem?.question.week}
                </span>
                <button
                  id="mobile-palette-toggle-btn"
                  onClick={() => setShowMobilePalette(true)}
                  className="lg:hidden ml-auto px-2 py-0.5 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 text-[11px] font-bold rounded-lg flex items-center gap-1 active:scale-95 transition-all"
                >
                  <ListChecks className="w-3 h-3" />
                  <span>Palette ({answeredCount}/{processedQuestions.length})</span>
                </button>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-2.5">
                <span className="text-[11px] sm:text-xs text-slate-500 font-medium whitespace-nowrap">
                  {answeredCount} of {processedQuestions.length} Answered
                </span>
                <div className="w-20 sm:w-28 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Active Question Box */}
            {currentItem && (
              <motion.div 
                key={currentItem.question.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl sm:rounded-3xl p-3 sm:p-6 md:p-8 border border-slate-200 shadow-xs sm:shadow-sm space-y-3 sm:space-y-6"
              >
                {/* Question Statement */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] sm:text-xs font-bold text-indigo-600 uppercase tracking-wider">
                      Question {activeQuestionIndex + 1}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {currentItem.question.week}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-lg md:text-xl font-bold text-slate-900 leading-snug break-words">
                    {currentItem.question.question}
                  </h3>
                </div>

                {/* Shuffled Options */}
                <div className="space-y-2 sm:space-y-3 pt-1">
                  {currentItem.shuffledOptions.map((opt, optIndex) => {
                    const optionLetter = String.fromCharCode(65 + optIndex); // A, B, C, D
                    const isSelected = selectedAnswers[currentItem.question.id] === opt.originalId;

                    return (
                      <button
                        key={opt.originalId}
                        id={`option-${currentItem.question.id}-${opt.originalId}`}
                        onClick={() => handleSelectOption(currentItem.question.id, opt.originalId)}
                        className={`w-full px-2.5 py-2 sm:p-4 rounded-xl sm:rounded-2xl border text-left flex items-center gap-2.5 sm:gap-3.5 transition-all ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50/90 shadow-xs ring-1 ring-indigo-500/30'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 bg-white'
                        }`}
                      >
                        <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {optionLetter}
                        </div>
                        <div className="flex-1 text-xs sm:text-sm md:text-base text-slate-800 font-medium leading-snug break-words">
                          {opt.text}
                        </div>
                        <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border sm:border-2 flex items-center justify-center shrink-0 transition-all ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-600 text-white'
                            : 'border-slate-300'
                        }`}>
                          {isSelected && <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Navigation Buttons */}
                <div className="pt-3 sm:pt-6 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    id="prev-question-btn"
                    disabled={activeQuestionIndex === 0}
                    onClick={() => setActiveQuestionIndex(i => Math.max(0, i - 1))}
                    className="px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-lg sm:rounded-xl border border-slate-300 text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-1.5 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-all"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Previous
                  </button>

                  <div className="flex items-center gap-2 sm:gap-3">
                    {activeQuestionIndex < processedQuestions.length - 1 ? (
                      <button
                        id="next-question-btn"
                        onClick={() => setActiveQuestionIndex(i => Math.min(processedQuestions.length - 1, i + 1))}
                        className="px-4 py-2 sm:px-6 sm:py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-lg sm:rounded-xl flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
                      >
                        Next <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                    ) : (
                      <button
                        id="submit-quiz-btn"
                        onClick={handleSubmit}
                        className="px-4 py-2 sm:px-7 sm:py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-lg sm:rounded-xl flex items-center gap-1.5 shadow-lg active:scale-95 transition-all"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Submit Quiz
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Side Question Navigator Panel (1 Column) */}
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4 sticky top-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="font-bold text-slate-800 text-sm">Question Palette</h4>
                <span className="text-xs text-slate-500 font-medium">
                  {selectedPart === 0 ? 'All 80' : `Part ${selectedPart}`}
                </span>
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-md bg-indigo-600" />
                  <span>Answered ({answeredCount})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-md bg-slate-100 border border-slate-300" />
                  <span>Unanswered ({processedQuestions.length - answeredCount})</span>
                </div>
              </div>

              {/* Grid of buttons */}
              <div className="grid grid-cols-5 gap-2 max-h-64 overflow-y-auto p-1">
                {processedQuestions.map((item, idx) => {
                  const isAnswered = !!selectedAnswers[item.question.id];
                  const isCurrent = idx === activeQuestionIndex;

                  return (
                    <button
                      key={item.question.id}
                      id={`palette-btn-${idx + 1}`}
                      onClick={() => setActiveQuestionIndex(idx)}
                      className={`h-9 rounded-xl font-bold text-xs transition-all flex items-center justify-center ${
                        isCurrent
                          ? 'ring-2 ring-indigo-500 ring-offset-2'
                          : ''
                      } ${
                        isAnswered
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Action Submit */}
              <div className="pt-2">
                <button
                  id="side-submit-quiz-btn"
                  onClick={handleSubmit}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-emerald-200 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <CheckCircle2 className="w-4 h-4" /> Submit Quiz ({answeredCount}/{processedQuestions.length})
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Result & Detailed Review Mode */
        <div id="quiz-results-container" className="space-y-6">
          {/* Scorecard Hero Banner */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-5">
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-white shadow-lg ${
                  stats.percentage >= 75
                    ? 'bg-gradient-to-tr from-emerald-600 to-teal-500'
                    : stats.percentage >= 50
                    ? 'bg-gradient-to-tr from-amber-500 to-yellow-500'
                    : 'bg-gradient-to-tr from-red-600 to-rose-500'
                }`}>
                  <Award className="w-10 h-10" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {selectedPart === 0 ? 'Full Mock Assessment' : `Part ${selectedPart} Assessment`}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black text-slate-800">
                    Your Score: {stats.correctCount} / {stats.total}
                  </h3>
                  <p className="text-sm font-semibold text-slate-500 mt-1">
                    {stats.percentage >= 80 
                      ? '🌟 Outstanding! Excellent mastery of soft skill concepts.' 
                      : stats.percentage >= 60 
                      ? '👍 Well done! Good command with room for minor revision.' 
                      : '📚 Keep practicing! Review the explanations below to solidify the concepts.'}
                  </p>
                </div>
              </div>

              {/* Retry & Part Buttons */}
              <div className="flex items-center gap-3">
                <button
                  id="retake-quiz-btn"
                  onClick={resetQuiz}
                  className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-2xl transition-all shadow-md flex items-center gap-2 active:scale-95"
                >
                  <RotateCcw className="w-4 h-4" /> Retake Part (Shuffle Again)
                </button>
                {selectedPart < 4 && selectedPart > 0 && (
                  <button
                    id="next-part-btn"
                    onClick={() => handleSelectPart(selectedPart + 1)}
                    className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-2xl transition-all shadow-md flex items-center gap-2 active:scale-95"
                  >
                    Next Part {selectedPart + 1} <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex flex-col">
                <span className="text-xs font-bold text-emerald-700 uppercase">Correct Answers</span>
                <span className="text-2xl font-black text-emerald-800 mt-1">{stats.correctCount}</span>
                <span className="text-[11px] text-emerald-600 mt-0.5">{stats.percentage}% Accuracy</span>
              </div>
              <div className="p-4 rounded-2xl bg-red-50 border border-red-100 flex flex-col">
                <span className="text-xs font-bold text-red-700 uppercase">Incorrect</span>
                <span className="text-2xl font-black text-red-800 mt-1">{stats.incorrectCount}</span>
                <span className="text-[11px] text-red-600 mt-0.5">Needs Review</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 flex flex-col">
                <span className="text-xs font-bold text-slate-700 uppercase">Unanswered</span>
                <span className="text-2xl font-black text-slate-800 mt-1">{stats.unansweredCount}</span>
                <span className="text-[11px] text-slate-500 mt-0.5">Skipped Questions</span>
              </div>
              <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 flex flex-col">
                <span className="text-xs font-bold text-indigo-700 uppercase">Total Questions</span>
                <span className="text-2xl font-black text-indigo-800 mt-1">{stats.total}</span>
                <span className="text-[11px] text-indigo-600 mt-0.5">{selectedPart === 0 ? '80 All Parts' : '20 In This Part'}</span>
              </div>
            </div>
          </div>

          {/* Detailed Question Review Header & Filters */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                  <Eye className="w-5 h-5 text-indigo-600" />
                  Detailed Answers & Explanations
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Review which answers were correct and read the detailed NPTEL lecture reference explanations.
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" /> Filter:
                </span>
                {(['all', 'correct', 'incorrect', 'unanswered'] as const).map(f => (
                  <button
                    key={f}
                    id={`filter-btn-${f}`}
                    onClick={() => setReviewFilter(f)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                      reviewFilter === f
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {f} {f === 'all' ? `(${stats.total})` : f === 'correct' ? `(${stats.correctCount})` : f === 'incorrect' ? `(${stats.incorrectCount})` : `(${stats.unansweredCount})`}
                  </button>
                ))}
              </div>
            </div>

            {/* List of Questions with Answers and Explanations */}
            <div className="space-y-6 pt-4">
              {reviewQuestions.length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-sm font-medium">
                  No questions found for the filter "{reviewFilter}".
                </div>
              ) : (
                reviewQuestions.map((item, index) => {
                  const userSelection = selectedAnswers[item.question.id];
                  const isCorrect = userSelection === item.question.correctOptionId;
                  const isSkipped = !userSelection;

                  return (
                    <div 
                      key={item.question.id}
                      id={`review-card-${item.question.id}`}
                      className={`p-6 rounded-3xl border-2 transition-all space-y-4 ${
                        isSkipped
                          ? 'border-slate-200 bg-slate-50/50'
                          : isCorrect
                          ? 'border-emerald-200 bg-emerald-50/30'
                          : 'border-red-200 bg-red-50/30'
                      }`}
                    >
                      {/* Question Top Info */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700">
                            Q#{index + 1} (Part {item.question.part})
                          </span>
                          <span className="text-xs text-slate-500 font-medium">
                            {item.question.week} • {item.question.topic}
                          </span>
                        </div>

                        {/* Status Badge */}
                        {isSkipped ? (
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-200 text-slate-700">
                            Unanswered
                          </span>
                        ) : isCorrect ? (
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Correct (+1)
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5" /> Incorrect
                          </span>
                        )}
                      </div>

                      {/* Question Text */}
                      <h5 className="font-bold text-slate-900 text-base md:text-lg leading-relaxed whitespace-pre-line">
                        {item.question.question}
                      </h5>

                      {/* Options with Status */}
                      <div className="space-y-2 pt-2">
                        {item.shuffledOptions.map((opt, optIdx) => {
                          const optionLetter = String.fromCharCode(65 + optIdx);
                          const isThisCorrect = opt.originalId === item.question.correctOptionId;
                          const isUserPick = userSelection === opt.originalId;

                          return (
                            <div
                              key={opt.originalId}
                              className={`p-3.5 rounded-2xl border text-sm flex items-start justify-between gap-3 ${
                                isThisCorrect
                                  ? 'bg-emerald-100/70 border-emerald-400 text-emerald-950 font-semibold'
                                  : isUserPick && !isThisCorrect
                                  ? 'bg-red-100/70 border-red-400 text-red-950 line-through'
                                  : 'bg-white border-slate-200 text-slate-700 opacity-75'
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                                  isThisCorrect
                                    ? 'bg-emerald-600 text-white'
                                    : isUserPick
                                    ? 'bg-red-600 text-white'
                                    : 'bg-slate-100 text-slate-600'
                                }`}>
                                  {optionLetter}
                                </span>
                                <span className="pt-0.5 leading-snug">{opt.text}</span>
                              </div>

                              <div className="shrink-0 flex items-center gap-1.5 pt-0.5 text-xs font-bold">
                                {isThisCorrect && (
                                  <span className="px-2 py-0.5 bg-emerald-600 text-white rounded-md flex items-center gap-1">
                                    <Check className="w-3 h-3 stroke-[3]" /> Correct Answer
                                  </span>
                                )}
                                {isUserPick && !isThisCorrect && (
                                  <span className="px-2 py-0.5 bg-red-600 text-white rounded-md flex items-center gap-1">
                                    <XCircle className="w-3 h-3" /> Your Choice
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Official Explanation Box */}
                      {item.question.explanation && (
                        <div className="mt-3 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-amber-950 text-xs md:text-sm space-y-1">
                          <div className="font-bold flex items-center gap-1.5 text-amber-900">
                            <BookOpen className="w-4 h-4" /> Explanation & Reference:
                          </div>
                          <p className="leading-relaxed text-amber-900/90 font-medium">
                            {item.question.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal when submitting with unanswered questions */}
      <AnimatePresence>
        {showConfirmModal && (
          <div id="confirm-submit-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl space-y-5"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900">
                  Submit with Unanswered Questions?
                </h4>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                  You still have <strong className="text-slate-800">{stats.unansweredCount}</strong> unanswered question(s). Are you sure you want to complete and submit this assessment now?
                </p>
              </div>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  id="cancel-submit-btn"
                  onClick={() => setShowConfirmModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50"
                >
                  Keep Solving
                </button>
                <button
                  id="confirm-submit-btn"
                  onClick={confirmSubmit}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md"
                >
                  Yes, Submit Now
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Mobile Question Palette Modal / Bottom Sheet */}
        {showMobilePalette && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobilePalette(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl max-h-[85vh] flex flex-col z-10"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-800 text-base">Question Palette</h4>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold">
                    {answeredCount} of {processedQuestions.length} Done
                  </span>
                </div>
                <button
                  onClick={() => setShowMobilePalette(false)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-around py-3 text-xs text-slate-600 border-b border-slate-100 bg-slate-50/50 rounded-xl my-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-indigo-600" />
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-slate-100 border border-slate-300" />
                  <span>Unanswered</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded ring-2 ring-indigo-600 bg-white" />
                  <span>Current</span>
                </div>
              </div>

              {/* Numbered Grid */}
              <div className="grid grid-cols-5 gap-2 py-3 overflow-y-auto max-h-[45vh] pr-1">
                {processedQuestions.map((item, idx) => {
                  const isAnswered = !!selectedAnswers[item.question.id];
                  const isCurrent = idx === activeQuestionIndex;
                  return (
                    <button
                      key={item.question.id}
                      onClick={() => {
                        setActiveQuestionIndex(idx);
                        setShowMobilePalette(false);
                      }}
                      className={`h-11 rounded-xl font-bold text-sm flex items-center justify-center transition-all ${
                        isCurrent
                          ? 'ring-2 ring-indigo-600 ring-offset-2 bg-indigo-600 text-white font-extrabold shadow-sm'
                          : isAnswered
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-slate-100 flex gap-2 mt-auto">
                <button
                  onClick={() => setShowMobilePalette(false)}
                  className="w-1/2 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm transition-all"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowMobilePalette(false);
                    handleSubmit();
                  }}
                  className="w-1/2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-md transition-all active:scale-95"
                >
                  Submit Quiz
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

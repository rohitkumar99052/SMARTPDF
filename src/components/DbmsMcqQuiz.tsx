import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  Shuffle, 
  Check, 
  Sparkles,
  Database,
  ListChecks,
  X,
  BookOpen,
  Filter,
  Eye,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DBMS_QUESTIONS, DBMS_ASSIGNMENTS, DbmsQuestion } from '../data/dbmsQuestions';

interface ShuffledOption {
  originalId: string;
  text: string;
}

interface ProcessedQuestion {
  question: DbmsQuestion;
  shuffledOptions: ShuffledOption[];
}

export const DbmsMcqQuiz: React.FC = () => {
  const [selectedAssignment, setSelectedAssignment] = useState<number>(0); // 0 = All 80, 1-8 = Assignments
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({}); // { questionId: optionId }
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [shuffleQuestions, setShuffleQuestions] = useState<boolean>(false);
  const [shuffleOptions, setShuffleOptions] = useState<boolean>(false);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'correct' | 'incorrect' | 'unanswered'>('all');
  const [quizKey, setQuizKey] = useState<number>(0);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [showMobilePalette, setShowMobilePalette] = useState<boolean>(false);

  // Filter raw questions based on selected assignment
  const baseQuestions = useMemo(() => {
    if (selectedAssignment === 0) {
      return DBMS_QUESTIONS;
    }
    return DBMS_QUESTIONS.filter(q => q.assignment === selectedAssignment);
  }, [selectedAssignment]);

  // Processed questions with optional shuffling
  const processedQuestions: ProcessedQuestion[] = useMemo(() => {
    let list = [...baseQuestions];

    if (shuffleQuestions) {
      // Deterministic Fisher-Yates based on key
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

  const handleSelectAssignment = (assignmentId: number) => {
    setSelectedAssignment(assignmentId);
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
  const percentage = Math.round((score / (processedQuestions.length || 1)) * 100);

  const answeredCount = Object.values(selectedAnswers).filter(Boolean).length;
  const progressPercent = Math.round((answeredCount / (processedQuestions.length || 1)) * 100);

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

  return (
    <div id="dbms-quiz-container" className="w-full max-w-5xl mx-auto space-y-3 sm:space-y-6">
      {/* Top Header Card */}
      <div id="dbms-header-banner" className="bg-gradient-to-br from-cyan-950 via-slate-900 to-blue-950 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl relative overflow-hidden border border-cyan-800/30">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-1.5 sm:space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-cyan-500/30 border border-cyan-400/30 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider text-cyan-200 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-cyan-400" /> DBMS Master Quiz
              </span>
              <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-[11px] sm:text-xs font-bold text-emerald-300 flex items-center gap-1">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> 80 Real Exam MCQs (Assignments 1–8)
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold tracking-tight">
              Database Management System Assessment
            </h2>
            <p className="text-cyan-200/90 text-xs sm:text-sm max-w-2xl leading-relaxed hidden sm:block">
              Covering Abstraction, Relational Algebra, SQL, Normalization, RAID, B+ Trees, 2PL, Recovery & Optimization. Shuffled for realistic exam practice!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              id="dbms-toggle-shuffle-questions-btn"
              onClick={() => {
                setShuffleQuestions(p => !p);
                setQuizKey(k => k + 1);
              }}
              className={`px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold flex items-center gap-1 sm:gap-1.5 transition-all border ${
                shuffleQuestions
                  ? 'bg-cyan-600/60 border-cyan-400 text-white shadow-sm'
                  : 'bg-white/10 border-white/20 text-cyan-200 hover:bg-white/20'
              }`}
              title="Shuffle Questions"
            >
              <Shuffle className="w-3.5 h-3.5" />
              {shuffleQuestions ? 'Q-Order Shuffled' : 'Sequential Qs'}
            </button>

            <button
              id="dbms-toggle-shuffle-options-btn"
              onClick={() => {
                setShuffleOptions(p => !p);
                setQuizKey(k => k + 1);
              }}
              className={`px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold flex items-center gap-1 sm:gap-1.5 transition-all border ${
                shuffleOptions
                  ? 'bg-cyan-600/60 border-cyan-400 text-white shadow-sm'
                  : 'bg-white/10 border-white/20 text-cyan-200 hover:bg-white/20'
              }`}
              title="Shuffle Options inside questions"
            >
              <Shuffle className="w-3.5 h-3.5" />
              {shuffleOptions ? 'Options Shuffled' : 'Fixed Options'}
            </button>

            <button
              id="dbms-reset-quiz-btn"
              onClick={resetQuiz}
              className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white text-slate-900 hover:bg-cyan-50 font-bold text-[11px] sm:text-xs rounded-lg sm:rounded-xl transition-all shadow-md flex items-center gap-1 active:scale-95 ml-auto sm:ml-0"
            >
              <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Reset Quiz
            </button>
          </div>
        </div>

        {/* 8 Assignment Selector Tabs */}
        <div className="mt-4 sm:mt-8 pt-3 sm:pt-6 border-t border-cyan-800/40">
          <div className="text-[11px] sm:text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-2 sm:mb-3 flex items-center justify-between">
            <span>Select Assignment (8 Assignments • 10 Qs each):</span>
            <span>{selectedAssignment === 0 ? 'All 80 Qs Mock Exam' : `Assignment ${selectedAssignment}`}</span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-1.5 sm:gap-2">
            {DBMS_ASSIGNMENTS.map(asgn => {
              const isCurrent = selectedAssignment === asgn.id;
              return (
                <button
                  key={asgn.id}
                  id={`dbms-tab-asgn-${asgn.id}`}
                  onClick={() => handleSelectAssignment(asgn.id)}
                  className={`p-1.5 sm:p-2.5 rounded-xl text-center transition-all border relative ${
                    isCurrent
                      ? 'bg-cyan-400 text-slate-950 border-cyan-300 shadow-md font-bold'
                      : 'bg-slate-900/60 border-cyan-900/40 text-cyan-100 hover:bg-cyan-950/60'
                  }`}
                >
                  <div className="text-[11px] sm:text-xs font-bold uppercase whitespace-nowrap">Asgn {asgn.id}</div>
                  <div className="text-[9px] opacity-80">10 Qs</div>
                </button>
              );
            })}

            {/* Option to practice All 80 Questions */}
            <button
              id="dbms-tab-all"
              onClick={() => handleSelectAssignment(0)}
              className={`p-1.5 sm:p-2.5 rounded-xl text-center transition-all border relative col-span-3 sm:col-span-1 ${
                selectedAssignment === 0
                  ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md font-bold'
                  : 'bg-slate-900/60 border-cyan-900/40 text-cyan-100 hover:bg-cyan-950/60'
              }`}
            >
              <div className="text-[11px] sm:text-xs font-bold uppercase whitespace-nowrap">All 80 Qs</div>
              <div className="text-[9px] opacity-80">Full Mock</div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area: Quiz Taking Mode vs Result Mode */}
      {!isSubmitted ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Main Question Panel (3 Columns) */}
          <div className="lg:col-span-3 space-y-2 sm:space-y-6">
            {/* Progress Tracker */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
              <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-3 flex-wrap">
                <span className="text-xs sm:text-sm font-bold text-slate-800">
                  Question {activeQuestionIndex + 1} of {processedQuestions.length}
                </span>
                <span className="text-[10px] sm:text-[11px] px-2 py-0.5 sm:py-1 bg-slate-100 text-slate-600 rounded-md font-medium">
                  {currentItem?.question.assignmentTitle}
                </span>
                <button
                  id="dbms-mobile-palette-toggle-btn"
                  onClick={() => setShowMobilePalette(true)}
                  className="lg:hidden ml-auto px-2 py-0.5 bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 text-cyan-800 text-[11px] font-bold rounded-lg flex items-center gap-1 active:scale-95 transition-all"
                >
                  <ListChecks className="w-3 h-3 text-cyan-600" />
                  <span>Palette ({answeredCount}/{processedQuestions.length})</span>
                </button>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-2.5">
                <span className="text-[11px] sm:text-xs text-slate-500 font-medium whitespace-nowrap">
                  {answeredCount} of {processedQuestions.length} Answered
                </span>
                <div className="w-20 sm:w-28 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-cyan-600 transition-all duration-300 rounded-full"
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
                    <span className="text-[10px] sm:text-xs font-bold text-cyan-700 uppercase tracking-wider">
                      Question {activeQuestionIndex + 1}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {currentItem.question.topic}
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
                        id={`dbms-option-${currentItem.question.id}-${opt.originalId}`}
                        onClick={() => handleSelectOption(currentItem.question.id, opt.originalId)}
                        className={`w-full px-2.5 py-2 sm:p-4 rounded-xl sm:rounded-2xl border text-left flex items-center gap-2.5 sm:gap-3.5 transition-all ${
                          isSelected
                            ? 'border-cyan-600 bg-cyan-50/90 shadow-xs ring-1 ring-cyan-500/30'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 bg-white'
                        }`}
                      >
                        <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-cyan-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {optionLetter}
                        </div>
                        <div className="flex-1 text-xs sm:text-sm md:text-base text-slate-800 font-medium leading-snug break-words">
                          {opt.text}
                        </div>
                        <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border sm:border-2 flex items-center justify-center shrink-0 transition-all ${
                          isSelected
                            ? 'border-cyan-600 bg-cyan-600 text-white'
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
                    id="dbms-prev-question-btn"
                    disabled={activeQuestionIndex === 0}
                    onClick={() => setActiveQuestionIndex(i => Math.max(0, i - 1))}
                    className="px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-lg sm:rounded-xl border border-slate-300 text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-1.5 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-all"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Previous
                  </button>

                  <div className="flex items-center gap-2 sm:gap-3">
                    {activeQuestionIndex < processedQuestions.length - 1 ? (
                      <button
                        id="dbms-next-question-btn"
                        onClick={() => setActiveQuestionIndex(i => Math.min(processedQuestions.length - 1, i + 1))}
                        className="px-4 py-2 sm:px-6 sm:py-2.5 bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-xs sm:text-sm rounded-lg sm:rounded-xl flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
                      >
                        Next <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                    ) : (
                      <button
                        id="dbms-submit-quiz-btn"
                        onClick={() => setShowConfirmModal(true)}
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

          {/* Desktop Side Question Navigator Panel (1 Column) */}
          <div className="hidden lg:block space-y-4">
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4 sticky top-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="font-bold text-slate-800 text-sm">Question Palette</h4>
                <span className="text-xs text-slate-500 font-medium">
                  {selectedAssignment === 0 ? 'All 80' : `Asgn ${selectedAssignment}`}
                </span>
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-md bg-cyan-600" />
                  <span>Answered ({answeredCount})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-md bg-slate-100 border border-slate-300" />
                  <span>Unanswered</span>
                </div>
              </div>

              {/* Numbered Grid */}
              <div className="grid grid-cols-5 gap-2 max-h-[380px] overflow-y-auto pr-1">
                {processedQuestions.map((item, idx) => {
                  const isAnswered = !!selectedAnswers[item.question.id];
                  const isCurrent = idx === activeQuestionIndex;
                  return (
                    <button
                      key={item.question.id}
                      onClick={() => setActiveQuestionIndex(idx)}
                      className={`h-9 rounded-xl font-bold text-xs flex items-center justify-center transition-all ${
                        isCurrent
                          ? 'ring-2 ring-cyan-600 ring-offset-2 bg-cyan-600 text-white font-extrabold shadow-sm'
                          : isAnswered
                          ? 'bg-cyan-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-slate-100">
                <button
                  onClick={() => setShowConfirmModal(true)}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" /> Submit Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Results Mode */
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          {/* Score Card */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm text-center space-y-4">
            <div className="inline-flex p-3 rounded-full bg-emerald-50 text-emerald-600 mb-2">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Quiz Completed!</h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              Review your DBMS performance below. Explanations are provided for every question.
            </p>

            <div className="flex items-center justify-center gap-8 py-4">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-extrabold text-cyan-700">{score} / {processedQuestions.length}</div>
                <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">Score</div>
              </div>
              <div className="h-10 w-px bg-slate-200" />
              <div className="text-center">
                <div className={`text-3xl sm:text-4xl font-extrabold ${percentage >= 70 ? 'text-emerald-600' : percentage >= 40 ? 'text-amber-600' : 'text-red-600'}`}>
                  {percentage}%
                </div>
                <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">Percentage</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={resetQuiz}
                className="px-6 py-2.5 bg-cyan-700 hover:bg-cyan-800 text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center gap-2 active:scale-95"
              >
                <RotateCcw className="w-4 h-4" /> Practice Again
              </button>
            </div>
          </div>

          {/* Review Filter Bar */}
          <div className="flex items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex-wrap">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
              <Filter className="w-4 h-4 text-slate-500" /> Filter Review:
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {(['all', 'correct', 'incorrect', 'unanswered'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setReviewFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                    reviewFilter === f
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Detailed Question Review List */}
          <div className="space-y-4">
            {reviewQuestions.map((item, index) => {
              const userAnswerId = selectedAnswers[item.question.id];
              const isCorrect = userAnswerId === item.question.correctOptionId;
              const isUnanswered = !userAnswerId;

              return (
                <div 
                  key={item.question.id}
                  className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs space-y-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-500 uppercase">
                      Question {index + 1} ({item.question.assignmentTitle} • {item.question.topic})
                    </span>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                      isCorrect ? 'bg-emerald-100 text-emerald-800' :
                      isUnanswered ? 'bg-amber-100 text-amber-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {isCorrect ? 'Correct' : isUnanswered ? 'Unanswered' : 'Incorrect'}
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-slate-900">
                    {item.question.question}
                  </h4>

                  <div className="space-y-2">
                    {item.question.options.map(opt => {
                      const isUserChoice = userAnswerId === opt.id;
                      const isCorrectChoice = opt.id === item.question.correctOptionId;

                      return (
                        <div
                          key={opt.id}
                          className={`p-3 rounded-xl border text-xs sm:text-sm flex items-center justify-between gap-3 ${
                            isCorrectChoice
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-medium'
                              : isUserChoice
                              ? 'bg-red-50 border-red-300 text-red-900'
                              : 'bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="font-bold uppercase w-5">{opt.id})</span>
                            <span>{opt.text}</span>
                          </div>
                          {isCorrectChoice && (
                            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 shrink-0">
                              <Check className="w-3.5 h-3.5" /> Correct Answer
                            </span>
                          )}
                          {isUserChoice && !isCorrectChoice && (
                            <span className="text-xs font-bold text-red-600 flex items-center gap-1 shrink-0">
                              <X className="w-3.5 h-3.5" /> Your Answer
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  <div className="p-3.5 bg-cyan-50/60 rounded-xl border border-cyan-100 text-xs text-slate-700 space-y-1">
                    <div className="font-bold text-cyan-900 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-cyan-700" /> Explanation:
                    </div>
                    <p className="leading-relaxed text-slate-800">{item.question.explanation}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowConfirmModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl space-y-4 z-10"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="text-center space-y-1">
                <h4 className="text-lg font-bold text-slate-900">Ready to Submit Quiz?</h4>
                <p className="text-xs text-slate-500">
                  You have answered <span className="font-bold text-cyan-700">{answeredCount}</span> of <span className="font-bold text-slate-700">{processedQuestions.length}</span> questions.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="w-1/2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-all"
                >
                  Keep Practicing
                </button>
                <button
                  onClick={handleSubmit}
                  className="w-1/2 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md transition-all active:scale-95"
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
                  <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-700 font-bold">
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
                  <div className="w-3 h-3 rounded bg-cyan-600" />
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-slate-100 border border-slate-300" />
                  <span>Unanswered</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded ring-2 ring-cyan-600 bg-white" />
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
                          ? 'ring-2 ring-cyan-600 ring-offset-2 bg-cyan-600 text-white font-extrabold shadow-sm'
                          : isAnswered
                          ? 'bg-cyan-600 text-white shadow-xs'
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
                    setShowConfirmModal(true);
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
};

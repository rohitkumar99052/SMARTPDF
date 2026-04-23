import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, AlertCircle, RefreshCw, Upload, Save, FileText, Check, ArrowUp, ArrowDown } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';

// Define the Question Type
interface Option {
  originalId: string;
  text: string;
}

interface Question {
  id: string;
  question: string;
  options: Option[];
  correctOptionId: string;
  explanation: string;
  correctAnswerString?: string;
}

interface ParsedQuestion {
  question: string;
  options: { id: string; text: string }[];
  answerId: string;
  explanation: string;
}

const STORAGE_KEY = 'nptel_mcq_data';

export default function NptelMcq() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuiz, setCurrentQuiz] = useState<{
    questions: Question[];
    answers: Record<string, string>; // questionId -> selectedOptionOriginalId
    isSubmitted: boolean;
    title: string;
  } | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractProgress, setExtractProgress] = useState(0);

  // Load from prebuilt data on mount
  useEffect(() => {
    import('../data/nptel_raw').then(({ nptelRawText }) => {
      if (nptelRawText) {
        const parsedQuestions: Question[] = [];
        const qBlocks = nptelRawText.split(/QUESTION\s+\d+:/i).slice(1);
        
        qBlocks.forEach((block, index) => {
          const qMatch = block.match(/([\s\S]*?)a[\.\)]/);
          const aMatch = block.match(/a[\.\)]\s*([\s\S]*?)b[\.\)]/);
          const bMatch = block.match(/b[\.\)]\s*([\s\S]*?)(?:c[\.\)]|Correct Answer:|d[\.\)])/);
          const cMatch = block.match(/c[\.\)]\s*([\s\S]*?)(?:d[\.\)]|Correct Answer:)/);
          const dMatch = block.match(/d[\.\)]\s*([\s\S]*?)Correct Answer:/i);
          const ansMatch = block.match(/Correct Answer:\s*([a-d])/i);
          const authMatchOriginal = block.match(/Correct Answer:\s*[\s\S]*?(?=Detailed Solution:|$|Introduction to)/i);
          const detMatch = block.match(/Detailed Solution:\s*([\s\S]*?)(?=_{10,}|$|Introduction to|QUESTION)/i);
          
          if (qMatch && ansMatch) {
            const options: Option[] = [];
            if (aMatch) options.push({ originalId: 'a', text: aMatch[1].trim() });
            if (bMatch) options.push({ originalId: 'b', text: bMatch[1].trim() });
            if (cMatch) options.push({ originalId: 'c', text: cMatch[1].trim() });
            if (dMatch) options.push({ originalId: 'd', text: dMatch[1].trim() });
            
            // Reconstruct the correct answer full line from the text if possible
            let fullCorrectAnswerString = authMatchOriginal ? authMatchOriginal[0].trim() : `Correct Answer: ${ansMatch[1].toLowerCase()}.`;
            
            parsedQuestions.push({
              id: `q_${index}`,
              question: qMatch[1].trim(),
              options,
              correctOptionId: ansMatch[1].toLowerCase(),
              explanation: detMatch ? detMatch[1].trim() : '',
              correctAnswerString: fullCorrectAnswerString
            });
          }
        });
        console.log("Total Questions Parsed:", parsedQuestions.length);
        setQuestions(parsedQuestions);
      }
    });
  }, []);

  // Handle Browser Back button locally inside the tool
  useEffect(() => {
    const handleLocationChange = () => {
      // If the back button is pressed and hash is cleared, nullify currentQuiz
      if (window.location.hash !== '#quiz') {
        setCurrentQuiz(null);
      }
    };
    
    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const shuffleArray = <T,>(arr: T[]): T[] => {
    const newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  const startQuiz = (totalQs: number, startIndex: number = 0, title: string = "FULL MOCK TEST") => {
    // Take the slice before randomizing the slice
    let slice = questions.slice(startIndex, startIndex + totalQs);
    
    // Randomize questions within the chunk
    let shuffledQuestions = shuffleArray(slice);
    
    // Randomize options for each question
    shuffledQuestions = shuffledQuestions.map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }));

    setCurrentQuiz({
      questions: shuffledQuestions,
      answers: {},
      isSubmitted: false,
      title: title
    });
    
    // Push hash to history stack so mobile back button returns to the section choice grid
    if (window.location.hash !== '#quiz') {
      window.history.pushState(null, '', window.location.pathname + '#quiz');
    }
  };

  const handleOptionSelect = (qId: string, optionId: string) => {
    if (currentQuiz?.isSubmitted) return;
    setCurrentQuiz(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        answers: {
          ...prev.answers,
          [qId]: optionId
        }
      };
    });
  };

  const submitQuiz = () => {
    setCurrentQuiz(prev => prev ? { ...prev, isSubmitted: true } : null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getScore = () => {
    if (!currentQuiz) return { correct: 0, total: 0, percentage: 0 };
    let correct = 0;
    currentQuiz.questions.forEach(q => {
      if (currentQuiz.answers[q.id] === q.correctOptionId) {
        correct++;
      }
    });
    return {
      correct,
      total: currentQuiz.questions.length,
      percentage: Math.round((correct / currentQuiz.questions.length) * 100)
    };
  };

  if (currentQuiz) {
    const score = getScore();
    return (
      <div className="w-full max-w-4xl mx-auto py-4 md:py-8 relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between items-start md:items-end mb-8 bg-white p-6 rounded-3xl shadow-sm border border-slate-100 gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">{currentQuiz.title}</h2>
            <p className="text-slate-500 font-medium">Attempting {currentQuiz.questions.length} Questions</p>
          </div>
          {currentQuiz.isSubmitted && (
            <div className="text-left md:text-right">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Your Score</p>
              <p className={`text-4xl font-black ${score.percentage >= 60 ? 'text-green-500' : 'text-red-500'}`}>
                {score.percentage}%
              </p>
              <p className="text-sm font-bold text-slate-500">{score.correct} / {score.total} Correct</p>
            </div>
          )}
        </div>

        <div className="space-y-6 md:space-y-8 relative">
          {currentQuiz.questions.map((q, index) => {
            const isAnswered = !!currentQuiz.answers[q.id];
            const selectedOpt = currentQuiz.answers[q.id];
            const isCorrect = selectedOpt === q.correctOptionId;

            return (
              <motion.div 
                key={q.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.01 }} // faster animation when there are 180 questions
                className={`bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-2 ${
                  !currentQuiz.isSubmitted 
                    ? 'border-transparent hover:border-blue-100' 
                    : isCorrect ? 'border-green-200 bg-green-50/30' : 'border-red-200 bg-red-50/30'
                } transition-all`}
              >
                <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center shrink-0">
                    {index + 1}
                  </div>
                  <div className="mt-0 md:mt-2 w-full">
                    <p className="text-base md:text-lg font-medium text-slate-800 whitespace-pre-wrap leading-relaxed">{q.question}</p>
                    
                    <div className="mt-4 md:mt-6 space-y-2 md:space-y-3">
                      {q.options.map(opt => {
                        const isSelected = selectedOpt === opt.originalId;
                        const isThisCorrectOpt = currentQuiz.isSubmitted && opt.originalId === q.correctOptionId;
                        const isThisWrongOpt = currentQuiz.isSubmitted && isSelected && !isCorrect;
                        
                        let optStyle = "border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-slate-600";
                        if (isSelected && !currentQuiz.isSubmitted) optStyle = "border-blue-500 bg-blue-50 text-blue-700 font-medium shadow-sm";
                        if (isThisCorrectOpt) optStyle = "border-green-500 bg-green-100 text-green-800 font-bold shadow-md";
                        if (isThisWrongOpt) optStyle = "border-red-500 bg-red-100 text-red-800 font-bold shadow-md";

                        return (
                          <button
                            key={opt.originalId}
                            onClick={() => handleOptionSelect(q.id, opt.originalId)}
                            className={`w-full text-left px-4 py-3 md:px-5 md:py-4 rounded-xl border-2 transition-all flex items-center gap-3 ${optStyle}`}
                          >
                            <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                              isSelected || isThisCorrectOpt ? (isThisCorrectOpt ? 'border-green-600 bg-green-500' : isThisWrongOpt ? 'border-red-600 bg-red-500' : 'border-blue-600 bg-blue-500') : 'border-slate-300'
                            }`}>
                              {(isSelected || isThisCorrectOpt) && <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-white" />}
                            </div>
                            <span className="text-sm md:text-base break-words flex-1">{opt.text}</span>
                            
                            {isThisCorrectOpt && <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 shrink-0 ml-auto text-green-600" />}
                            {isThisWrongOpt && <XCircle className="w-4 h-4 md:w-5 md:h-5 shrink-0 ml-auto text-red-600" />}
                          </button>
                        );
                      })}
                    </div>

                    {currentQuiz.isSubmitted && (
                      <div className="mt-4 md:mt-6 bg-slate-50 border border-slate-200 rounded-xl p-4 md:p-5 shadow-sm">
                        <div className={q.explanation ? "mb-2 md:mb-3" : ""}>
                          <p className="text-xs md:text-sm font-bold text-green-700 flex items-center gap-2">
                            <Check className="w-4 h-4 md:w-5 md:h-5" /> <span className="break-words">{q.correctAnswerString || `Correct Answer: ${q.correctOptionId}`}</span>
                          </p>
                        </div>
                        {q.explanation && (
                          <div className="pt-2 md:pt-3 border-t border-slate-200">
                            <p className="text-xs md:text-sm font-bold text-slate-700 mb-1 flex items-center gap-2">
                              <AlertCircle className="w-4 h-4 text-blue-500" /> Detailed Solution
                            </p>
                            <p className="text-xs md:text-sm text-slate-600 whitespace-pre-wrap">{q.explanation}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-8 md:mt-12 flex justify-center gap-4 px-4 md:px-0">
          {!currentQuiz.isSubmitted ? (
            <button 
              onClick={submitQuiz}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 md:px-12 py-4 rounded-full font-black text-lg md:text-xl hover:shadow-lg hover:shadow-purple-200 active:scale-95 transition-all w-full max-w-md"
            >
              SUBMIT EXAM
            </button>
          ) : (
            <button 
              onClick={() => {
                if (window.location.hash === '#quiz') {
                  window.history.back();
                } else {
                  setCurrentQuiz(null);
                }
              }}
              className="bg-slate-900 text-white px-8 md:px-12 py-4 rounded-full font-black text-lg md:text-xl hover:shadow-lg active:scale-95 transition-all w-full max-w-md"
            >
              FINISH & GO BACK
            </button>
          )}
        </div>

        {/* Floating Scroll Navigation */}
        <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="p-3 bg-white/80 backdrop-blur border border-slate-200 text-slate-700 rounded-full shadow-lg hover:bg-slate-100 transition-colors"
            title="Scroll to Top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
          <button 
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })} 
            className="p-3 bg-white/80 backdrop-blur border border-slate-200 text-slate-700 rounded-full shadow-lg hover:bg-slate-100 transition-colors"
            title="Scroll to Bottom"
          >
            <ArrowDown className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-12 text-center">
      <div className="w-24 h-24 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-3xl mx-auto flex items-center justify-center shadow-2xl shadow-pink-200 mb-8 transform rotate-3 hover:rotate-0 transition-transform">
        <FileText className="w-12 h-12 text-white" />
      </div>
      <h1 className="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 mb-4 animate-gradient-x">
        NPTEL IOT ALL MCQ
      </h1>
      <p className="text-lg text-slate-500 mb-12 max-w-2xl mx-auto">
        Test your knowledge with {questions.length > 0 ? questions.length : '180+'} objective questions. The system strictly randomizes question order and option placement for a real exam experience.
      </p>

      {questions.length > 0 ? (
        <div className="space-y-6">
          <div className="bg-white p-4 md:p-8 rounded-3xl shadow-xl border border-slate-100 w-full max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-black text-slate-800 mb-2">{questions.length} Questions</h3>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs md:text-sm mb-6 md:mb-8">Select Exam Section</p>
            
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mb-8">
              {Array.from({ length: Math.ceil(questions.length / 30) }).map((_, i) => {
                const start = i * 30;
                const setSize = Math.min(30, questions.length - start);
                return (
                  <button 
                    key={i}
                    onClick={() => startQuiz(setSize, start, `NPTEL Mock Test: Part ${i + 1}`)}
                    className="flex flex-col items-center justify-center bg-slate-50 hover:bg-purple-50 border-2 border-slate-100 hover:border-purple-200 p-4 md:p-6 rounded-2xl transition-all hover:scale-[1.02] active:scale-95 group"
                  >
                    <span className="text-lg md:text-xl font-bold text-slate-700 group-hover:text-purple-700 transition-colors">Part {i + 1}</span>
                    <span className="text-xs md:text-sm font-medium text-slate-500 mt-1 md:mt-2">{setSize} Questions</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-6 md:pt-8 border-t border-slate-100">
              <button 
                onClick={() => startQuiz(questions.length, 0, "FULL COMPREHENSIVE TEST")}
                className="w-full max-w-md mx-auto bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-lg md:text-xl hover:shadow-xl hover:shadow-pink-200 active:scale-95 transition-all px-4"
              >
                ATTEMPT ALL {questions.length} QUESTIONS
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-12 rounded-3xl shadow-xl border border-slate-100 max-w-2xl mx-auto">
          <div className="flex flex-col items-center justify-center gap-4">
            <RefreshCw className="w-12 h-12 text-purple-500 animate-spin" />
            <h3 className="text-2xl font-bold text-slate-800">Loading Exam System...</h3>
            <p className="text-slate-500">Preparing and shuffling all questions from your provided curriculum.</p>
          </div>
        </div>
      )}
    </div>
  );
}

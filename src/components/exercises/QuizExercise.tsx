import React, { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { QuizQuestion } from '../../types/curriculum';
import { CourseDatabaseService } from '../../services/courseDatabase';

export const QuizExercise: React.FC<{
  exerciseId: string;
  questions: QuizQuestion[];
  onComplete?: () => void;
}> = ({ exerciseId, questions, onComplete }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const handleSelect = (questionId: string, optionIdx: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx
    }));
  };

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswerIndex) {
        correct++;
      }
    });

    const calculatedScore = Math.round((correct / questions.length) * 100);
    const passed = calculatedScore >= 75;
    setScore(calculatedScore);
    setSubmitted(true);

    CourseDatabaseService.recordExerciseSubmission(exerciseId, calculatedScore, 100, passed, {
      correctAnswers: correct,
      totalQuestions: questions.length
    });

    if (passed && onComplete) {
      onComplete();
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setScore(null);
  };

  const allAnswered = questions.every((q) => selectedAnswers[q.id] !== undefined);

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-sky-700 uppercase tracking-wider">Mastery Assessment</span>
          <h4 className="text-base font-bold text-slate-900 mt-0.5">Knowledge Check Quiz</h4>
        </div>
        <div className="flex items-center gap-2">
          {submitted && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-md hover:bg-slate-50"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Retake Quiz
            </button>
          )}
          {!submitted && (
            <button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium rounded-md shadow-xs ${
                allAnswered
                  ? 'bg-sky-600 text-white hover:bg-sky-700'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Submit Quiz ({Object.keys(selectedAnswers).length}/{questions.length})
            </button>
          )}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {questions.map((q, idx) => {
          const userChoice = selectedAnswers[q.id];
          const isAnswered = userChoice !== undefined;
          const isCorrect = userChoice === q.correctAnswerIndex;

          return (
            <div key={q.id} className="p-4 rounded-lg border border-slate-200 bg-slate-50/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-400 font-mono">Question {idx + 1} of {questions.length}</span>
                <span className="text-xs text-slate-500">{q.contextTag}</span>
              </div>
              <h5 className="text-sm font-semibold text-slate-900 mb-3">{q.question}</h5>

              <div className="space-y-2">
                {q.options.map((opt, optIdx) => {
                  const isThisSelected = userChoice === optIdx;
                  const isThisCorrect = q.correctAnswerIndex === optIdx;

                  let optionStyle = 'border-slate-200 bg-white hover:border-slate-300';
                  if (submitted) {
                    if (isThisCorrect) {
                      optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-medium';
                    } else if (isThisSelected && !isThisCorrect) {
                      optionStyle = 'border-rose-500 bg-rose-50 text-rose-900';
                    } else {
                      optionStyle = 'border-slate-200 bg-white opacity-60';
                    }
                  } else if (isThisSelected) {
                    optionStyle = 'border-sky-500 bg-sky-50/50 ring-1 ring-sky-500 font-medium';
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={submitted}
                      onClick={() => handleSelect(q.id, optIdx)}
                      className={`w-full text-left p-3 rounded-lg border text-xs flex items-center justify-between transition-colors ${optionStyle}`}
                    >
                      <span className="leading-snug">{opt}</span>
                      {submitted && isThisCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                      {submitted && isThisSelected && !isThisCorrect && <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div className={`mt-3 p-3 rounded-md text-xs ${isCorrect ? 'bg-emerald-50/60 text-emerald-900' : 'bg-amber-50/60 text-amber-900'}`}>
                  <span className="font-bold">{isCorrect ? 'Correct!' : 'Incorrect explanation:'} </span>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {submitted && score !== null && (
        <div className={`p-5 border-t ${score >= 75 ? 'bg-emerald-50 text-emerald-900' : 'bg-amber-50 text-amber-900'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-sm">
                {score >= 75 ? 'Module Assessment Passed!' : 'Passing Threshold is 75%'}
              </p>
              <p className="text-xs mt-0.5">
                {score >= 75
                  ? 'Your score has been registered in your competency record.'
                  : 'Review the module lessons and retry the questions to earn full credit.'}
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold font-mono">{score}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

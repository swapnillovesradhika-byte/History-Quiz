import React, { useState } from 'react';
import { QUESTIONS } from './constants';
import { AppState, StudentInfo, UserResponse } from './types';
import StartScreen from './components/StartScreen';
import QuizQuestion from './components/QuizQuestion';
import CompletionScreen from './components/CompletionScreen';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.START);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<UserResponse>({});
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);

  const handleStart = (info: StudentInfo) => {
    setStudentInfo(info);
    setAppState(AppState.QUIZ);
    setCurrentQuestionIndex(0);
    setResponses({});
    window.scrollTo(0, 0);
  };

  const handleOptionSelect = (option: string) => {
    const questionId = QUESTIONS[currentQuestionIndex].id;
    setResponses((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      window.scrollTo(0, 0);
    } else {
      setAppState(AppState.COMPLETED);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleReset = () => {
    setAppState(AppState.START);
    setStudentInfo(null);
    setResponses({});
    setCurrentQuestionIndex(0);
  };

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / QUESTIONS.length) * 100;
  const isAnswered = !!responses[currentQuestion.id];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-900 rounded text-white flex items-center justify-center font-bold text-xs">
              FA
            </div>
            <span className="font-bold text-gray-800 text-lg hidden sm:block">FACE ACADEMY</span>
          </div>
          {appState === AppState.QUIZ && (
            <div className="text-sm font-medium text-gray-500">
              {studentInfo?.name}
            </div>
          )}
        </div>
        {appState === AppState.QUIZ && (
          <div className="w-full bg-gray-200 h-1.5">
            <div 
              className="bg-orange-500 h-1.5 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4 md:p-6 lg:p-8">
        {appState === AppState.START && (
          <StartScreen onStart={handleStart} />
        )}

        {appState === AppState.QUIZ && (
          <div className="flex flex-col h-full max-w-4xl mx-auto">
            <QuizQuestion 
              question={currentQuestion}
              selectedOption={responses[currentQuestion.id]}
              onSelectOption={handleOptionSelect}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={QUESTIONS.length}
            />

            <div className="max-w-2xl mx-auto w-full flex justify-between mt-auto pt-6 border-t border-gray-200">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className={`px-6 py-2.5 rounded-lg font-medium transition-colors
                  ${currentQuestionIndex === 0 
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
              >
                Previous
              </button>
              
              <button
                onClick={handleNext}
                className={`px-8 py-2.5 rounded-lg font-bold shadow-md transition-all transform active:scale-95
                  ${isAnswered 
                    ? 'bg-blue-900 text-white hover:bg-blue-800' 
                    : 'bg-gray-200 text-gray-500 cursor-default' // Make it look disabled but allow clicking if you want to allow skipping, but typically quizzes enforce answers. I'll allow clicking but maybe style differently? Actually let's enforce answer.
                  } ${!isAnswered ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}
                `}
                disabled={!isAnswered}
              >
                {currentQuestionIndex === QUESTIONS.length - 1 ? 'Submit' : 'Next'}
              </button>
            </div>
          </div>
        )}

        {appState === AppState.COMPLETED && studentInfo && (
          <CompletionScreen 
            studentInfo={studentInfo}
            responses={responses}
            onReset={handleReset}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} FACE Academy | Modern Indian History Worksheet
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
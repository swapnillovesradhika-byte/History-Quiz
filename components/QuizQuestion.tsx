import React from 'react';
import { Question } from '../types';

interface QuizQuestionProps {
  question: Question;
  selectedOption: string | undefined;
  onSelectOption: (option: string) => void;
  questionNumber: number;
  totalQuestions: number;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ 
  question, 
  selectedOption, 
  onSelectOption, 
  questionNumber,
  totalQuestions
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6 flex justify-between items-end">
        <span className="text-sm font-semibold text-orange-500 uppercase tracking-wider">
          Question {questionNumber} of {totalQuestions}
        </span>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 mb-6 border border-gray-100">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-8 leading-snug">
          {question.question}
        </h3>

        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedOption === option;
            // Generate A, B, C, D labels
            const label = String.fromCharCode(65 + index);
            
            return (
              <button
                key={option}
                onClick={() => onSelectOption(option)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 flex items-center group
                  ${isSelected 
                    ? 'border-blue-600 bg-blue-50 text-blue-900' 
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50 text-gray-700'
                  }`}
              >
                <span 
                  className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold mr-4 transition-colors
                    ${isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-blue-200 group-hover:text-blue-700'}
                  `}
                >
                  {label}
                </span>
                <span className="text-lg">{option}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuizQuestion;
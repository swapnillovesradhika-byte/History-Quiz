import React from 'react';
import { StudentInfo, UserResponse } from '../types';
import { QUESTIONS } from '../constants';

interface CompletionScreenProps {
  studentInfo: StudentInfo;
  responses: UserResponse;
  onReset: () => void;
}

const CompletionScreen: React.FC<CompletionScreenProps> = ({ studentInfo, responses, onReset }) => {
  
  const handleDownload = () => {
    let content = `FACE ACADEMY - MODERN INDIAN HISTORY WORKSHEET\n`;
    content += `------------------------------------------------\n`;
    content += `Student Name: ${studentInfo.name}\n`;
    content += `Date: ${studentInfo.date}\n`;
    content += `Topic: The Genesis of Dominion\n`;
    content += `------------------------------------------------\n\n`;

    QUESTIONS.forEach((q, idx) => {
      content += `${idx + 1}. ${q.question}\n`;
      content += `Answer: ${responses[q.id] || "Not Answered"}\n\n`;
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${studentInfo.name.replace(/\s+/g, '_')}_History_Worksheet.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const answeredCount = Object.keys(responses).length;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Worksheet Submitted!</h2>
        <p className="text-gray-600 mb-6">
          Thank you, <span className="font-semibold text-gray-900">{studentInfo.name}</span>. 
          Your responses have been recorded successfully.
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mb-8 text-left">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Questions Answered:</span>
            <span className="font-medium text-gray-900">{answeredCount} / {QUESTIONS.length}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Submission Date:</span>
            <span className="font-medium text-gray-900">{studentInfo.date}</span>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-6 italic">
          Please download your response receipt for your records or to send to your teacher manually.
        </p>

        <div className="space-y-3">
          <button
            onClick={handleDownload}
            className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-900 hover:bg-blue-800 shadow-sm transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Receipt
          </button>
          
          <button
            onClick={onReset}
            className="w-full flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            Start New Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompletionScreen;
import React, { useState } from 'react';
import { StudentInfo } from '../types';

interface StartScreenProps {
  onStart: (info: StudentInfo) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onStart({ name, date });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full border-t-4 border-blue-900">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">FACE ACADEMY</h1>
          <p className="text-orange-500 font-medium tracking-wide text-sm uppercase">Excellence in Education</p>
          <div className="h-1 w-20 bg-gray-200 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 text-center">Class 8 History Worksheet</h2>
          <p className="text-gray-500 text-center text-sm mt-1">Topic: The Genesis of Dominion</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Student Name
            </label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              id="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-4 rounded-lg shadow-lg transform transition hover:-translate-y-0.5 active:translate-y-0 duration-200"
          >
            Start Quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default StartScreen;
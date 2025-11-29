export interface Question {
  id: number;
  question: string;
  options: string[];
}

export interface UserResponse {
  [questionId: number]: string;
}

export interface StudentInfo {
  name: string;
  date: string;
}

export enum AppState {
  START = 'START',
  QUIZ = 'QUIZ',
  COMPLETED = 'COMPLETED',
}
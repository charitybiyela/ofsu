import { create } from 'zustand';
import { questions } from '../data/questions';
import { calculatePersonalityType } from '../utils/personalityCalculator';

interface TestState {
  selectedLanguage: string | null;
  testStarted: boolean;
  currentQuestion: number;
  questions: typeof questions;
  answers: (number | null)[];
  completed: boolean;
  personalityType: string;
  traits: Record<string, number>;
  setTestStarted: (started: boolean) => void;
  setAnswers: (answers: number[]) => void;
}

export const useTestStore = create<TestState>((set) => ({
  selectedLanguage: null,
  testStarted: false,
  currentQuestion: 0,
  questions,
  answers: new Array(questions.length).fill(null),
  completed: false,
  personalityType: 'INTJ', // Default type
  traits: {
    Extraversion: 50,
    Sensing: 50,
    Thinking: 50,
    Judging: 50
  },
  setTestStarted: (started) => set({ testStarted: started }),
  setAnswers: (answers) => {
    const result = calculatePersonalityType(answers);
    set({ 
      answers,
      personalityType: result.personalityType,
      traits: result.traits,
      completed: true 
    });
  }
}));
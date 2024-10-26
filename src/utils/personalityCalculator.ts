interface Traits {
  [key: string]: number;
}

export function calculatePersonalityType(answers: number[]): {
  personalityType: string;
  traits: Traits;
} {
  // Initialize counters for each dimension
  let E = 0, I = 0, S = 0, N = 0, T = 0, F = 0, J = 0, P = 0;

  // Process each answer
  answers.forEach((answer, index) => {
    if (answer === null) return;

    const trait = questions[index]?.trait;
    const value = answer;

    switch (trait) {
      case 'EI':
        value > 0 ? E += Math.abs(value) : I += Math.abs(value);
        break;
      case 'SN':
        value > 0 ? S += Math.abs(value) : N += Math.abs(value);
        break;
      case 'TF':
        value > 0 ? T += Math.abs(value) : F += Math.abs(value);
        break;
      case 'JP':
        value > 0 ? J += Math.abs(value) : P += Math.abs(value);
        break;
    }
  });

  // Ensure minimum values to prevent division by zero
  E = E || 1;
  I = I || 1;
  S = S || 1;
  N = N || 1;
  T = T || 1;
  F = F || 1;
  J = J || 1;
  P = P || 1;

  // Determine personality type
  const type = [
    E >= I ? 'E' : 'I',
    S >= N ? 'S' : 'N',
    T >= F ? 'T' : 'F',
    J >= P ? 'J' : 'P'
  ].join('');

  // Calculate trait percentages
  const traits = {
    Extraversion: Math.round((E / (E + I)) * 100),
    Sensing: Math.round((S / (S + N)) * 100),
    Thinking: Math.round((T / (T + F)) * 100),
    Judging: Math.round((J / (J + P)) * 100)
  };

  return {
    personalityType: type,
    traits
  };
}

import { questions } from '../data/questions';
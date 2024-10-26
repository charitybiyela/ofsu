import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface TestQuestionProps {
  question: {
    text: string;
    trait: string;
  };
  onAnswer: (value: number) => void;
}

function TestQuestion({ question, onAnswer }: TestQuestionProps) {
  const { t } = useTranslation();
  
  const options = [
    { value: -2, label: t('Strongly Disagree') },
    { value: -1, label: t('Disagree') },
    { value: 0, label: t('Neutral') },
    { value: 1, label: t('Agree') },
    { value: 2, label: t('Strongly Agree') },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h2 className="text-2xl font-semibold text-gray-900 mb-8">
        {t(question.text)}
      </h2>

      <div className="space-y-4">
        {options.map((option) => (
          <motion.button
            key={option.value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onAnswer(option.value)}
            className="w-full p-4 text-left rounded-lg border-2 border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all"
          >
            <span className="text-lg font-medium text-gray-900">
              {option.label}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

export default TestQuestion;
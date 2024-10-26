import React from 'react';
import { motion } from 'framer-motion';
import { Share2, Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTestStore } from '../store/testStore';
import { getPersonalityData } from '../utils/personalityData';

function ResultsPage() {
  const { t } = useTranslation();
  const { personalityType, traits } = useTestStore();
  
  // Get personality data and provide fallback for safety
  const personalityData = personalityType ? getPersonalityData(personalityType) : null;
  
  if (!personalityData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading results...</p>
      </div>
    );
  }

  const shareOnFacebook = () => {
    const text = `I am a ${personalityData.title} (${personalityType})! ${window.location.origin}`;
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const downloadResults = () => {
    const element = document.createElement('a');
    const results = {
      type: personalityType,
      title: personalityData.title,
      description: personalityData.description,
      traits: traits
    };
    const file = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `personality-results-${personalityType}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen py-12 px-4"
    >
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white text-center">
          <h1 className="text-4xl font-bold mb-4">
            {personalityData.title}
          </h1>
          <h2 className="text-6xl font-bold mb-4">
            {personalityType}
          </h2>
        </div>

        <div className="p-8">
          <div className="mb-8">
            <img
              src={personalityData.imageUrl}
              alt={personalityData.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
            <p className="text-xl leading-relaxed text-gray-700">
              {personalityData.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {Object.entries(traits).map(([trait, value]) => (
              <div key={trait} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">
                  {trait}
                </h3>
                <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    className="absolute h-full bg-indigo-600 rounded-full"
                  />
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  {value}%
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={shareOnFacebook}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Share2 className="w-5 h-5" />
              {t('Share on Facebook')}
            </button>
            <button
              onClick={downloadResults}
              className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
            >
              <Download className="w-5 h-5" />
              {t('Download Results')}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ResultsPage;
import React from 'react';
import { EmotionType, EMOTIONS } from '../types';

interface EmotionPickerProps {
  selectedEmotion: EmotionType;
  onSelect: (emotion: EmotionType) => void;
}

const EmotionPicker: React.FC<EmotionPickerProps> = ({ selectedEmotion, onSelect }) => {
  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        How did you feel?
      </label>
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
        {EMOTIONS.map((emotion) => (
          <button
            key={emotion.label}
            type="button"
            onClick={() => onSelect(emotion)}
            className={`
              flex flex-col items-center p-2 rounded-lg transition-all duration-200
              ${selectedEmotion.label === emotion.label 
                ? 'bg-blue-100 ring-2 ring-blue-500 transform scale-105' 
                : 'bg-white hover:bg-gray-50 border border-gray-200'}
            `}
          >
            <span className="text-2xl mb-1" role="img" aria-label={emotion.label}>
              {emotion.emoji}
            </span>
            <span className="text-xs text-gray-700">{emotion.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmotionPicker;
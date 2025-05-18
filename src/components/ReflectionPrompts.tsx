import React from 'react';
import { REFLECTION_PROMPTS } from '../types';
import { Lightbulb } from 'lucide-react';

interface ReflectionPromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

const ReflectionPrompts: React.FC<ReflectionPromptsProps> = ({ onSelectPrompt }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        <Lightbulb className="inline-block mr-2 text-yellow-500" size={20} />
        Reflection Prompts
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {REFLECTION_PROMPTS.map((prompt, index) => (
          <button
            key={index}
            onClick={() => onSelectPrompt(prompt)}
            className="text-left p-3 rounded-md border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
          >
            <p className="text-sm text-gray-600">{prompt}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReflectionPrompts;
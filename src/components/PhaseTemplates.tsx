import React from 'react';
import { LIFE_PHASES } from '../types';
import { PlusCircle } from 'lucide-react';

interface PhaseTemplatesProps {
  onSelectTemplate: (title: string, emotion: any) => void;
}

const PhaseTemplates: React.FC<PhaseTemplatesProps> = ({ onSelectTemplate }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Life Phase Templates</h3>
      <div className="space-y-4">
        {LIFE_PHASES.map((phase, index) => (
          <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
            <h4 className="text-md font-medium text-gray-700 mb-2">{phase.category}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {phase.events.map((event, eventIndex) => (
                <button
                  key={eventIndex}
                  onClick={() => onSelectTemplate(event.title, event.emotion)}
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-blue-50 transition-colors text-left"
                >
                  <PlusCircle size={16} className="text-blue-500" />
                  <span className="text-sm text-gray-600">{event.title}</span>
                  <span className="text-lg">{event.emotion.emoji}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhaseTemplates;
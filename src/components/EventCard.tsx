import React, { useState } from 'react';
import { LifeEvent } from '../types';
import { ChevronDown, ChevronUp, Edit, Trash2 } from 'lucide-react';

interface EventCardProps {
  event: LifeEvent;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onEdit, onDelete }) => {
  const [expanded, setExpanded] = useState(false);

  const formatDateRange = () => {
    if (!event.endDate) {
      return event.startDate;
    }
    return `${event.startDate} - ${event.endDate}`;
  };

  return (
    <div className="mb-8 relative">
      <div className="absolute top-0 left-0 bottom-0 w-0.5 bg-blue-200"></div>
      <div className="absolute top-0 left-0 w-4 h-4 -ml-2 rounded-full bg-blue-500 shadow-md"></div>
      
      <div className="ml-8">
        <div 
          className={`
            p-4 rounded-lg shadow-sm border-l-4 transform transition-all duration-300
            ${expanded ? 'shadow-md border-blue-500' : 'border-gray-200 hover:border-blue-300'}
            cursor-pointer bg-white
          `}
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-gray-800 flex items-center">
                <span className="mr-2">{event.emotion.emoji}</span>
                {event.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{formatDateRange()}</p>
            </div>
            <div className="flex items-center space-x-1">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(event.id);
                }}
                className="p-1 text-gray-500 hover:text-blue-500 rounded-full hover:bg-blue-50 transition-colors"
              >
                <Edit size={16} />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm("Are you sure you want to delete this memory?")) {
                    onDelete(event.id);
                  }
                }}
                className="p-1 text-gray-500 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
              >
                <Trash2 size={16} />
              </button>
              {expanded ? (
                <ChevronUp size={20} className="text-gray-500" />
              ) : (
                <ChevronDown size={20} className="text-gray-500" />
              )}
            </div>
          </div>
          
          {expanded && (
            <div className="mt-3 pt-3 border-t border-gray-100 text-gray-700 transition-all duration-300">
              <p className="whitespace-pre-line">{event.description}</p>
              <div className="flex mt-2">
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-700 flex items-center">
                  {event.emotion.emoji} {event.emotion.label}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
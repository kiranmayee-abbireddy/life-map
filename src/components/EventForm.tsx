import React, { useState, useEffect } from 'react';
import { LifeEvent, EmotionType, EMOTIONS } from '../types';
import EmotionPicker from './EmotionPicker';
import { X } from 'lucide-react';

interface EventFormProps {
  event?: LifeEvent;
  onSave: (event: Omit<LifeEvent, 'id'> & { id?: string }) => void;
  onCancel: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ event, onSave, onCancel }) => {
  const [title, setTitle] = useState(event?.title || '');
  const [startDate, setStartDate] = useState(event?.startDate || '');
  const [endDate, setEndDate] = useState(event?.endDate || '');
  const [description, setDescription] = useState(event?.description || '');
  const [emotion, setEmotion] = useState<EmotionType>(
    event?.emotion || EMOTIONS[0]
  );
  const [hasEndDate, setHasEndDate] = useState(!!event?.endDate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formattedEvent = {
      id: event?.id,
      title,
      startDate,
      endDate: hasEndDate ? endDate : undefined,
      description,
      emotion,
    };
    
    onSave(formattedEvent);
  };

  useEffect(() => {
    // Auto-focus the title input when the form opens
    const titleInput = document.getElementById('event-title');
    if (titleInput) {
      titleInput.focus();
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            {event ? 'Edit Life Event' : 'Add New Life Event'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label htmlFor="event-title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              id="event-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="What would you call this chapter?"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <div className="flex items-center">
                  <input
                    id="has-end-date"
                    type="checkbox"
                    checked={hasEndDate}
                    onChange={(e) => setHasEndDate(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="has-end-date" className="ml-2 text-xs text-gray-500">
                    Include end date
                  </label>
                </div>
              </div>
              <input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                disabled={!hasEndDate}
                required={hasEndDate}
                min={startDate}
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-32"
              placeholder="Reflect on this moment or period in your life..."
              required
            />
          </div>
          
          <EmotionPicker selectedEmotion={emotion} onSelect={setEmotion} />
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {event ? 'Save Changes' : 'Add to Timeline'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
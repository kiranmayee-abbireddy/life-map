import React from 'react';
import { LifeEvent } from '../types';
import EventCard from './EventCard';

interface TimelineProps {
  events: LifeEvent[];
  onEditEvent: (id: string) => void;
  onDeleteEvent: (id: string) => void;
}

const Timeline: React.FC<TimelineProps> = ({ events, onEditEvent, onDeleteEvent }) => {
  // Sort events by startDate (newest first)
  const sortedEvents = [...events].sort((a, b) => 
    new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );
  
  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-5xl mb-4">📝</div>
        <h3 className="text-xl font-medium text-gray-700 mb-2">Your timeline is empty</h3>
        <p className="text-gray-500 max-w-md mb-6">
          Start adding significant moments from your life journey to visualize and reflect on your path.
        </p>
      </div>
    );
  }

  return (
    <div className="py-6">
      {sortedEvents.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onEdit={onEditEvent}
          onDelete={onDeleteEvent}
        />
      ))}
    </div>
  );
};

export default Timeline;
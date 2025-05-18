import { useState, useEffect } from 'react';
import { LifeEvent } from '../types';
import { getEvents, saveEvents } from '../utils/storage';

export const useLifeEvents = () => {
  const [events, setEvents] = useState<LifeEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load events from local storage on mount
  useEffect(() => {
    const storedEvents = getEvents();
    setEvents(storedEvents);
    setIsLoading(false);
  }, []);

  // Save events to local storage whenever they change
  useEffect(() => {
    if (!isLoading) {
      saveEvents(events);
    }
  }, [events, isLoading]);

  const addEvent = (newEvent: Omit<LifeEvent, 'id'>) => {
    const event: LifeEvent = {
      ...newEvent,
      id: Date.now().toString(),
    };
    setEvents((prevEvents) => [...prevEvents, event]);
  };

  const updateEvent = (updatedEvent: LifeEvent) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  const deleteEvent = (id: string) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  return {
    events,
    isLoading,
    addEvent,
    updateEvent,
    deleteEvent,
  };
};
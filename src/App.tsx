import React, { useState } from 'react';
import Timeline from './components/Timeline';
import EventForm from './components/EventForm';
import Header from './components/Header';
import MoodGraph from './components/MoodGraph';
import PhaseTemplates from './components/PhaseTemplates';
import ReflectionPrompts from './components/ReflectionPrompts';
import { LifeEvent, EmotionType } from './types';
import { useLifeEvents } from './hooks/useLifeEvents';

function App() {
  const { events, isLoading, addEvent, updateEvent, deleteEvent } = useLifeEvents();
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<LifeEvent | undefined>();
  const [showTemplates, setShowTemplates] = useState(false);

  const handleAddEvent = () => {
    setEditingEvent(undefined);
    setShowEventForm(true);
  };

  const handleEditEvent = (id: string) => {
    const event = events.find((e) => e.id === id);
    if (event) {
      setEditingEvent(event);
      setShowEventForm(true);
    }
  };

  const handleSaveEvent = (event: Omit<LifeEvent, 'id'> & { id?: string }) => {
    if (event.id) {
      updateEvent(event as LifeEvent);
    } else {
      addEvent(event);
    }
    setShowEventForm(false);
  };

  const handleTemplateSelect = (title: string, emotion: EmotionType) => {
    setEditingEvent({
      title,
      emotion,
      startDate: new Date().toISOString().split('T')[0],
      description: '',
    } as LifeEvent);
    setShowEventForm(true);
    setShowTemplates(false);
  };

  const handlePromptSelect = (prompt: string) => {
    if (editingEvent) {
      setEditingEvent({
        ...editingEvent,
        description: editingEvent.description + '\n\n' + prompt + '\n',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading your journey...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAddEvent={handleAddEvent} events={events} />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Your Life Journey</h1>
              <p className="text-gray-500 mb-6">
                Reflect on your path, celebrate growth, and visualize your story.
              </p>
              
              {events.length > 0 && <MoodGraph events={events} />}
              
              <Timeline 
                events={events} 
                onEditEvent={handleEditEvent} 
                onDeleteEvent={deleteEvent} 
              />
              
              <div className="text-center mt-8 space-x-4">
                <button
                  onClick={handleAddEvent}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {events.length > 0 ? 'Add Another Memory' : 'Start Your Timeline'}
                </button>
                <button
                  onClick={() => setShowTemplates(!showTemplates)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Browse Templates
                </button>
              </div>
            </div>
          </div>

          {showTemplates && (
            <PhaseTemplates onSelectTemplate={handleTemplateSelect} />
          )}
        </div>
      </main>
      
      {showEventForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-start justify-center pt-16 px-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <EventForm
              event={editingEvent}
              onSave={handleSaveEvent}
              onCancel={() => {
                setShowEventForm(false);
                setEditingEvent(undefined);
              }}
            />
            <div className="p-6 border-t border-gray-200">
              <ReflectionPrompts onSelectPrompt={handlePromptSelect} />
            </div>
          </div>
        </div>
      )}
      
      <footer className="bg-white border-t border-gray-200 py-4 mt-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            LifeMap — Visualize your journey. Reflect, grow, and thrive.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
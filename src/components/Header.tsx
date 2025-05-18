import React from 'react';
import { MapPin, FileDown, Menu } from 'lucide-react';
import { LifeEvent } from '../types';
import { exportAsJSON, exportAsPDF } from '../utils/export';

interface HeaderProps {
  onAddEvent: () => void;
  events: LifeEvent[];
}

const Header: React.FC<HeaderProps> = ({ onAddEvent, events }) => {
  const [showExportMenu, setShowExportMenu] = React.useState(false);

  const handleExport = (type: 'json' | 'pdf') => {
    if (type === 'json') {
      exportAsJSON(events);
    } else {
      exportAsPDF(events);
    }
    setShowExportMenu(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <MapPin className="h-6 w-6 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-blue-600">LifeMap</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <div className="px-3 py-1 text-sm text-gray-500">
                Visualize your journey
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="relative">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                disabled={events.length === 0}
                className={`
                  flex items-center px-3 py-2 rounded-md text-sm font-medium
                  ${events.length === 0 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'}
                `}
              >
                <FileDown size={18} className="mr-1" />
                <span className="hidden sm:inline">Export</span>
              </button>
              
              {showExportMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                  <div className="py-1">
                    <button
                      onClick={() => handleExport('json')}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Export as JSON
                    </button>
                    <button
                      onClick={() => handleExport('pdf')}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Export as PDF
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <button
              onClick={onAddEvent}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium flex items-center transition-colors duration-200"
            >
              <span className="hidden sm:inline mr-1">Add Memory</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
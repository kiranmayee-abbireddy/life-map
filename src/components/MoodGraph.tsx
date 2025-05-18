import React, { useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { format, parseISO } from 'date-fns';
import { LifeEvent } from '../types';

interface MoodGraphProps {
  events: LifeEvent[];
}

const MoodGraph: React.FC<MoodGraphProps> = ({ events }) => {
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);
  
  const sortedEvents = [...events].sort((a, b) => 
    new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  const data = [{
    id: 'Emotional Journey',
    data: sortedEvents
      .filter(event => event.emotion && typeof event.emotion.score === 'number')
      .map(event => ({
        x: format(parseISO(event.startDate), 'MMM yyyy'),
        y: event.emotion.score,
        event: event.title,
        emotion: event.emotion.label,
        emoji: event.emotion.emoji,
        description: event.description
      }))
  }];

  const getEmotionColor = (score: number | undefined) => {
    if (score === undefined) return '#94a3b8'; // Default gray color for undefined scores
    if (score >= 0.7) return '#22c55e'; // Green for very positive
    if (score >= 0.3) return '#3b82f6'; // Blue for positive
    if (score >= -0.3) return '#a855f7'; // Purple for neutral
    if (score >= -0.7) return '#f97316'; // Orange for negative
    return '#ef4444'; // Red for very negative
  };

  // If there's no valid data, show a message
  if (!data[0].data.length) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Emotional Journey</h3>
        </div>
        <div className="h-64 flex items-center justify-center text-gray-500">
          No emotional data available to display
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Emotional Journey</h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
            <span className="text-gray-600">Very Positive</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
            <span className="text-gray-600">Very Negative</span>
          </div>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveLine
          data={data}
          margin={{ top: 20, right: 30, bottom: 60, left: 50 }}
          xScale={{ type: 'point' }}
          yScale={{ type: 'linear', min: -1, max: 1 }}
          curve="monotoneX"
          axisBottom={{
            tickRotation: -45,
            legend: 'Time',
            legendOffset: 50,
            legendPosition: 'middle'
          }}
          axisLeft={{
            legend: 'Emotional State',
            legendOffset: -40,
            legendPosition: 'middle',
            tickValues: [-1, -0.5, 0, 0.5, 1],
            format: v => {
              if (v === 1) return 'Very Positive';
              if (v === 0.5) return 'Positive';
              if (v === 0) return 'Neutral';
              if (v === -0.5) return 'Negative';
              if (v === -1) return 'Very Negative';
              return '';
            }
          }}
          enablePoints={true}
          pointSize={12}
          pointColor="#ffffff"
          pointBorderWidth={2}
          pointBorderColor={({ data }) => getEmotionColor(data?.y)}
          enableArea={true}
          areaOpacity={0.15}
          areaBaselineValue={-1}
          crosshairType="x"
          enableSlices="x"
          animate={true}
          motionConfig="gentle"
          lineWidth={3}
          colors={({ data }) => getEmotionColor(data?.y)}
          sliceTooltip={({ slice }) => (
            <div 
              className="bg-white shadow-xl rounded-lg p-4 text-sm border border-gray-200"
              style={{ maxWidth: '300px' }}
            >
              {slice.points.map((point, i) => (
                <div 
                  key={i} 
                  className="py-2 first:pt-0 last:pb-0 border-b last:border-0 border-gray-100"
                  onMouseEnter={() => setHoveredEvent(point.data.event as string)}
                  onMouseLeave={() => setHoveredEvent(null)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-800">{point.data.event}</span>
                    <span className="text-lg">{point.data.emoji}</span>
                  </div>
                  <div className="text-gray-600">{point.data.emotion}</div>
                  {hoveredEvent === point.data.event && (
                    <div className="mt-2 text-xs text-gray-500 line-clamp-2">
                      {point.data.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          theme={{
            axis: {
              ticks: {
                text: {
                  fontSize: 11,
                  fill: '#64748b'
                }
              },
              legend: {
                text: {
                  fontSize: 12,
                  fill: '#475569',
                  fontWeight: 600
                }
              }
            },
            grid: {
              line: {
                stroke: '#e2e8f0',
                strokeDasharray: '4 4'
              }
            },
            crosshair: {
              line: {
                stroke: '#94a3b8',
                strokeWidth: 1,
                strokeOpacity: 0.5
              }
            }
          }}
        />
      </div>
      
      <div className="mt-4 text-sm text-gray-500 text-center">
        Hover over points to see event details. The line color indicates emotional intensity.
      </div>
    </div>
  );
};

export default MoodGraph;
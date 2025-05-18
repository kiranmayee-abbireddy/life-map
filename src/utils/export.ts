import { LifeEvent } from "../types";

export const exportAsJSON = (events: LifeEvent[]): void => {
  const dataStr = JSON.stringify(events, null, 2);
  const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
  
  const exportFileDefaultName = `lifemap-export-${new Date().toISOString().split('T')[0]}.json`;
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
};

export const exportAsPDF = (events: LifeEvent[]): void => {
  // This is a placeholder for PDF export functionality
  // In a real implementation, we would use a library like jsPDF
  // Since we're keeping it simple, we'll use the browser's print functionality
  
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>LifeMap Export</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
        h1 { color: #3B82F6; text-align: center; }
        .event { margin-bottom: 20px; border-left: 4px solid #3B82F6; padding-left: 15px; }
        .event-title { font-size: 18px; font-weight: bold; margin-bottom: 5px; }
        .event-date { color: #666; font-style: italic; margin-bottom: 5px; }
        .event-emotion { margin-bottom: 10px; }
        .event-description { line-height: 1.4; }
      </style>
    </head>
    <body>
      <h1>LifeMap Journey</h1>
      ${events.map(event => `
        <div class="event">
          <div class="event-title">${event.title}</div>
          <div class="event-date">${event.startDate}${event.endDate ? ` - ${event.endDate}` : ''}</div>
          <div class="event-emotion">${event.emotion.emoji} ${event.emotion.label}</div>
          <div class="event-description">${event.description}</div>
        </div>
      `).join('')}
    </body>
    </html>
  `;
  
  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
  printWindow.print();
};
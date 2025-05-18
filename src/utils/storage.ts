import { LifeEvent } from "../types";

const STORAGE_KEY = "lifeMapEvents";

export const saveEvents = (events: LifeEvent[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
};

export const getEvents = (): LifeEvent[] => {
  const events = localStorage.getItem(STORAGE_KEY);
  return events ? JSON.parse(events) : [];
};
export interface LifeEvent {
  id: string;
  title: string;
  startDate: string;
  endDate?: string;
  description: string;
  emotion: EmotionType;
  isPrivate?: boolean;
  category?: string;
  learnings?: string;
}

export type EmotionType = {
  emoji: string;
  label: string;
  score: number;
};

export const EMOTIONS: EmotionType[] = [
  { emoji: "😊", label: "Happy", score: 1 },
  { emoji: "😢", label: "Sad", score: -1 },
  { emoji: "😡", label: "Angry", score: -0.8 },
  { emoji: "😮", label: "Surprised", score: 0.3 },
  { emoji: "😨", label: "Anxious", score: -0.6 },
  { emoji: "🥰", label: "Loved", score: 1 },
  { emoji: "🤔", label: "Thoughtful", score: 0.2 },
  { emoji: "😌", label: "Content", score: 0.8 },
  { emoji: "🎓", label: "Accomplished", score: 0.9 },
  { emoji: "😕", label: "Confused", score: -0.3 },
  { emoji: "🤩", label: "Excited", score: 0.9 },
  { emoji: "😔", label: "Disappointed", score: -0.7 },
];

export const LIFE_PHASES = [
  {
    category: "Education",
    events: [
      { title: "Started School", emotion: EMOTIONS[0] },
      { title: "Graduated High School", emotion: EMOTIONS[8] },
      { title: "Started College", emotion: EMOTIONS[10] },
      { title: "Graduated College", emotion: EMOTIONS[8] },
    ]
  },
  {
    category: "Career",
    events: [
      { title: "First Job", emotion: EMOTIONS[10] },
      { title: "Career Change", emotion: EMOTIONS[6] },
      { title: "Major Promotion", emotion: EMOTIONS[8] },
    ]
  },
  {
    category: "Personal",
    events: [
      { title: "Moved to New City", emotion: EMOTIONS[3] },
      { title: "Started New Hobby", emotion: EMOTIONS[0] },
      { title: "Met Someone Special", emotion: EMOTIONS[5] },
    ]
  }
];

export const REFLECTION_PROMPTS = [
  "What did you learn from this experience?",
  "How did this event change you?",
  "What would you do differently now?",
  "Who helped you during this time?",
  "What strengths did you discover?",
  "How does this connect to your current life?",
];
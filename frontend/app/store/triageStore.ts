import { create } from 'zustand';

interface TriageState {
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  bodyZone: string;
  selectedCategory: string;
  isComplete: boolean;
  setAnswer: (questionId: string, answer: string) => void;
  setBodyZone: (zone: string) => void;
  setSelectedCategory: (category: string) => void;
  reset: () => void;
}

export const useTriageStore = create<TriageState>((set) => ({
  q1: '',
  q2: '',
  q3: '',
  q4: '',
  bodyZone: '',
  selectedCategory: '',
  isComplete: false,
  setAnswer: (questionId, answer) =>
    set((state) => {
      const newState = { ...state, [questionId]: answer };
      const isComplete = !!(newState.q1 && newState.q2 && newState.q3 && newState.q4);
      return { ...newState, isComplete };
    }),
  setBodyZone: (zone) => set({ bodyZone: zone }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  reset: () =>
    set({
      q1: '',
      q2: '',
      q3: '',
      q4: '',
      bodyZone: '',
      selectedCategory: '',
      isComplete: false,
    }),
}));

import { create } from 'zustand';
import { SplitterInstance, Recipient } from './types';

interface SplitterStore {
  currentSplitter: SplitterInstance | null;
  setCurrentSplitter: (splitter: SplitterInstance | null) => void;
  clearCurrentSplitter: () => void;
  addRecipient: (recipient: Recipient) => void;
  removeRecipient: (address: string) => void;
  updateRecipientPercentage: (address: string, percentage: number) => void;
}

export const useSplitterStore = create<SplitterStore>((set) => ({
  currentSplitter: null,
  setCurrentSplitter: (splitter) => set({ currentSplitter: splitter }),
  clearCurrentSplitter: () => set({ currentSplitter: null }),
  addRecipient: (recipient) =>
    set((state) => {
      if (!state.currentSplitter) return state;
      return {
        currentSplitter: {
          ...state.currentSplitter,
          config: {
            ...state.currentSplitter.config,
            recipients: [...state.currentSplitter.config.recipients, recipient],
          },
        },
      };
    }),
  removeRecipient: (address) =>
    set((state) => {
      if (!state.currentSplitter) return state;
      return {
        currentSplitter: {
          ...state.currentSplitter,
          config: {
            ...state.currentSplitter.config,
            recipients: state.currentSplitter.config.recipients.filter(
              (r) => r.address !== address
            ),
          },
        },
      };
    }),
  updateRecipientPercentage: (address, percentage) =>
    set((state) => {
      if (!state.currentSplitter) return state;
      return {
        currentSplitter: {
          ...state.currentSplitter,
          config: {
            ...state.currentSplitter.config,
            recipients: state.currentSplitter.config.recipients.map((r) =>
              r.address === address ? { ...r, percentage } : r
            ),
          },
        },
      };
    }),
})); 
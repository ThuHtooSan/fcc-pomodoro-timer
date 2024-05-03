import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type Duration = {
  session: number;
  break: number;
};

type SetDurationPayload = {
  type: keyof Duration;
  duration: number;
};

type InitialState = {
  isPlaying: boolean;
  intervalId: number | null;
  type: keyof Duration;
  timeLeft: number;
  duration: Duration;
};

const initialState: InitialState = {
  isPlaying: false,
  intervalId: null,
  type: 'session',
  timeLeft: 25 * 60,
  duration: {
    session: 25 * 60,
    break: 5 * 60,
  },
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    tickTimer: state => {
      if (state.timeLeft > 0) {
        state.timeLeft -= 1;
      } else {
        state.type = state.type === 'session' ? 'break' : 'session';
        state.timeLeft = state.duration[state.type];
      }
    },
    setIntervalId: (state, action: PayloadAction<number>) => {
      state.intervalId = action.payload;
      state.isPlaying = true;
    },
    pauseTimer: state => {
      state.isPlaying = false;

      if (state.intervalId) {
        clearInterval(state.intervalId);
        state.intervalId = null;
      }
    },
    resetTimer: state => {
      if (state.intervalId) clearInterval(state.intervalId);

      return {
        ...initialState,
        timeLeft: state.duration[initialState.type],
        duration: state.duration,
      };
    },
    increaseDuration: (state, action: PayloadAction<keyof Duration>) => {
      if (state.duration[action.payload] < 3600)
        state.duration[action.payload] += 60;
    },
    decreaseDuration: (state, action: PayloadAction<keyof Duration>) => {
      if (state.duration[action.payload] > 60) {
        state.duration[action.payload] -= 60;
      }
    },
    setDuration: (state, { payload }: PayloadAction<SetDurationPayload>) => {
      if (payload.duration > 0 && payload.duration <= 3600) {
        state.duration[payload.type] = payload.duration;
      }
    },
    resetDuration: state => {
      state.duration = initialState.duration;
      localStorage.removeItem('duration');
    },
    // refresh the time according to the new duration if the timer is stopped running
    refreshTimeleft: (state, action: PayloadAction<keyof Duration>) => {
      if (state.type === action.payload && !state.isPlaying) {
        state.timeLeft = state.duration[action.payload];
      }
    },
    backupDurations: state => {
      localStorage.setItem('duration', JSON.stringify(state.duration));
    },
    restoreDurations: state => {
      const duration = localStorage.getItem('duration');

      if (duration) {
        state.duration = JSON.parse(duration);
        state.timeLeft = state.duration[state.type];
      }
    },
  },
});

export default timerSlice.reducer;
export const {
  tickTimer,
  setIntervalId,
  pauseTimer,
  resetTimer,
  increaseDuration,
  decreaseDuration,
  setDuration,
  resetDuration,
  refreshTimeleft,
  backupDurations,
  restoreDurations,
} = timerSlice.actions;

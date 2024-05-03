import { setIntervalId, tickTimer } from '../redux/slices/timerSlice';
import { useAppDispatch, useAppSelector } from './reduxTypedHooks';

export const useTimer = () => {
  const { isPlaying } = useAppSelector(state => state.timer);
  const dispatch = useAppDispatch();

  return () => {
    if (isPlaying) return;

    const intervalId = setInterval(() => {
      dispatch(tickTimer());
    }, 1000);

    dispatch(setIntervalId(intervalId));
  };
};

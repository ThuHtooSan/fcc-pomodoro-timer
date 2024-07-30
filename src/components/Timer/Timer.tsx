import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRotateLeft,
  faPause,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypedHooks';
import { pauseTimer, resetTimer } from '../../redux/slices/timerSlice';
import { useTimer } from '../../hooks';
import { motion } from 'framer-motion';
import './timer.scss';
import { useEffect, useRef } from 'react';
import alertAudio from '/src/assets/audio/alert.mp3';

const themeColors = {
  session: '#a8d1d1',
  break: '#9ea1d4',
};

const Timer = () => {
  const { timeLeft, isPlaying, type } = useAppSelector(state => state.timer);
  const dispatch = useAppDispatch();
  const audioElem = useRef<HTMLAudioElement>(null!);
  const startTimer = useTimer();
  const time = [Math.floor(timeLeft / 60), timeLeft % 60].reduce(
    (result: string[], item, index) => {
      result.push(item < 10 ? `0${item}` : String(item));
      if (index === 0) result.push(':');

      return result;
    },
    []
  );

  useEffect(() => {
    document.body.dataset.type = type;

    document
      .querySelector('meta[name=theme-color]')!
      .setAttribute('content', themeColors[type]);
  }, [type]);

  useEffect(() => {
    let documentTitle = '';

    if (isPlaying) {
      documentTitle = `${type.toUpperCase()} - ${time} ⏳`;

      if (timeLeft < 10) {
        if (timeLeft === 0) {
          documentTitle = 'Time up! 🔔';
        } else {
          documentTitle = `Just ${timeLeft}s before ${(type === 'session'
            ? 'break'
            : 'session'
          ).toUpperCase()}! ⏳`;
        }
      }
    } else {
      documentTitle = `Pomodoro Timer`;
    }

    document.title = documentTitle;
  }, [isPlaying, timeLeft]);

  if (timeLeft === 0) {
    audioElem.current.play();
  }

  return (
    <>
      <div
        className='timer'
        data-type={type}
      >
        <h3
          className='timer-type'
          id='timer-label'
        >
          {type.replace(/^\w/, m => m.toUpperCase())}
        </h3>
        <p
          className='time-left'
          id='time-left'
        >
          {time.map((time, index) => (
            <span key={`${time}-${index}`}>{time}</span>
          ))}
        </p>

        <div className='controls-wrapper'>
          {isPlaying ? (
            <motion.button
              className='controls play-pause playing'
              onClick={() => dispatch(pauseTimer())}
              id='start_stop'
              title='Pause the timer'
            >
              <FontAwesomeIcon
                icon={faPause}
                className='icon'
              />
            </motion.button>
          ) : (
            <motion.button
              className='controls play-pause paused'
              onClick={startTimer}
              id='start_stop'
              title='Play the timer'
            >
              <FontAwesomeIcon
                icon={faPlay}
                className='icon'
              />
            </motion.button>
          )}
          <button
            className='controls reset'
            onClick={() => {
              dispatch(resetTimer());
              audioElem.current.pause();
              audioElem.current.src = audioElem.current.src;
            }}
            title='Reset the timer'
          >
            <FontAwesomeIcon
              icon={faArrowRotateLeft}
              className='icon'
            />
          </button>
        </div>
      </div>

      {/* audio element */}
      <audio
        src={alertAudio}
        ref={audioElem}
        id='beep'
      />
    </>
  );
};

export default Timer;

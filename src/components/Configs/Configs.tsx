import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons';

import './configs.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypedHooks';
import {
  Duration,
  backupDurations,
  decreaseDuration,
  increaseDuration,
  refreshTimeleft,
  resetDuration,
  resetTimer,
  setDuration,
} from '../../redux/slices/timerSlice';
import { PanInfo, motion } from 'framer-motion';
import { useState } from 'react';
import { ConfigCardVariants } from './Configs.variants';

const Configs = () => {
  const { duration } = useAppSelector(state => state.timer);
  const dispatch = useAppDispatch();
  let [isShown, setIsShown] = useState(false);

  const handleRangeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: keyof Duration
  ) => {
    dispatch(
      setDuration({
        type,
        duration: e.target.valueAsNumber,
      })
    );
    dispatch(refreshTimeleft(type));
    dispatch(backupDurations());
  };

  const handleCardDragEnd = (
    e: MouseEvent | globalThis.TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (!(e.target as HTMLDivElement).matches('input[type=range]')) {
      setIsShown(info.offset.y < 0);
    }
  };

  return (
    <motion.div
      drag='y'
      dragElastic={0.3}
      dragConstraints={{ top: 0, bottom: isShown ? 0 : 240 }}
      dragTransition={{ bounceStiffness: 200 }}
      onDragEnd={handleCardDragEnd}
      className='config-container'
      animate={isShown ? 'visible' : 'hidden'}
      variants={ConfigCardVariants}
    >
      <div className='configs'>
        {(Object.keys(duration) as Array<keyof Duration>).map(type => (
          <div
            className='config'
            key={type}
          >
            <div className='label-wrapper'>
              <label
                htmlFor={`${type}-duration`}
                id={`${type}-label`}
              >
                {type.replace(/^./, m => m.toUpperCase())} Duration
              </label>
              <div className='btn-wrapper'>
                {/* decrease button */}
                <button
                  onClick={() => {
                    dispatch(decreaseDuration(type));
                    dispatch(refreshTimeleft(type));
                    dispatch(backupDurations());
                  }}
                  data-status={duration[type] <= 60 ? 'disabled' : ''}
                  id={`${type}-decrement`}
                  title={`Decrease ${type} duration`}
                >
                  <FontAwesomeIcon icon={faCircleMinus} />
                </button>

                {/* increase button */}
                <button
                  onClick={() => {
                    dispatch(increaseDuration(type));
                    dispatch(refreshTimeleft(type));
                    dispatch(backupDurations());
                  }}
                  data-status={duration[type] >= 3600 ? 'disabled' : ''}
                  id={`${type}-increment`}
                  title={`Increase ${type} duration`}
                >
                  <FontAwesomeIcon icon={faCirclePlus} />
                </button>
              </div>
            </div>

            <input
              type='range'
              name={`${type}-duration`}
              id={`${type}-duration`}
              value={duration[type]}
              onChange={e => handleRangeChange(e, type)}
              min='0'
              max='3600'
              step='60'
              list='duration-list'
            />
            <div className='current-value-wrapper'>
              <p
                className='current-value'
                style={{
                  left: `${(100 / 3600) * duration[type]}%`,
                }}
                id={`${type}-length`}
              >
                {duration[type] / 60}
              </p>
            </div>
          </div>
        ))}

        <datalist id='duration-list'>
          {[15, 30, 45, 60].map(duration => (
            <option
              value={duration * 60}
              key={duration}
            />
          ))}
        </datalist>

        <button
          className='reset'
          id='reset'
          onClick={() => {
            const audioElem = document.getElementById(
              'beep'
            ) as HTMLAudioElement;

            dispatch(resetDuration());
            dispatch(resetTimer());
            audioElem.pause();
            audioElem.src = audioElem.src;
          }}
          title='Reset to default settings'
        >
          Reset to default
        </button>
      </div>
    </motion.div>
  );
};

export default Configs;

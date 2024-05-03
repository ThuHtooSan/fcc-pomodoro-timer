import './header.scss';
import fccLogo from '../../assets/images/freeCodeCamp.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector } from '../../hooks/reduxTypedHooks';
import About from '../About';

const Header = () => {
  return (
    <>
      <div className='header'>
        <h4 className='sub-title'>
          A
          <img
            src={fccLogo}
            alt='freeCodeCamp Logo'
            className='fcc-logo'
            title='freeCodeCamp'
          />
          Project
        </h4>
        <h2 className='title'>
          <FontAwesomeIcon icon={faHourglassHalf} />
          Pomodoro Timer
        </h2>
      </div>
      <About />
    </>
  );
};

export default Header;

import { useEffect } from 'react';
import { Configs, Header, Timer } from '../../components';
import { useAppDispatch } from '../../hooks/reduxTypedHooks';
import { restoreDurations } from '../../redux/slices/timerSlice';
import './home.scss';

const Home = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(restoreDurations());
  }, []);

  return (
    <div className='home'>
      <Header />
      <Timer />
      <Configs />
    </div>
  );
};

export default Home;

import { Variants } from 'framer-motion';

export const playPauseBtnVariants: Variants = {
  hidden: {
    translateY: -20,
    opacity: 0,
    transition: {
      type: 'spring',
    },
  },
  visible: {
    translateY: 0,
  },
  exit: {
    translateY: 20,
    opacity: 0,
    transition: {
      type: 'spring',
    },
  },
};

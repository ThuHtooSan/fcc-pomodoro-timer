import { Variants } from 'framer-motion';

export const aboutControllerVariants: Variants = {
  hidden: {
    y: -200,
  },
  visible: {
    y: 0,
    transition: {
      type: 'tween',
      ease: 'easeInOut',
      duration: 1,
    },
  },
};

export const aboutModalContainerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      type: 'tween',
      ease: 'easeInOut',
    },
  },
};

export const aboutModalVariants: Variants = {
  hidden: {
    scale: 0.8,
  },
  visible: {
    scale: 1,
    transition: {
      type: 'spring',
    },
  },
};

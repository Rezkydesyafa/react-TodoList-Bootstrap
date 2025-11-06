import { motion, AnimatePresence } from 'framer-motion';

/**
 * Komponen pembungkus animasi universal
 * -------------------------------------
 * Gunakan <MotionWrapper> untuk membungkus elemen apapun
 * agar punya animasi masuk/keluar & transisi layout yang halus.
 */
export default function MotionWrapper({
  children,
  layout = true,
  type = 'fade-slide',
}) {
  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slide: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    },
    'fade-slide': {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -10 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
    },
  };

  return (
    <AnimatePresence mode='popLayout'>
      <motion.div
        layout={layout}
        variants={variants[type]}
        initial='initial'
        animate='animate'
        exit='exit'
        transition={{
          duration: 0.3,
          ease: 'easeInOut',
          layout: { type: 'spring', stiffness: 120, damping: 18 },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

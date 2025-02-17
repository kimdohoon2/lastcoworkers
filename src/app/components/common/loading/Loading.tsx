import { motion } from 'framer-motion';
import getRandomId from '@/app/utils/getRandomId';

function Loading() {
  return (
    <div className="fixed inset-0 flex h-screen items-center justify-center bg-black opacity-50">
      <div className="relative">
        {Array.from({ length: 10 }).map((_, i) => {
          const angle = (i / 10) * 360;
          const id = getRandomId();
          return (
            <motion.div
              key={id}
              className="absolute h-4 w-1 rounded bg-background-inverse"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                repeat: Infinity,
                duration: 1,
                delay: (i / 10) * 1,
              }}
              style={{
                transformOrigin: 'center bottom',
                transform: `rotate(${angle}deg) translateY(-12px)`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Loading;

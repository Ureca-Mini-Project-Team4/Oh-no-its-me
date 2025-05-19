import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

interface FloatItemProps {
  src: string;
  size?: string;
  duration?: number;
  interval?: number;
}

// 랜덤 이동
const getRandomPosition = () => ({
  x: Math.floor(Math.random() * 100 - 50),
  y: Math.floor(Math.random() * 100 - 50),
});

const FloatingItem = ({ src, size = 'w-20', duration = 6, interval = 8000 }: FloatItemProps) => {
  const controls = useAnimation();

  useEffect(() => {
    const animateRandomly = () => {
      const { x, y } = getRandomPosition();
      controls.start({
        x: `${x}vw`,
        y: `${y}vh`,
        transition: {
          duration,
          ease: 'easeInOut',
        },
      });
    };

    animateRandomly(); // 첫 애니메이션
    const intervalId = setInterval(animateRandomly, interval);

    return () => clearInterval(intervalId);
  }, [controls, duration, interval]);

  return (
    <motion.img
      src={src}
      className={`absolute ${size} opacity-80 pointer-events-none`}
      style={{
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)', // 중앙에서 시작
      }}
      animate={controls}
      alt="floating item"
    />
  );
};
const FloatingBackground = () => {
  return (
    <div className="fixed inset-0 -z-1000 overflow-hidden pointer-events-none">
      <FloatingItem
        src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1741777507/noticon/dihnlmrn8aopedon41ur.gif"
        size="w-20"
        duration={5}
        interval={7000}
      />
      <FloatingItem
        src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1683523256/noticon/kyp3frg9corycovxokx6.gif"
        size="w-16"
        duration={6}
        interval={9000}
      />
      <FloatingItem
        src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1686670279/noticon/gvasp3qtaz16spmwoorl.gif"
        size="w-24"
        duration={7}
        interval={10000}
      />
    </div>
  );
};

export default FloatingBackground;

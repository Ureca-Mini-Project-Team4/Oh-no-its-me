import { useEffect, useState } from 'react';
import Fireworks from 'react-canvas-confetti/dist/presets/fireworks';
import { TConductorInstance, TOnInitPresetFn } from 'react-canvas-confetti/dist/types';

const Confetti = () => {
  const [conductor, setConductor] = useState<TConductorInstance | null>(null);

  useEffect(() => {
    if (!conductor) return;

    let count = 0;
    const interval = setInterval(() => {
      conductor.shoot();
      count++;
      if (count >= 5) clearInterval(interval);
    }, 500);

    return () => clearInterval(interval);
  }, [conductor]);

  const handleInit: TOnInitPresetFn = ({ conductor }) => {
    setConductor(conductor);
  };

  return <Fireworks onInit={handleInit} autorun={undefined} />;
};

export default Confetti;

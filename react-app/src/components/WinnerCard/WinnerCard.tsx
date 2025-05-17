'use client';

import { useCallback, useMemo, useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { IMAGES } from '@/constants/imagePath';
import { ICONS } from '@/constants/iconPath';

interface WinnerCardProps {
  text: string;
  icon: string;
  name: string;
  num: number;
}

interface WinnerCardFrontProps {
  text: string;
  icon: string;
  color: string;
  onClick: () => void;
}

interface WinnerCardBackProps {
  name: string;
  color: string;
  onClick: () => void;
}

const BASE_CSS = 'p-3 w-full h-full rounded-[20px] flex flex-col';

const WinnerCard = ({ text, icon, name, num }: WinnerCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const toggleFlip = useCallback(() => setIsFlipped((prev) => !prev), []);

  const color = useMemo(() => {
    switch (num % 4) {
      case 1:
        return 'bg-lemon-gradient';
      case 2:
        return 'bg-soda-gradient';
      case 3:
        return 'bg-peach-gradient';
      case 0:
        return 'bg-orange-gradient';
      default:
        return '';
    }
  }, [num]);

  return (
    <div className="w-[160px] h-[200px] sm:w-[180px] sm:h-[240px]">
      <ReactCardFlip
        isFlipped={isFlipped}
        containerStyle={{ width: '100%', height: '100%', position: 'relative' }}
      >
        <WinnerCardFront text={text} icon={icon} color={color} onClick={toggleFlip} />
        <WinnerCardBack name={name} color={color} onClick={toggleFlip} />
      </ReactCardFlip>
    </div>
  );
};

export default WinnerCard;

const WinnerCardFront = ({ text, icon, color, onClick }: WinnerCardFrontProps) => {
  return (
    <div
      onClick={onClick}
      className={`${BASE_CSS} ${color} items-end justify-evenly cursor-pointer`}
    >
      <p className="text-[14px] sm:text-[16px] break-keep font-pm p-1 sm:p-2">{text}</p>
      <img
        src={ICONS.QUESTION_ICON(icon)}
        alt={`${icon} 아이콘`}
        className="w-[80px] h-[80px] sm:w-[90px] sm:h-[90px]"
      />
    </div>
  );
};

const WinnerCardBack = ({ name, color, onClick }: WinnerCardBackProps) => {
  return (
    <div
      onClick={onClick}
      className={`${BASE_CSS} ${color} items-center justify-evenly cursor-pointer`}
    >
      <img src={IMAGES.MEDAL} alt="메달" className="w-[35px] h-[45px] sm:w-[45px] sm:h-[60px]" />
      <img
        src={IMAGES.PEOPLE(name)}
        alt={`${name} 프사`}
        className="w-[80px] h-[80px] sm:w-[120px] sm:h-[120px]"
      />
      <p className="text-[16px] sm:text-[21px] font-pr">{name}</p>
    </div>
  );
};

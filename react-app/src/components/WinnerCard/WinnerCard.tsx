'use client';

import { memo, useCallback, useMemo, useState } from 'react';
import ReactCardFlip from 'react-card-flip';

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

interface WinnderCardBackProps {
  name: string;
  color: string;
  onClick: () => void;
}

const BASE_URL = '/assets/images/';
const BASE_CSS = 'p-3 w-full h-full rounded-[20px] flex flex-col';

const WinnerCard = ({ text, icon, name, num }: WinnerCardProps) => {
  const [state, setState] = useState(false);
  const handleChangeState = useCallback(() => {
    setState(!state);
  }, [state]);

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
    <div className="w-[131px] h-[168px] sm:w-[230px] sm:h-[290px]">
      <ReactCardFlip
        isFlipped={state}
        containerStyle={{
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        <WinnerCardFront text={text} icon={icon} color={color} onClick={handleChangeState} />
        <WinnerCardBack name={name} color={color} onClick={handleChangeState} />
      </ReactCardFlip>
    </div>
  );
};

export default memo(WinnerCard);

const WinnerCardFront = ({ text, icon, color, onClick }: WinnerCardFrontProps) => {
  const new_src = `${BASE_URL}question/${icon}`;

  return (
    <div
      onClick={onClick}
      className={`${BASE_CSS} ${color} items-end justify-evenly cursor-pointer`}
    >
      <p className="text-[10px] sm:text-[16px] font-medium leading-snug">{text}</p>
      <img src={new_src} className="w-[60px] h-[60px] sm:w-[100px] sm:h-[100px]" />
    </div>
  );
};

const WinnerCardBack = ({ name, color, onClick }: WinnderCardBackProps) => {
  const new_src = `${BASE_URL}people/${name}.png`;

  return (
    <div
      onClick={onClick}
      className={`${BASE_CSS} ${color} items-center justify-evenly cursor-pointer`}
    >
      <img src={`${BASE_URL}medal.png`} className="w-[30px] h-[40px] sm:w-[60px] sm:h-[80px]" />
      <img src={new_src} className="w-[60px] h-[60px] sm:w-[100px] sm:h-[100px]" />
      <p className="text-[13px] sm:text-[18px]">{name}</p>
    </div>
  );
};

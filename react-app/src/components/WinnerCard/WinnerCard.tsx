'use client';

import { useCallback, useMemo, useState } from 'react';
import ReactCardFlip from 'react-card-flip';

interface WinnerCardProps {
  text: string; // Questions.questionText
  icon: string; // Questions.icon
  name: string; // Users.userName
  num: number; // Candidates.candidateId
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
    <div className="w-[160px] h-[200px] sm:w-[240px] sm:h-[300px]">
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

export default WinnerCard;

const WinnerCardFront = ({ text, icon, color, onClick }: WinnerCardFrontProps) => {
  const new_src = `${BASE_URL}question/${icon}.png`;

  return (
    <div
      onClick={onClick}
      className={`${BASE_CSS} ${color} items-end justify-evenly cursor-pointer`}
    >
      <p className="text-[12px] sm:text-[18px] break-keep">{text}</p>
      <img src={new_src} className="w-[80px] h-[80px] sm:w-[120px] sm:h-[120px]" />
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
      <img src={`${BASE_URL}medal.png`} className="w-[40px] h-[50px] sm:w-[60px] sm:h-[75px]" />
      <img src={new_src} className="w-[80px] h-[80px] sm:w-[120px] sm:h-[120px]" />
      <p className="text-[14px] sm:text-[21px]">{name}</p>
    </div>
  );
};

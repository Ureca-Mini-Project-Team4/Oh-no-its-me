import { memo } from 'react';
import ReactCardFlip from 'react-card-flip';

interface WinnerCardProps {
  text: string;
  icon: string;
  name: string;
  state: boolean;
  onClick: () => void;
}

const BASE_URL = '/assets/images/';
const BASE_CSS = 'p-3 w-full h-full rounded-[20px] flex flex-col';
const BASE_STYLE = 'linear-gradient(to bottom, #FFED39, #FFFAC5)';

const WinnerCard = ({ text, icon, name, state, onClick }: WinnerCardProps) => {
  return (
    <div className="relative w-[230px] h-[290px]">
      <ReactCardFlip
        isFlipped={state}
        containerStyle={{
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}
      >
        <WinnerCardFront text={text} icon={icon} onClick={onClick} />
        <WinnerCardBack name={name} onClick={onClick} />
      </ReactCardFlip>
    </div>
  );
};

export default memo(WinnerCard);

const WinnerCardFront = ({
  text,
  icon,
  onClick,
}: {
  text: string;
  icon: string;
  onClick: () => void;
}) => {
  const new_src = `${BASE_URL}question/${icon}`;

  return (
    <div
      onClick={onClick}
      style={{ background: BASE_STYLE }}
      className={`${BASE_CSS} items-end justify-evenly cursor-pointer`}
    >
      <p className="text-[16px] font-medium leading-snug">{text}</p>
      <img src={new_src} className="w-[100px] h-[100px]" />
    </div>
  );
};

const WinnerCardBack = ({ name, onClick }: { name: string; onClick: () => void }) => {
  const new_src = `${BASE_URL}people/${name}.png`;

  return (
    <div
      onClick={onClick}
      style={{ background: BASE_STYLE }}
      className={`${BASE_CSS} items-center justify-evenly cursor-pointer`}
    >
      <img src={`${BASE_URL}medal.png`} className="w-[68px] h-[83px]" />
      <img src={new_src} className="w-[100px] h-[100px]" />
      <p className="text-[18px]">{name}</p>
    </div>
  );
};

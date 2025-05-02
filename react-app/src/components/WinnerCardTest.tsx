'use client';

import { memo, useCallback, useState } from 'react';
import WinnerCard from './WinnerCard/WinnerCard';

const WinnerCardTest = () => {
  const [state, setState] = useState(true);
  const handleChangeState = useCallback(() => {
    setState(!state);
  }, [state]);

  return (
    <div>
      <WinnerCard
        // TODO: 배경 색은 어떻게 할까 ?
        // 현재 변수값: (Questions.icon, Questions.questionText, Users.userName)

        icon="island.png"
        // icon="airplane.png"
        text="무인도에서 가장 잘 살아남을 것 같은 사람은?"
        // text="비행기 탈 때 신발 벗고 탈 것 같은 사람은?"
        name="이영주"
        // name="진영호"
        state={state}
        onClick={handleChangeState}
      />
    </div>
  );
};

export default memo(WinnerCardTest);

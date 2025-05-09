import Profile from '../Profile/Profile';
import { Dropdown } from './Dropdown';

interface CommentProps {
  nickname: string | null;
  comment: string | null;
}

const Comment = ({ nickname, comment }: CommentProps) => {
  return (
    <div className="w-[300px] pt-[5px] pb-[5px] h-auto sm:w-[450px] flex flex-initial rounded-xl sm:rounded-2xl border-solid border-[1px] border-gray-100 items-center">
      <div className="flex justify-between w-full">
        <div className="flex gap-[10px] pl-3 pr-3 items-center">
          <div className="h-full flex items-start">
            <Profile nickname={nickname} />
          </div>
          <div className="font-pm flex flex-col gap-[5px]">
            <div className="text-[8px] sm:text-[12px] text-gray-600 mt-[5px]">{nickname}</div>
            <div className="text-[10px] sm:text-[15px] mb-[5px]">{comment}</div>
          </div>
        </div>
        <div className="pr-3 flex items-center">
          <Dropdown data={['수정', '삭제']} />
        </div>
      </div>
    </div>
  );
};

export default Comment;

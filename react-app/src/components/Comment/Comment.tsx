import Profile from '../Profile/Profile';

const Comment = ({ nickname, comment }: { nickname: string | null; comment: string | null }) => {
  return (
    <div className="w-[300px] pt-[5px] pb-[5px] h-auto sm:w-[450px] flex flex-initial rounded-[30px] border-solid border-[1px] border-gray-100 items-center">
      <div className="flex gap-[10px] pl-3 pr-3">
        <div className="h-full flex items-start">
          <Profile nickname={nickname} />
        </div>
        <div className="font-pm flex flex-col gap-[5px]">
          <div className="text-[10px] sm:text-[14px] text-gray-600 mt-[5px]">{nickname}</div>
          <div className="text-[12px] sm:text-[16px] mb-[5px]">{comment}</div>
        </div>
      </div>
    </div>
  );
};

export default Comment;

import { IMAGES } from '@/constants/imagePath';

interface ProfileProps {
  nickname: string;
}

const Profile = ({ nickname }: ProfileProps) => {
  const imageSrc = nickname ? IMAGES.ANIMAL(nickname) : IMAGES.DEFAULT_PROFILE;

  return (
    <div className="w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] rounded-xl">
      <img
        src={imageSrc}
        alt={`${nickname || '기본'} 프로필`}
        className="border border-gray-100 rounded-4xl object-cover w-full h-full"
      />
    </div>
  );
};

export default Profile;

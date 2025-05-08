const BASE_URL = '/assets/images/';

interface ProfileProps {
  nickname: string | null;
}

const Profile = ({ nickname }: ProfileProps) => {
  return (
    <div className="w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] rounded-xl">
      <img
        className="border-[1px] rounded-4xl border-gray-100"
        src={`${BASE_URL}${nickname ? 'animal/' + nickname + '.jpg' : 'default-profile.png'}`}
      />
    </div>
  );
};

export default Profile;

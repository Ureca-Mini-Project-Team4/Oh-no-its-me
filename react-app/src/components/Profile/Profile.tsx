const BASE_URL = '/assets/images/';

const Profile = ({ nickname }: { nickname: string | null }) => {
  return (
    <div className="w-[50px] h-[50px] sm:w-[70px] sm:h-[70px] rounded-xl">
      <img
        className="border-[1px] rounded-4xl border-gray-100"
        src={`${BASE_URL}${nickname ? 'animal/' + nickname + '.jpg' : 'default-profile.png'}`}
      />
    </div>
  );
};

export default Profile;

import { IMAGES } from '@/constants/imagePath';
const CharacterCard = () => {
  return (
    <div className="relative flex flex-col items-center">
      {/* seal 이미지 */}
      <img src={IMAGES.SEAL_CHAT_BIG} alt="Character Seal" className="relative z-10 sm:w-[300px]" />
    </div>
  );
};

export default CharacterCard;

const CharacterCard = () => {
  return (
    <div className="relative flex flex-col items-center">
      {/* seal 이미지 */}
      <img
        src="\assets\images\seal-chat-big.svg"
        alt="Character Seal"
        className="relative z-10 sm:w-[300px]"
      />
    </div>
  );
};

export default CharacterCard;

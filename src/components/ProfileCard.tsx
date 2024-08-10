import { UserCircle } from "@phosphor-icons/react";

const ProfileCard = () => {
  return (
    <div className="flex flex-col items-center border w-full rounded-md p-2 shadow-sm">
      <UserCircle size={32} />
      <div>
        <h2 className="text-sm font-semibold text-black">Basavaraj Muttagi</h2>
        <p className="text-xs font-medium text-gray-600 tracking-wide">
          basavaraj@gmail.com
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;

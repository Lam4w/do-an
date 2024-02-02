import Image from "next/image";
import { Icons } from "../Icons";
import { Avatar, AvatarFallback } from "../ui/Avatar";

interface UserAvatarProps {
  userEmail: string | null | undefined;
  userImage: string | null | undefined;
}

const UserAvatar = ({ userEmail, userImage }: UserAvatarProps) => {
  return (
    <Avatar>
      {userImage ? (
        <div className="relative aspect-square h-full w-full">
          <Image
            fill
            src={userImage}
            alt="profile picture"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className="sr-only truncate">{userEmail}</span>
          <Icons.user className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;

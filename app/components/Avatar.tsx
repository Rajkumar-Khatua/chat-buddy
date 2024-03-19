"use client";

import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarProps {
  user?: User;
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  return (
    <div className="relative">
      <div className="relative inline-block rounded-md overflow-hidden h-9 w-9 md:h-11 md:w-11 shadow-md">
        <Image
          alt="Profile picture"
          src={user?.image || "/placeholder.jpg"}
          fill
        />
      </div>
      <span className="absolute block h-3 w-3 rounded-full bg-green-500 ring-2 ring-green-300 top-0 right-0 animate-ping"></span>
      <span className="absolute block h-3 w-3 rounded-full bg-green-500 ring-2 ring-green-300 top-0 right-0"></span>
    </div>
  );
};

export default Avatar;

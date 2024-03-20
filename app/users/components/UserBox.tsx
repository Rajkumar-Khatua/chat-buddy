"use client";

import Avatar from "@/app/components/Avatar";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface UserBoxProps {
  data: User;
}
const UserBox: React.FC<UserBoxProps> = ({ data }) => {
  const router = useRouter();
  const [Loading, setLoading] = useState(false);

  const handleClick = useCallback(() => {
    setLoading(true);
    axios
      .post("/api/conversations", {
        userId: data.id,
      })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [data, router]);

  return (
    <div
      onClick={handleClick}
      className="
        w-full
        relative
        flex
        items-center
        space-x-3
        cursor-pointer
        p-3
        bg-white
        hover:bg-neutral-100
        transition
        duration-200
        rounded-lg
        border
        border-transparent
        hover:border-neutral-200"
    >
      <Avatar user={data} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex flex-col justify-between items-start mb-1">
            <p className="text-sm font-medium text-gray-900">{data.name}</p>
            <span className="text-xs font-extralight text-opacity-80">
              {data?.about || "No information available"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBox;

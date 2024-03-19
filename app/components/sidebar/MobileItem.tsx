"use client";

import Link from "next/link";
import clsx from "clsx";

interface MobileItemProps {
  label: string;
  href: string;
  icon: any;
  onClick?: () => void;
  active?: boolean;
}

const MobileItem: React.FC<MobileItemProps> = ({
  label,
  href,
  icon: Icon,
  active,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <Link
      href={href}
      onClick={handleClick}
      className={clsx(
        `
            group
            flex
            gap-x-3
            text-sm
            leading-6
            font-semibold
            w-full
            justify-center
            p-4
            rounded-md
            text-gray-500
            hover:text-gray-900
            focus:text-gray-900
            hover:bg-gray-100
            transition
            duration-200
            ease-in-out
            cursor-pointer

        `,
        active && "bg-gray-200 text-purple-600 shadow-lg"
      )}
    >
      <Icon className="w-6 h-6" />
    </Link>
  );
};

export default MobileItem;

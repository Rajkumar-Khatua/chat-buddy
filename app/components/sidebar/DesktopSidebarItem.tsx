"use client";
import clsx from "clsx";
import Link from "next/link";

interface DesktopSidebarItemProps {
  label: string;
  href: string;
  icon: any;
  onClick?: () => void;
  active?: boolean;
}

const DesktopSidebarItem: React.FC<DesktopSidebarItemProps> = ({
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
    <li onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          `
                    group
                    flex
                    gap-x-3
                    rounded-md
                    p-3
                    cursor-pointer
                    hover:bg-gray-100
                    transition
                    duration-200
                    ease-in-out
                    text-sm
                    leading-6
                    font-semibold
            `,
          active && "bg-white text-purple-600 shadow-md"
        )}
      >
        <Icon className="h-6 w-6 shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};

export default DesktopSidebarItem;

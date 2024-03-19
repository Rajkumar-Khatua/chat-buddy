"use client";

import useRoutes from "@/app/hooks/useRoute";
import useConversation from "@/app/hooks/useConversation";
import MobileItem from "./MobileItem";

const MobileFooter = () => {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }

  return (
    <div
      className="
    fixed
    justify-between
    w-full
    bottom-0
    z-40
    flex
    items-center
    bg-white/90
    backdrop-blur-sm
    border-t-[1px]
    lg:hidden                        
  "
    >
      {routes.map((route) => (
        <MobileItem
          key={route.label}
          label={route.label}
          href={route.href}
          icon={route.icon}
          active={route.active}
          onClick={route.onClick}
        />
      ))}
    </div>
  );
};

export default MobileFooter;

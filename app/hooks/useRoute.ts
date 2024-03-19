import { usePathname } from "next/navigation";
import useConversation from "./useConversation";
import { useMemo } from "react";
import { signOut } from "next-auth/react";

import { PiChatsCircleThin } from "react-icons/pi";
import { PiUsersThin } from "react-icons/pi";
import { PiUserThin } from "react-icons/pi";
import { PiSignOutThin } from "react-icons/pi";
import { CiSettings } from "react-icons/ci";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(
    () => [
      {
        label: "Chat",
        href: "/conversations",
        icon: PiChatsCircleThin,
        active: pathname === "/conversations" || !!conversationId,
      },
      {
        label: "Users",
        href: "/users",
        icon: PiUsersThin,
        active: pathname === "/users",
      },
      {
        label: "Settings",
        href: "/settings",
        icon: CiSettings,
        active: pathname === "/settings",
      },
      {
        label: "Logout",
        href: "#",
        onClick: () => signOut(),
        icon: PiSignOutThin,
      },
    ],
    [pathname, conversationId]
  );

  return routes;
};

export default useRoutes;

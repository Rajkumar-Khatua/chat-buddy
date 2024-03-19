import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";

const getUsers = async () => {
  const session = await getSession();
  if (!session?.user?.email) {
    return [];
  }
  try {
    const user = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        // for now, we only want to show users that are not the current user (you) in the list of users to chat with!
        NOT: {
          email: session.user.email,
        },
      },
    });
    return user;
  } catch (error: any) {
    return [];
  }
};

export default getUsers;

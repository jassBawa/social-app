import prisma from "@/libs/prismadb";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth/next";
import { getProviders } from "next-auth/react";
import { NextRequest } from "next/server";

const serverAuth = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("you are not signed in");
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    throw new Error(" No user foud");
  }

  return { currentUser };
};

export default serverAuth;

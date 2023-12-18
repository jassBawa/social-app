import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/libs/prismadb";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth/next";
import { getProviders } from "next-auth/react";

const serverAuth = async (req: NextApiRequest) => {
  const providers = await getProviders();
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error(" line no -14Not signed in");
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

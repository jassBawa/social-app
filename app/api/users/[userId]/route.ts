import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  if (req.method !== "GET") {
    return new Response("Wrong http method", { status: 405 });
  }

  try {
    const userId = params.userId;

    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid Id");
    }

    const exisitingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    console.log(exisitingUser);

    const followersCount = await prisma.user.count({
      where: {
        followingIds: {
          has: userId,
        },
      },
    });

    return new Response(JSON.stringify({ ...exisitingUser, followersCount }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Server Error", {
      status: 500,
    });
  }
}

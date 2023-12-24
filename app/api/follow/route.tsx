import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";
import { NextRequest } from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(req: NextRequest) {
  try {
    // fetching current user
    const res = await req.json();
    const { userId } = res;

    const { currentUser } = await serverAuth(req);
    console.log(userId);

    if (!userId || typeof userId !== "string")
      throw new Error(" line 15 Invalid Id");

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new Error("line 23 Invalid Id");

    let updatedFollowingIds = [...(user.followingIds || [])];

    // appending to already existing followers
    updatedFollowingIds.push(userId);

    const updateUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });

    return new Response(JSON.stringify(updateUser), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Server error", { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    // fetching current user
    const res = await req.json();
    const { userId } = res;
    const { currentUser } = await serverAuth(req);

    if (!userId || typeof userId !== "string") throw new Error("Invalid Id");

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new Error("Invalid Id");

    let updatedFollowingIds = [...(user.followingIds || [])];

    // delete from existing entries
    updatedFollowingIds = updatedFollowingIds.filter(
      (followingId) => followingId !== userId
    );

    const updateUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });

    return new Response(JSON.stringify(updateUser), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Server error", { status: 400 });
  }
}

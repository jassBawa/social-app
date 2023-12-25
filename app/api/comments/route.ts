import serverAuth from "@/libs/serverAuth";
import { NextApiResponse } from "next";

import prisma from "@/libs/prismadb";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest, res: NextApiResponse) {
  try {
    console.log("=========================");
    const searchParams = req.nextUrl.searchParams;
    const { currentUser } = await serverAuth(req);

    const postId = searchParams.get("postId");
    const { body } = await req.json();

    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid Id");
    }

    // creating post

    const comment = await prisma.comment.create({
      data: {
        body,
        userId: currentUser.id,
        postId,
      },
    });

    console.log("==============================", comment);

    return new Response(JSON.stringify(comment), {
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return new Response("Server Error", {
      status: 400,
    });
  }
}

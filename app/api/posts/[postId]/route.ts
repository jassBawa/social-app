import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { postId: string } }
) {
  if (req.method !== "GET") {
    return new Response("Wrong http method", { status: 405 });
  }

  try {
    const postId = params.postId;

    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid post Id");
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return new Response(JSON.stringify(post), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Server Error", {
      status: 500,
    });
  }
}

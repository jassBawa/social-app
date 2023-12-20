import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return new Response("Wrong request method", {
      status: 405,
    });
  }

  try {
    const { currentUser } = await serverAuth(req);
    const { body } = await req.json();

    // creating post
    const post = await prisma.post.create({
      data: {
        body,
        userId: currentUser.id,
      },
    });

    return new Response(JSON.stringify(post), {
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return new Response("Server Error", {
      status: 400,
    });
  }
}

export async function GET(req: NextRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return new Response("Wrong request method", {
      status: 405,
    });
  }

  try {
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    console.log("------------------------------------------>", req.body);

    let posts;

    if (userId && typeof userId === "string") {
      posts = await prisma.post.findMany({
        where: {
          userId,
        },
        include: {
          user: true,
          comments: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      posts = await prisma.post.findMany({
        include: {
          user: true,
          comments: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    return new Response(JSON.stringify(posts), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Server Error", {
      status: 400,
    });
  }
}

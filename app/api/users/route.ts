import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

export async function GET(req: NextApiRequest) {
  if (req.method !== "GET") {
    return new Response("Wrong http method", { status: 405 });
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return new Response(JSON.stringify(users), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  }
}

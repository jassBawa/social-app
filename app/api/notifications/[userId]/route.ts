import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;

    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid Id");
    }

    const notifications = await prisma.notification.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hasNotification: false,
      },
    });

    return new Response(JSON.stringify(notifications), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Server Error", {
      status: 500,
    });
  }
}

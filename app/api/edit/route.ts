import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export async function PATCH(req: Request, res: NextApiResponse) {
  if (req.method !== "PATCH") {
    return new Response("POST API", { status: 405 });
  }

  try {
    const { currentUser } = await serverAuth(req);
    const { name, username, bio, profileImage, coverImage } = await req.json();

    if (!name || !username) {
      throw new Error("Missing fields");
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser?.id,
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      },
    });

    return new Response(JSON.stringify(updatedUser), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Server Error", {
      status: 400,
    });
  }
}

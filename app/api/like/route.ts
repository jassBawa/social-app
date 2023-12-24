import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // fetching current user
    const res = await req.json();
    console.log("running");
    const { postId } = res;

    const { currentUser } = await serverAuth(req);

    if (!postId || typeof postId !== "string") throw new Error("Invalid Id");

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) throw new Error("No post found for this id");

    let updatedLikedIds = [...(post.likedIds || [])];

    // appending to already existing liked ids
    updatedLikedIds.push(currentUser.id);

    const updatePost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: updatedLikedIds,
      },
    });

    return new Response(JSON.stringify(updatePost), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Server error", { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    // fetching current user
    const res = await req.json();
    const { postId } = res;

    const { currentUser } = await serverAuth(req);

    console.log("=============================================", postId);

    if (!postId || typeof postId !== "string") throw new Error("Invalid Id");

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    console.log("=============================================", post);

    if (!post) throw new Error("No post found for this id");

    let updatedLikedIds = [...(post.likedIds || [])];

    // delete from existing entries
    updatedLikedIds = updatedLikedIds.filter(
      (likedId) => likedId !== currentUser?.id
    );

    console.log(
      "=============================================",
      updatedLikedIds
    );

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: updatedLikedIds,
      },
    });

    console.log("=============================================", updatedPost);

    return new Response(JSON.stringify(updatedPost), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Server error", { status: 400 });
  }
}

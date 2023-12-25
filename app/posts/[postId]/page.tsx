"use client";
import Form from "@/components/Form";
import Header from "@/components/Header";
import CommentFeed from "@/components/posts/CommentFeed";
import PostItem from "@/components/posts/PostItem";
import usePost from "@/hooks/usePost";
import useUser from "@/hooks/useUser";
import { ClipLoader } from "react-spinners";

export default function Page({ params }: { params: { postId: string } }) {
  const { postId } = params;

  const { data: fetchPost, isLoading } = usePost(postId as string);

  if (isLoading || !fetchPost) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={60} />
      </div>
    );
  }

  return (
    <>
      <Header showBackArrow label="Tweet" />
      <PostItem data={fetchPost} />
      <Form postId={postId} isComment placeholder="Tweet your reply" />
      <CommentFeed comments={fetchPost?.comments} />
    </>
  );
}

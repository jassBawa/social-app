"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import usePosts from "@/hooks/usePosts";
import useRegisterModal from "@/hooks/useRegisterModal";
import axios from "axios";
import React, { useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";
import Button from "./ui/Button";
import Avatar from "./ui/Avatar";

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}
const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
  const formRef = useRef<HTMLTextAreaElement>(null);

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();

  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      if (!body && formRef.current && formRef) {
        formRef.current.style.border = "1px solid red";
        formRef?.current?.focus();
        return;
      }

      if (formRef && formRef.current) {
        formRef.current.style.border = "";
      }

      await axios.post("/api/posts", { body });

      setBody("");

      toast.success("Tweet Created");

      mutatePosts();
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }, [body, mutatePosts]);

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      {currentUser ? (
        <div className="flex flex-row gap-4">
          <Avatar userId={currentUser?.id} />
          <div className="w-full">
            <textarea
              ref={formRef}
              disabled={isLoading}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder={placeholder}
              className="disabled:opacity-80 peer resize-none mt-3 w-full bg-black ring-0 outline-none text-lg placeholder-neutral-500 text-white"
            ></textarea>

            <hr
              className="
                opacity-0 
                peer-focus:opacity-100
                h-[1px]
                w-full
                border-neutral-800
                transition
            "
            />
            <div className="mt-4 flex flex-row justify-end">
              <Button disabled={isLoading} onClick={onSubmit} label="Tweet" />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="text-2xl text-white text-center mb-4 font-bold">
            Welcome to Twitty
          </h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Login" onClick={loginModal.onOpen} />
            <Button secondary label="Register" onClick={registerModal.onOpen} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;

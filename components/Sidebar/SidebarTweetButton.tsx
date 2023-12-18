"use client";

import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { FaFeather } from "react-icons/fa";
import LoginModal from "../modals/LoginModal";
import useLoginModal from "@/hooks/useLoginModal";

function SidebarTweetButton() {
  const router = useRouter();
  const loginModal = useLoginModal();

  const onClick = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal]);

  return (
    <div onClick={onClick}>
      <div
        className="
            mt-6
            lg:hidden
            block
            px-4
            py-2
            rounded-full
            bg-sky-500
            hover:bg-opacity-90
            cursor-pointer
            transition
        "
      >
        <FaFeather size={24} color="white" />
      </div>
      <div
        className="
            mt-6
            hidden
            lg:block
            px-4
            py-2
            rounded-full
            bg-sky-500
            hover:bg-opacity-90
            cursor-pointer
            transition
        "
      >
        <p
          className="
          hidden
          lg:block
            text-center
            font-semibold
            text-white
            text-xl
        "
        >
          Tweet
        </p>
      </div>
    </div>
  );
}

export default SidebarTweetButton;

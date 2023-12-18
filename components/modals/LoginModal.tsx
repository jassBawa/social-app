"use client";

import React, { useCallback, useState } from "react";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

import Input from "../ui/Input";
import Modal from "../ui/Modal";

const LoginModal: React.FC = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) return;

    registerModal.onOpen();
    loginModal.onClose();
  }, [registerModal, loginModal, isLoading]);

  const onSubmit = useCallback(() => {
    try {
      setIsLoading(true);
      // TODO: handle login

      loginModal.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [loginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
      />
      <Input
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        Don&apos;t have an account?
        <span
          className="text-white cursor-pointer hover:underline pl-2"
          onClick={onToggle}
        >
          Create account
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      title="Login"
      actionLabel="Sign in"
      body={bodyContent}
      footer={footerContent}
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      isOpen={loginModal.isOpen}
    />
  );
};

export default LoginModal;

import React from "react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

export default function CombinedModal() {
  return (
    <>
      <LoginModal />
      <RegisterModal />
    </>
  );
}

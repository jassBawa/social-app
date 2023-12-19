import React from "react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import EditModal from "./EditModal";

export default function CombinedModal() {
  return (
    <>
      <EditModal />
      <LoginModal />
      <RegisterModal />
    </>
  );
}

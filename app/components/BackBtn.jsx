import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

const BackBtn = () => {
  const router = useRouter();
  const handleBackClick = () => {
    router.back();
  };
  return (
    <FontAwesomeIcon
      className="back-btn"
      size="2xl"
      onClick={handleBackClick}
      icon={faArrowLeft}
    />
  );
};

export default BackBtn;

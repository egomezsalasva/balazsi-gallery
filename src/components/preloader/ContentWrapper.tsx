"use client";

import { useState, useEffect } from "react";

export default function ContentWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("preloader-shown")) {
      setShowContent(true);
    } else {
      setTimeout(() => {
        setShowContent(true);
      }, 500);
    }
  }, []);

  return (
    <div
      style={{ opacity: showContent ? 1 : 0, transition: "opacity 0.3s ease" }}
    >
      {children}
    </div>
  );
}

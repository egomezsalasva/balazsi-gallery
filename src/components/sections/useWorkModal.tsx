import { useEffect, useState } from "react";

const useWorkModal = () => {
  const [workDetailOpen, setWorkDetailOpen] = useState(false);
  const [enquireOpen, setEnquireOpen] = useState(false);
  const handleWorkDetailOpen = () => {
    setWorkDetailOpen(true);
    console.log("workDetailOpen");
  };
  const handleWorkDetailClose = () => {
    setWorkDetailOpen(false);
    setEnquireOpen(false);
    console.log("workDetailClose");
  };
  const handleEnquireOpen = () => {
    setWorkDetailOpen(true);
    setEnquireOpen(true);
    console.log("enquireOpen");
  };
  const handleEnquireClose = () => {
    setEnquireOpen(false);
    console.log("enquireClose");
  };

  useEffect(() => {
    if (workDetailOpen || enquireOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [workDetailOpen, enquireOpen]);

  return {
    workDetailOpen,
    enquireOpen,
    handleWorkDetailOpen,
    handleWorkDetailClose,
    handleEnquireOpen,
    handleEnquireClose,
  };
};

export default useWorkModal;

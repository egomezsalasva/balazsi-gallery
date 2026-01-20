import { useEffect, useState } from "react";

const useWorkModal = () => {
  const [workDetailOpen, setWorkDetailOpen] = useState(false);
  const [enquireOpen, setEnquireOpen] = useState(false);
  const [enquireMobileOpen, setEnquireMobileOpen] = useState(false);
  const handleWorkDetailOpen = () => {
    if (window.innerWidth >= 768) {
      setWorkDetailOpen(true);
    }
  };
  const handleWorkDetailClose = () => {
    if (window.innerWidth >= 768) {
      setWorkDetailOpen(false);
      setEnquireOpen(false);
      setEnquireMobileOpen(false);
    }
  };
  const handleEnquireOpen = () => {
    if (window.innerWidth >= 768) {
      setWorkDetailOpen(true);
      setEnquireOpen(true);
      setEnquireMobileOpen(true);
    }
  };
  const handleEnquireClose = () => {
    if (window.innerWidth >= 768) {
      setEnquireOpen(false);
      setEnquireMobileOpen(false);
    }
  };
  const handleEnquireMobileOpen = () => {
    if (window.innerWidth < 768) {
      setEnquireMobileOpen(true);
    }
  };
  const handleEnquireMobileClose = () => {
    if (window.innerWidth < 768) {
      setEnquireMobileOpen(false);
      setEnquireOpen(false);
    }
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
    enquireMobileOpen,
    handleWorkDetailOpen,
    handleWorkDetailClose,
    handleEnquireOpen,
    handleEnquireClose,
    handleEnquireMobileOpen,
    handleEnquireMobileClose,
  };
};

export default useWorkModal;

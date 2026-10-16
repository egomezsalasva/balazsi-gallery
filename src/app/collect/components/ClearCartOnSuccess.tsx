"use client";
import { useEffect } from "react";
import { clearCartAction } from "../actions/clearCart";

export default function ClearCartOnSuccess() {
  useEffect(() => {
    void clearCartAction();
  }, []);

  return null;
}

import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Collect | Balazsi Gallery",
  description: "Collect | Balazsi Gallery",
};

export default function Collect() {
  redirect("/collect/pieces");
}

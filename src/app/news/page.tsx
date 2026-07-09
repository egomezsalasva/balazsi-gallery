import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "News | Balazsi Gallery",
  description: "News | Balazsi Gallery",
};

export default function News() {
  redirect("/news/news");
}

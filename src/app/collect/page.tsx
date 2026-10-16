import { Metadata } from "next";
import { redirect } from "next/navigation";
import { fetchCollectPieces } from "./utils/fetchCollectPieces";

export const metadata: Metadata = {
  title: "Collect | Balazsi Gallery",
  description: "Collect | Balazsi Gallery",
};

export default async function Collect() {
  const pieces = await fetchCollectPieces("Pieces");
  redirect(pieces.length > 0 ? "/collect/pieces" : "/collect/books");
}

"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const CharacterScene = dynamic(() => import("@/engine/Character"), {
  ssr: false,
});

export default function CharacterCanvas() {
  const pathname = usePathname();

  if (pathname === "/projects") return null;

  return <CharacterScene />;
}
// components/HeaderWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";

export default function HeaderWrapper() {
  const pathname = usePathname();

  const lightRoutes = ["/mission", "/shop", "/contact","/surveys","/outlets","/resources","/contact","/events"];
  const isLight = lightRoutes.includes(pathname);

  return <Header theme={isLight ? "light" : "dark"} />;
}

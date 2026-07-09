"use client";

import type { ReactNode } from "react";

import { AuthProvider as Provider } from "@/contexts/AuthContext";

interface Props {
  children: ReactNode;
}

export default function AuthProvider({
  children,
}: Props) {
  return <Provider>{children}</Provider>;
}
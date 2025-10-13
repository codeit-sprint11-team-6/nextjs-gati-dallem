// src/app/AppInitializer.tsx
"use client";
import { useEffect } from "react";
import { setupAuthTokenSync } from "@/utils/auth/setupAuthTokenSync";

export default function AppInitializer() {
  useEffect(() => {
    const dispose = setupAuthTokenSync();
    return dispose; // 리스너 정리
  }, []);
  return null;
}

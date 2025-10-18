// src/app/(protected)/layout.tsx
import AuthGuard from "@/guards/AuthGuard";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}

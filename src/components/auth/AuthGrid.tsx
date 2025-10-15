// src/components/auth/AuthGrid.tsx
import type { ReactNode } from "react";

interface AuthGridProps {
  left: ReactNode;
  right: ReactNode;
}

//   export default function AuthShell({ left, right, className }: Props) {
const AuthGrid = ({ left, right }: AuthGridProps) => {
  return (
    // <main className="grid min-h-[720px] w-full grid-cols-1 items-start gap-12 md:grid-cols-2 md:items-center">
    <main className="grid w-full grid-cols-1 items-center gap-12 md:grid-cols-2">
      <aside className="flex justify-center md:justify-start">{left}</aside>
      <section className="flex justify-center md:justify-end">{right}</section>
    </main>
  );
};

export default AuthGrid;

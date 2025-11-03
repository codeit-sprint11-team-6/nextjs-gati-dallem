// src/components/auth/AuthGrid.tsx
import type { ReactNode } from "react";

interface AuthGridProps {
  left: ReactNode;
  right: ReactNode;
}

const AuthGrid = ({ left, right }: AuthGridProps) => {
  return (
    <main className="grid w-full grid-cols-1 items-start gap-12 overflow-hidden md:grid-cols-2">
      <aside className="flex items-center justify-center md:flex">{left}</aside>
      <section className="flex h-full min-h-full items-center justify-center overflow-y-auto px-4 py-6 pt-4 md:justify-end">
        {right}
      </section>
    </main>
  );
};

export default AuthGrid;

"use client";

import { OverlayProvider } from "@/hooks/useOverlay";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  // TODO: MutationCache 사용한 React-Query 공통 에러 처리
  const [queryClient] = useState(() => new QueryClient());

  return (
    <OverlayProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </OverlayProvider>
  );
}

"use client";

import MessageModal from "@/components/common/MessageModal";
import { OverlayProvider, useOverlay } from "@/hooks/useOverlay";
import { MutationCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <OverlayProvider>
      <QueryProvider>{children}</QueryProvider>
    </OverlayProvider>
  );
}
export function QueryProvider({ children }: { children: ReactNode }) {
  const { overlay } = useOverlay();
  const queryClient = new QueryClient({
    mutationCache: new MutationCache({
      onError: (error) => {
        const message = error.message ?? "문제가 발생했습니다. 다시 시도해주세요.";
        overlay(<MessageModal message={message} />);
      },
    }),
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

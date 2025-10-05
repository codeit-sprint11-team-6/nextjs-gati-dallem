// src/app/providers.tsx
"use client";

import MessageModal from "@/components/common/MessageModal";
import { OverlayProvider, useOverlay } from "@/hooks/useOverlay";
import { MutationCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { useInitAuthClient } from "@/hooks/system/useInitAuthClient";
import { createQueryClient } from "@/lib/reactQuery";

export default function Providers({ children }: { children: ReactNode }) {
  // TODO: MutationCache 사용한 React-Query 공통 에러 처리
  const [queryClient] = useState(createQueryClient);

  const ready = useInitAuthClient();

  // 토큰 초기화 완료 전에는 렌더링 지연 (필요 시 스켈레톤 교체 가능)
  if (!ready) return null;

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

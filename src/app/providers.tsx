// src/app/providers.tsx
"use client";

import { OverlayProvider } from "@/hooks/useOverlay";
import { QueryClientProvider } from "@tanstack/react-query";
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
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </OverlayProvider>
  );
}

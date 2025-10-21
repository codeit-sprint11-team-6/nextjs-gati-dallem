// src/app/providers.tsx
"use client";

import MessageModal from "@/components/common/MessageModal";
import { useInitAuthClient } from "@/hooks/system/useInitAuthClient";
import { OverlayProvider, useOverlay } from "@/hooks/useOverlay";
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  const ready = useInitAuthClient();

  // 토큰 초기화 완료 전에는 렌더링 지연 (필요 시 스켈레톤 교체 가능)
  if (!ready) return null;

  return <OverlayProvider>{children}</OverlayProvider>;
}

export function QueryProvider({ children }: { children: ReactNode }) {
  const { overlay } = useOverlay();

  // _client.ts에서 401 응답은 이미 리다이렉트 처리함.
  // 단순히 401이면 모달을 띄우지 않도록 방지하는 역할만 수행
  const getStatus = (e: unknown) => {
    const err = e as any;
    const status = err?.response?.status ?? err?.status;
    const code = err?.code;
    if (status === 401 || code === "401") return 401;
    return undefined;
  };

  const DEFAULT_ERROR_MSG = "문제가 발생했습니다. 다시 시도해주세요.";
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error: unknown) => {
            if (getStatus(error) === 401) return; // 401 리다이렉트는 _client.ts에서 처리
            const message = (error as any)?.message ?? DEFAULT_ERROR_MSG;
            overlay(<MessageModal message={message} />);
          },
        }),
        mutationCache: new MutationCache({
          onError: (error: unknown) => {
            if (getStatus(error) === 401) return; // 401이면 모달 띄우지 않음
            const message = (error as any)?.message ?? DEFAULT_ERROR_MSG;
            overlay(<MessageModal message={message} />);
          },
        }),
        defaultOptions: { queries: { retry: 0 }, mutations: { retry: 0 } },
      }),
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

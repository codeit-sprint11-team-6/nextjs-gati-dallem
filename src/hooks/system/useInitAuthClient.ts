// src/hooks/system/useInitAuthClient.ts
"use client";

import { useLayoutEffect, useRef, useState } from "react";

/**
 * useInitAuthClient
 * - 앱 시작 시 1회 초기화 훅
 * - 현재는 tokenStore를 사용하므로 apiClient에 직접 토큰 주입 불필요
 * - 초기화 완료 시 ready 플래그 true 반환
 */

export const useInitAuthClient = () => {
  const [ready, setReady] = useState(false);
  const once = useRef(false);

  useLayoutEffect(() => {
    if (once.current) return;
    once.current = true;

    // 요청마다 tokenStore.get()을 통해 토큰을 읽으므로 별도 주입 로직 없음
    setReady(true);
  }, []);

  return ready;
};

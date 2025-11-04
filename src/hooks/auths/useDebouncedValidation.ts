// src/hooks/auths/useDebouncedValidation.ts
import { useEffect, useRef } from "react";

// deps가 변한 뒤 delay(ms) 동안 추가 입력이 없으면 callback 실행
export const useDebouncedValidation = (deps: any[], delay: number, callback: () => void) => {
  const cbRef = useRef(callback);

  useEffect(() => {
    cbRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const timer = setTimeout(() => cbRef.current?.(), delay);
    return () => clearTimeout(timer);
  }, [...deps, delay]);
};

// src/lib/fonts.ts
import localFont from 'next/font/local'

// Pretendard Variable Font
export const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
  preload: true,
})

// Tenada Static Font (.woff2 파일 사용)
export const tenada = localFont({
  src: '../../public/fonts/Tenada.woff2',
  weight: '800',  // ExtraBold weight
  variable: '--font-tenada',
  display: 'swap',
  preload: true,
})
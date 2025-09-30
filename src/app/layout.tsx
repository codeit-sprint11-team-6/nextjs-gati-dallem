import type { Metadata } from "next";
import { pretendard, tenada } from "@/lib/fonts";
import "../styles/globals.css";

import Providers from "./providers";
import MainNav from "@/layout/Header";

export const metadata: Metadata = {
  title: {
    template: "%s | 같이 달램",
    default: "모임 플랫폼",
  },
  description: "다양한 모임을 찾고 참여하세요",
  keywords: ["모임", "커뮤니티", "활동", "취미"],
  authors: [{ name: "코드잇 프론트엔드11기 6조" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    title: "11기 6조 모임 플랫폼",
    description: "다양한 모임을 찾고 참여하세요",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${tenada.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <Providers>
          <MainNav />
          <main className="min-h-dvh">{children}</main>
        </Providers>
      </body>
    </html>
  );
}

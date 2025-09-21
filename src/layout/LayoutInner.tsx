import MainNav from "./Header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <MainNav />
        <main className="min-h-dvh">{children}</main>
      </body>
    </html>
  );
}

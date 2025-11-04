// src/app/(auth)/signin/page.tsx

import LoginForm from "@/components/auth/LoginForm";
import AuthGrid from "@/components/auth/AuthGrid";
import AuthIntro from "@/components/auth/AuthIntro";

export const metadata = {
  title: "로그인 | 같이달램",
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const LoginPage = async ({ searchParams }: PageProps) => {
  const sp = await searchParams;
  const redirect = typeof sp.redirect === "string" ? sp.redirect : undefined;
  return (
    <AuthGrid
      left={
        <AuthIntro
          title="오늘부터 함께 시작해요"
          subtitle="같이달램"
          description="로그인 후 바로 모각코 참여!"
        />
      }
      right={
        <>
          <LoginForm redirect={redirect} />
        </>
      }
    />
  );
};

export default LoginPage;

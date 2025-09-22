import { Button } from "@/components/ui/button_01";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card_02";
import { Input } from "@/components/ui/input_03";
import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="p-6 max-w-xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>shadcn 테스트</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="이름을 입력하세요" />
            <Button>확인</Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

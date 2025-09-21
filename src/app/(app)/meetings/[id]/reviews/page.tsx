type Props = { params: { id: string } };
export default function Page({ params }: Props) {
  return <main className="p-6">모임 리뷰 목록 — 모임 ID: {params.id}</main>;
}

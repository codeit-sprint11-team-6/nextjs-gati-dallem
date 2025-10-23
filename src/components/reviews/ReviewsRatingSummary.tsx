import Image from "next/image";

interface ScoreBarProps {
  label: string;
  count: number;
  total: number;
}

function ScoreBar({ label, count, total }: ScoreBarProps) {
  const percentage = total > 0 ? (count / total) * 100 : 0;

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium leading-5 text-slate-500 md:text-sm">{label}</span>
      <div className="relative h-1.5 flex-1 overflow-hidden rounded-md bg-[#DAE3E3] md:h-2">
        {percentage > 0 && (
          <div
            className="absolute left-0 top-0 h-full rounded-md bg-green-500 transition-all"
            style={{ width: `${percentage}%` }}
          />
        )}
      </div>
      <span className="text-xs font-medium leading-5 text-slate-500 md:text-sm">{count}</span>
    </div>
  );
}

export default function ReviewsRatingSummary() {
  const averageScore = 0.0;
  const scoreBreakdown = [
    { score: 5, count: 0 },
    { score: 4, count: 0 },
    { score: 3, count: 0 },
    { score: 2, count: 0 },
    { score: 1, count: 0 },
  ];
  const totalReviews = scoreBreakdown.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="rounded-3xl border border-[#AFEFD1] bg-gradient-to-r from-[#DEF8EA] to-[#D9F6F4] p-6 md:px-6 md:py-10 lg:rounded-[32px] lg:px-40 lg:py-[41px]">
      <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-center md:gap-6 lg:gap-[133px]">
        {/* Left: Average Score */}
        <div className="flex flex-col items-center gap-3 md:gap-3">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-start gap-0.5">
              <div className="text-[28px] font-bold leading-9 text-gray-900 md:text-[40px] md:leading-9">
                {averageScore.toFixed(1)}
              </div>
            </div>
            <div className="flex items-start gap-0.5 md:gap-[2px]">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="relative h-6 w-6 md:h-[38px] md:w-[38px]">
                  <Image
                    src="/icon/heart_inactive.svg"
                    alt={`${i}번째 하트`}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden h-[141px] w-px bg-[#CCE5DA] md:block" />

        {/* Right: Score Breakdown */}
        <div className="w-full space-y-2 md:w-[337px]">
          {scoreBreakdown.map((item) => (
            <ScoreBar
              key={item.score}
              label={`${item.score}점`}
              count={item.count}
              total={totalReviews}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

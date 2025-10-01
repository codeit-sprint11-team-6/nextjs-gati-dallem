import { cn } from "@/utils/classNames";

export default function ReservedCardSkeleton() {
  return (
    <div
      className={cn(
        "relative animate-pulse overflow-hidden rounded-3xl bg-slate-100 hover:drop-shadow-sm",
        "md:items-upper md:flex md:min-w-[650px] md:justify-start md:gap-6 md:rounded-4xl md:p-6 md:pr-9",
      )}
      aria-label="모임 목록 스켈레톤"
    >
      <div className="aspect-[2.2] w-full animate-pulse overflow-hidden bg-slate-200 md:aspect-square md:w-[170px] md:rounded-3xl" />
      <div className="flex-2 p-4 pb-5 md:px-0 md:py-2">
        <div className="flex flex-col gap-3.5 md:gap-4">
          <div className="flex-start gap-2">
            <div className="h-8 w-19 animate-pulse rounded-3xl bg-slate-200" />
            <div className="h-8 w-19 animate-pulse rounded-3xl bg-slate-200" />
          </div>
          <div className="flex flex-col items-start justify-between gap-4">
            <div className="h-8 w-[300px] animate-pulse rounded-3xl bg-slate-200" />
            <div className="flex-between flex-col items-center gap-6 md:w-full md:flex-row md:gap-3">
              <div className="flex flex-col gap-2.5">
                <div className="h-5 w-16 animate-pulse rounded-3xl bg-slate-200" />
                <div className="flex gap-2.5 divide-x divide-slate-200">
                  <div className="h-5 w-25 animate-pulse rounded-3xl bg-slate-200" />
                  <div className="h-5 w-25 animate-pulse rounded-3xl bg-slate-200" />
                  <div className="h-5 w-25 animate-pulse rounded-3xl bg-slate-200" />
                </div>
              </div>
              <div className="flex-end w-full md:w-fit">
                <div className="h-11 w-[130px] animate-pulse rounded-3xl bg-slate-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

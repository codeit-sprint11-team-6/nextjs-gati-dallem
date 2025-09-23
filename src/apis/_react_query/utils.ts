// /src/apis/_rq/utils.ts
import { QueryClient } from "@tanstack/react-query";
import { queryKeys } from "./keys";

/** 공통 invalidation 유틸(선택) */
export async function invalidateGatherings(client: QueryClient) {
  await Promise.all([client.invalidateQueries({ queryKey: queryKeys.gatherings.all() })]);
}

export async function invalidateReviews(client: QueryClient) {
  await client.invalidateQueries({ queryKey: queryKeys.reviews.all() });
}

export async function invalidateAuth(client: QueryClient) {
  await client.invalidateQueries({ queryKey: queryKeys.auth.all() });
}

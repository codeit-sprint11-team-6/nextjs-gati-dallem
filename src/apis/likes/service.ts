import { apiClient } from "@/apis/_client";

export async function toggleFavorite(gatheringId: number) {
  return apiClient.post(`/gatherings/${gatheringId}/favorite`, {});
}

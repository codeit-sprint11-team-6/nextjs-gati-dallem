import type { AuthUser } from "@/types/auth";
import type { GetAuthUserResponse, UpdateAuthUserResponse } from "@/apis/auths/auths.schema";

export const toAuthUserFromGet = (dto: GetAuthUserResponse): AuthUser => ({
  teamId: dto.teamId,
  id: dto.id,
  email: dto.email,
  name: dto.name,
  companyName: dto.companyName,
  image: dto.image,
  createdAt: dto.createdAt,
  updatedAt: dto.updatedAt,
});
export const toAuthUserFromUpdate = (dto: UpdateAuthUserResponse): AuthUser => ({
  id: dto.id,
  email: dto.email,
  name: dto.name,
  companyName: dto.companyName,
  image: dto.image,
  createdAt: dto.createdAt,
  updatedAt: dto.updatedAt,
});

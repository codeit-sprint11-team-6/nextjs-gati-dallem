// /src/apis/auths/auths.service.ts
import type { AuthUser } from "@/types/auth";
import { apiClient } from "../_client";
import { toAuthUserFromGet, toAuthUserFromUpdate } from "./auths.adapters";
import {
  GetAuthUserResponse,
  GetAuthUserResponseSchema,
  SigninBody,
  SigninBodySchema,
  SigninResponse,
  SigninResponseSchema,
  SignoutResponse,
  SignoutResponseSchema,
  SignupBody,
  SignupBodySchema,
  SignupResponse,
  SignupResponseSchema,
  UpdateAuthUserBody,
  UpdateAuthUserBodySchema,
  UpdateAuthUserResponse,
  UpdateAuthUserResponseSchema,
} from "./auths.schema";

/** 회원가입 (메시지 DTO) */
export async function signup(body: SignupBody) {
  const parsed = SignupBodySchema.parse(body);
  const res = await apiClient.post<SignupResponse>(`/auths/signup`, parsed, SignupResponseSchema);
  return res;
}

/** 로그인 (토큰/메시지 DTO) */
export async function signin(body: SigninBody) {
  const parsed = SigninBodySchema.parse(body);
  const res = await apiClient.post<SigninResponse>(`/auths/signin`, parsed, SigninResponseSchema);
  if ("token" in res && res.token) {
    // apiClient 내부 토큰 동기화
    apiClient.setAuthToken(res.token);
  }
  return res;
}

/** 로그아웃 (메시지 DTO) */
export async function signout() {
  const res = await apiClient.post<SignoutResponse>(
    `/auths/signout`,
    undefined,
    SignoutResponseSchema,
  );
  return res;
}

/** 내 정보 조회 → 도메인 반환 */
export async function getAuthUser() {
  const dto = await apiClient.get<GetAuthUserResponse>(
    `/auths/user`,
    undefined,
    GetAuthUserResponseSchema,
  );
  const domain: AuthUser = toAuthUserFromGet(dto);
  return domain;
}

/** 내 정보 수정(multipart) → 도메인 반환 */
export async function updateAuthUser(body: UpdateAuthUserBody) {
  const parsed = UpdateAuthUserBodySchema.parse(body);
  const fd = new FormData();
  if (parsed.companyName !== undefined) fd.append("companyName", parsed.companyName);
  if (parsed.image instanceof Blob) fd.append("image", parsed.image);

  const dto = await apiClient.put<UpdateAuthUserResponse>(
    `/auths/user`,
    fd,
    UpdateAuthUserResponseSchema,
  );
  const domain: AuthUser = toAuthUserFromUpdate(dto);
  return domain;
}

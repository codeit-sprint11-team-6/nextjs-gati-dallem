// /src/apis/auths/auths.service.ts
import type { AuthUser } from "@/types/auth";
import { apiClient, HttpApiError } from "../_client"; //ApiError → HttpApiError
import { authEndpoints } from "./auths.endpoints";
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
import { tokenStore } from "@/utils/auth/token.store";

/** 회원가입 (메시지 DTO) */
export const signup = async (body: SignupBody): Promise<SignupResponse> => {
  const parsed = SignupBodySchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    const field = Array.isArray(first?.path) ? String(first.path[0]) : undefined;
    throw new HttpApiError(
      400,
      first?.message ?? "입력값을 확인해주세요.",
      "VALIDATION_ERROR",
      field,
    );
  }
  return apiClient.post<SignupResponse>(authEndpoints.signup(), parsed.data, SignupResponseSchema);
};

/** 로그인 (토큰/메시지 DTO) - 토큰 저장 후 응답 반환 */
export const signin = async (body: SigninBody): Promise<SigninResponse> => {
  const parsed = SigninBodySchema.safeParse(body);

  // 실패 시 HttpApiError로 변환해서 던지기 (폼에서 잡아서 message만 보여줌)
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    const field = Array.isArray(first?.path) ? String(first.path[0]) : undefined;
    throw new HttpApiError(
      400,
      first?.message ?? "입력값을 확인해주세요.",
      "VALIDATION_ERROR",
      field,
    );
  }

  // 통과한 데이터만 서버에 전송
  const res = await apiClient.post<SigninResponse>(
    authEndpoints.signin(),
    parsed.data,
    SigninResponseSchema,
  );

  const t = (res as any)?.token ?? (res as any)?.accessToken;
  if (typeof t === "string" && t) {
    tokenStore.set(t);
  }
  return res;
};

/** 로그아웃 (메시지 DTO) - 서버 호출(실패해도 성공 취급) + 토큰 제거*/
export const signout = async (): Promise<SignoutResponse> => {
  const res = await apiClient
    .post<SignoutResponse>(authEndpoints.signout(), undefined, SignoutResponseSchema)
    .catch(() => ({ message: "signed-out" }) as SignoutResponse);

  tokenStore.clear();
  return res;
};

/** 내 정보 조회 → 도메인 반환 - 401이면 토큰 정리 후 null 반환 */
export const getAuthUser = async (): Promise<AuthUser | null> => {
  try {
    const dto = await apiClient.get<GetAuthUserResponse>(
      authEndpoints.me(), // "/auths/user"
      undefined,
      GetAuthUserResponseSchema,
    );
    return toAuthUserFromGet(dto);
  } catch (e: unknown) {
    // 401 응답은 ApiClient/AuthGuard에서 처리하므로 중복 방지를 위해 주석 처리
    // if (e instanceof HttpApiError) {
    //   if (e.status === 401 /* || e.status === 404 || e.status === 500 */) {
    //     tokenStore.clear?.();
    //     return null;
    //   }
    // }
    throw e;
  }
};

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

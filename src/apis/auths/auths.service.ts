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
  const parsed = SignupBodySchema.parse(body);
  const res = await apiClient.post<SignupResponse>(
    authEndpoints.signup(),
    parsed,
    SignupResponseSchema,
  );
  return res;
};

/** 로그인 (토큰/메시지 DTO) - 토큰 저장 후 응답 반환 */
export const signin = async (body: SigninBody): Promise<SigninResponse> => {
  const parsed = SigninBodySchema.parse(body);
  const res = await apiClient.post<SigninResponse>(
    authEndpoints.signin(),
    parsed,
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
    // const domain: AuthUser = toAuthUserFromGet(dto);
    return toAuthUserFromGet(dto);
  } catch (e: unknown) {
    if (e instanceof HttpApiError) {
      if (e.status === 401 /* || e.status === 404 || e.status === 500 */) {
        tokenStore.clear?.();
        return null;
      }
    }
    throw e;
  }
};

// /** 내 정보 조회 → 도메인 반환 */
// export async function getAuthUser() {
//   const dto = await apiClient.get<GetAuthUserResponse>(
//     `/auths/user`,
//     undefined,
//     GetAuthUserResponseSchema,
//   );
//   const domain: AuthUser = toAuthUserFromGet(dto);
//   return domain;
// }

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

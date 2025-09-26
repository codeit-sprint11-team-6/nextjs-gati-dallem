// /src/apis/_client.ts
import { ZodType } from "zod";
import { ApiErrorSchema } from "./_shared.schema";

interface ReqOptionsType<T> extends RequestInit {
  /** 응답 Zod 스키마 (성공 응답) */
  responseSchema?: ZodType<T>;
  /** 성공 응답이 비어있는 경우(true) → 파싱 생략 */
  emptyResponse?: boolean;
}

/**
 * NOTE:
 * - BASE_URL, TEAM_ID는 이 클래스 내부에서만 사용됩니다.
 * - 외부에서는 setAuthToken 만(선택) 사용하면 됩니다.
 */
export class ApiClient {
  private static readonly BASE_URL = "https://fe-adv-project-together-dallaem.vercel.app";
  private static readonly TEAM_ID = "11-6";

  private authToken?: string;
  /** 토큰 설정 */
  setAuthToken(token?: string) {
    this.authToken = token;
  }

  /** 공통 쿼리 문자열 빌더 */
  private _buildQuery(params?: Record<string, unknown>): string {
    if (!params) return "";
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([keyNm, value]) => {
      if (value === undefined || value === null) return;
      searchParams.append(keyNm, String(value));
    });
    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : "";
  }

  /** 공통 요청 래퍼 (Zod로 결과 파싱) */
  private async _request<T>(path: string, options: ReqOptionsType<T> = {}): Promise<T> {
    const url = `${ApiClient.BASE_URL}/${ApiClient.TEAM_ID}${path}`;
    const headers = new Headers(options.headers);

    if (this.authToken) headers.set("Authorization", `Bearer ${this.authToken}`);

    const isFormData = options.body instanceof FormData;
    if (!isFormData) headers.set("Content-Type", headers.get("Content-Type") ?? "application/json");

    const resp = await fetch(url, { ...options, headers });

    // #region 에러 응답 처리
    if (!resp.ok) {
      let raw: unknown;
      try {
        raw = await resp.json();
      } catch {
        throw new Error(`HTTP ${resp.status}`);
      }
      const parsed = ApiErrorSchema.safeParse(raw);
      if (parsed.success) throw new Error(parsed.data.message);
      else throw new Error(`HTTP ${resp.status}`);
    }
    // #endregion

    // No Content 등 처리
    if (options.emptyResponse) return undefined as T;

    // #region 성공 응답 파싱
    const data = await resp.json();
    if (!options.responseSchema) return data as T;
    // #endregion

    // #region 스키마 미스매치 시 바로 에러
    const parsed = options.responseSchema.safeParse(data);
    if (!parsed.success) {
      parsed?.error?.issues.map((issue) => console.log(issue));
      throw new Error("Response schema validation failed");
    }
    // #endregion 스키마 미스매치 시 바로 에러

    return parsed.data as T;
  }

  /** GET 헬퍼 */
  get<T>(path: string, query?: Record<string, unknown>, responseSchema?: ZodType<T>) {
    const qs = this._buildQuery(query);
    return this._request<T>(`${path}${qs}`, { method: "GET", responseSchema });
  }

  /** POST 헬퍼 (JSON / FormData 자동 처리) */
  post<T>(path: string, body?: Record<string, unknown> | FormData, responseSchema?: ZodType<T>) {
    const isForm = body instanceof FormData;
    const payload = isForm ? (body as FormData) : body ? JSON.stringify(body) : undefined;
    return this._request<T>(path, {
      method: "POST",
      body: payload,
      responseSchema,
      // formData면 content-type 자동 설정되도록 그대로 둠
      headers: isForm ? {} : undefined,
    });
  }

  /** PUT 헬퍼 */
  put<T>(path: string, body?: Record<string, unknown> | FormData, responseSchema?: ZodType<T>) {
    const isForm = body instanceof FormData;
    const payload = isForm ? (body as FormData) : body ? JSON.stringify(body) : undefined;
    return this._request<T>(path, {
      method: "PUT",
      body: payload,
      responseSchema,
      headers: isForm ? {} : undefined,
    });
  }

  /** DELETE 헬퍼 */
  delete<T>(path: string, responseSchema?: ZodType<T>) {
    return this._request<T>(path, { method: "DELETE", responseSchema });
  }
}

/** 싱글톤 클라이언트 (프로젝트 전역에서 재사용) */
export const apiClient = new ApiClient();

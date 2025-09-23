// /src/apis/_client.ts
import { z, ZodTypeAny } from "zod";
import { ApiErrorSchema } from "./_shared.schema";

/**
 * NOTE:
 * - BASE_URL, TEAM_ID는 이 클래스 내부에서만 사용됩니다.
 * - 외부에서는 setAuthToken 만(선택) 사용하면 됩니다.
 */
export class ApiClient {
  /** 외부에서 보지 못하게 은닉 */
  private static readonly BASE_URL = "https://fe-adv-project-together-dallaem.vercel.app";
  private static readonly TEAM_ID = "11-6";

  private authToken?: string; // Bearer 토큰(선택)

  setAuthToken(token?: string) {
    this.authToken = token;
  }

  /** 공통 쿼리 문자열 빌더 */
  private buildQuery(params?: Record<string, unknown>): string {
    if (!params) return "";
    const usp = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v === undefined || v === null) return;
      usp.append(k, String(v));
    });
    const qs = usp.toString();
    return qs ? `?${qs}` : "";
  }

  /** 공통 요청 래퍼 (Zod로 결과 파싱) */
  private async request<T>(
    path: string,
    options: RequestInit & {
      /** 응답 Zod 스키마 (성공 응답) */
      responseSchema?: ZodTypeAny;
      /** 성공 응답이 비어있는 경우(true) → 파싱 생략 */
      emptyResponse?: boolean;
    } = {},
  ): Promise<T> {
    const url = `${ApiClient.BASE_URL}/${ApiClient.TEAM_ID}${path}`;
    const headers = new Headers(options.headers);

    // JSON 바디면 헤더 세팅
    const isFormData = options.body instanceof FormData;
    if (!isFormData) {
      headers.set("Content-Type", headers.get("Content-Type") ?? "application/json");
    }
    // 인증 토큰
    if (this.authToken) headers.set("Authorization", `Bearer ${this.authToken}`);

    const resp = await fetch(url, { ...options, headers });

    // 2xx가 아니면 공통 에러 파싱 시도
    if (!resp.ok) {
      let raw: unknown;
      try {
        raw = await resp.json();
      } catch {
        throw new Error(`HTTP ${resp.status}`);
      }
      const parsed = ApiErrorSchema.safeParse(raw);
      if (parsed.success) {
        const { code, message, parameter } = parsed.data;
        const msg = [code, parameter, message].filter(Boolean).join(" | ");
        throw new Error(msg || `HTTP ${resp.status}`);
      }
      // 알 수 없는 포맷
      throw new Error(`HTTP ${resp.status}`);
    }

    // No Content 등
    if (options.emptyResponse) return undefined as T;

    // 성공 응답 파싱
    const data = await resp.json();
    if (!options.responseSchema) return data as T;

    const parsed = options.responseSchema.safeParse(data);
    if (!parsed.success) {
      // 스키마 미스매치 시 바로 에러
      parsed?.error?.issues.map((issue) => console.log(issue));
      throw new Error("Response schema validation failed");
    }
    return parsed.data as T;
  }

  /** GET 헬퍼 */
  get<T>(path: string, query?: Record<string, unknown>, responseSchema?: ZodTypeAny) {
    const qs = this.buildQuery(query);
    return this.request<T>(`${path}${qs}`, { method: "GET", responseSchema });
  }

  /** POST 헬퍼 (JSON / FormData 자동 처리) */
  post<T>(path: string, body?: Record<string, unknown> | FormData, responseSchema?: ZodTypeAny) {
    const isForm = body instanceof FormData;
    const payload = isForm ? (body as FormData) : body ? JSON.stringify(body) : undefined;
    return this.request<T>(path, {
      method: "POST",
      body: payload,
      responseSchema,
      // formData면 content-type 자동 설정되도록 그대로 둠
      headers: isForm ? {} : undefined,
    });
  }

  /** PUT 헬퍼 */
  put<T>(path: string, body?: Record<string, unknown> | FormData, responseSchema?: ZodTypeAny) {
    const isForm = body instanceof FormData;
    const payload = isForm ? (body as FormData) : body ? JSON.stringify(body) : undefined;
    return this.request<T>(path, {
      method: "PUT",
      body: payload,
      responseSchema,
      headers: isForm ? {} : undefined,
    });
  }

  /** DELETE 헬퍼 */
  delete<T>(path: string, responseSchema?: ZodTypeAny) {
    return this.request<T>(path, { method: "DELETE", responseSchema });
  }
}

/** 싱글톤 클라이언트 (프로젝트 전역에서 재사용) */
export const apiClient = new ApiClient();

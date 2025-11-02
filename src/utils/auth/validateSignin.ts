// 로그인 전용: 공란 방지 + 이메일 형식만
import { EMAIL_REGEX } from "@/constants/auth/constraints";
import { AUTH_ERROR_MESSAGES } from "@/constants/auth/errorMessages";

export type SigninFields = {
  email: string;
  password?: string;
};

export type SigninErrors = Partial<Record<keyof SigninFields, string>>;

const req = (v?: string) => !!v && v.trim().length > 0;

export const validateSignin = (f: SigninFields): SigninErrors => {
  const e: SigninErrors = {};

  const email = f.email?.trim() ?? "";
  const pw = f.password ?? "";

  if (!req(email) || !EMAIL_REGEX.test(email)) e.email = AUTH_ERROR_MESSAGES.fields.email.INVALID;
  if (!req(pw)) e.password = AUTH_ERROR_MESSAGES.fields.password.REQUIRED;

  return e;
};

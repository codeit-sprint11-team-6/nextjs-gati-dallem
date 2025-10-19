// src/utils/auth/validateSignup.ts
import { EMAIL_REGEX, MIN_PASSWORD_LEN } from "@/constants/auth/constraints";
import { AUTH_ERROR_MESSAGES } from "@/constants/auth/errorMessages";

const isEmail = (v: string) => EMAIL_REGEX.test(v);
const req = (v?: string) => !!v && v.trim().length > 0;

export type SignupFields = {
  name: string;
  email: string;
  company: string;
  password: string;
  confirmPassword: string;
};

export type SignupErrors = Partial<Record<keyof SignupFields, string>>;

export const validateSignup = (f: SignupFields): SignupErrors => {
  const e: SignupErrors = {};

  // 이름
  if (!req(f.name)) e.name = AUTH_ERROR_MESSAGES.fields.name.REQUIRED;

  // 이메일
  if (!req(f.email)) e.email = AUTH_ERROR_MESSAGES.fields.email.REQUIRED;
  else if (!isEmail(f.email)) e.email = AUTH_ERROR_MESSAGES.fields.email.INVALID;

  // 회사명
  if (!req(f.company)) e.company = AUTH_ERROR_MESSAGES.fields.companyName.REQUIRED;

  // 비밀번호
  if (!req(f.password)) e.password = AUTH_ERROR_MESSAGES.fields.password.REQUIRED;
  else if (f.password.length < MIN_PASSWORD_LEN)
    e.password = AUTH_ERROR_MESSAGES.fields.password.WEAK;

  // 비밀번호 확인
  if (!req(f.confirmPassword)) {
    e.confirmPassword = AUTH_ERROR_MESSAGES.fields.confirmPassword.REQUIRED;
  } else if (f.password !== f.confirmPassword) {
    e.confirmPassword = AUTH_ERROR_MESSAGES.fields.confirmPassword.NOT_MATCH;
  }

  return e;
};

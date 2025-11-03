// src/utils/auth/validateSignup.ts
import {
  EMAIL_REGEX,
  MIN_PASSWORD_LEN,
  NAME_MIN_LEN,
  NAME_MAX_LEN,
  NAME_REGEX,
  COMPANY_MIN_LEN,
  COMPANY_MAX_LEN,
  COMPANY_REGEX,
  PASSWORD_DISALLOW_WHITESPACE,
  USE_PASSWORD_COMPLEXITY,
  PASSWORD_REGEX,
} from "@/constants/auth/constraints";
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

  // 일단 trim해서 사용(검증 일관성)
  const name = f.name?.trim() ?? "";
  const email = f.email?.trim() ?? "";
  const company = f.company?.trim() ?? "";
  const password = f.password ?? "";
  const confirmPassword = f.confirmPassword ?? "";

  // 이름
  if (!req(name)) e.name = AUTH_ERROR_MESSAGES.fields.name.REQUIRED;
  else if (name.length < NAME_MIN_LEN) e.name = AUTH_ERROR_MESSAGES.fields.name.TOO_SHORT;
  else if (name.length > NAME_MAX_LEN) e.name = AUTH_ERROR_MESSAGES.fields.name.TOO_LONG;
  else if (!NAME_REGEX.test(name)) e.name = AUTH_ERROR_MESSAGES.fields.name.INVALID;

  // 이메일
  if (!req(email)) e.email = AUTH_ERROR_MESSAGES.fields.email.REQUIRED;
  else if (!isEmail(email)) e.email = AUTH_ERROR_MESSAGES.fields.email.INVALID;

  // 회사명
  if (!req(company)) e.company = AUTH_ERROR_MESSAGES.fields.companyName.REQUIRED;
  else if (company.length < COMPANY_MIN_LEN)
    e.company = AUTH_ERROR_MESSAGES.fields.companyName.TOO_SHORT;
  else if (company.length > COMPANY_MAX_LEN)
    e.company = AUTH_ERROR_MESSAGES.fields.companyName.TOO_LONG;
  else if (!COMPANY_REGEX.test(company)) e.company = AUTH_ERROR_MESSAGES.fields.companyName.INVALID;

  // 비밀번호
  if (!req(password)) e.password = AUTH_ERROR_MESSAGES.fields.password.REQUIRED;
  else if (password.length < MIN_PASSWORD_LEN)
    e.password = AUTH_ERROR_MESSAGES.fields.password.WEAK;
  else if (PASSWORD_DISALLOW_WHITESPACE && /\s/.test(password))
    e.password = AUTH_ERROR_MESSAGES.fields.password.WHITESPACE;
  else if (USE_PASSWORD_COMPLEXITY && !PASSWORD_REGEX.test(password))
    e.password = AUTH_ERROR_MESSAGES.fields.password.COMPLEXITY;

  // 비밀번호 확인
  if (!req(confirmPassword))
    e.confirmPassword = AUTH_ERROR_MESSAGES.fields.confirmPassword.REQUIRED;
  else if (password !== confirmPassword)
    e.confirmPassword = AUTH_ERROR_MESSAGES.fields.confirmPassword.NOT_MATCH;

  return e;
};

/**
 * ================================
 * SERVER ONLY ENV VARIABLES
 * 클라이언트 번들에 포함 금지!
 * 서버에서만 import (API Route, Server Actions 등)
 * ================================
 */
function required(name: string, value: string | undefined) {
  if (!value) throw new Error(`[ENV] Missing required server env: ${name}`);
  return value;
}

export const SERVER_ENV = {
  AUTH_CLIENT_ID: required("AUTH_CLIENT_ID", process.env.AUTH_CLIENT_ID),
  AUTH_CLIENT_SECRET: required("AUTH_CLIENT_SECRET", process.env.AUTH_CLIENT_SECRET),
};

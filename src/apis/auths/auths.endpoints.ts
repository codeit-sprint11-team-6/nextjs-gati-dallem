// src/apis/auths/auths.endpoints.ts
// import { API_BASE_URL, TEAM_ID } from "@/config/commonConfig";
// const base = `${API_BASE_URL}/${TEAM_ID}`;

// TODO: 버셀 배포 후 commonConfig + env 파일 형태로 변경하기

// const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID ?? "11-6";

// export const authEndpoints = {
//   signup: () => `/${TEAM_ID}/auths/signup`,
//   signin: () => `/${TEAM_ID}/auths/signin`,
//   signout: () => `/${TEAM_ID}/auths/signout`,
//   me: () => `/${TEAM_ID}/auths/user`,
// };

export const authEndpoints = {
  signup: () => "/auths/signup",
  signin: () => "/auths/signin",
  signout: () => "/auths/signout",
  me: () => "/auths/user",
};

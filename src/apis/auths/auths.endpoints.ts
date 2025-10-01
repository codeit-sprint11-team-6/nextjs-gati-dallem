// src/apis/auths/auths.endpoints.ts
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

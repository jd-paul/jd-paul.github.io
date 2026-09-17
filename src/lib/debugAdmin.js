// Local-dev only: renders admin UI without a GitHub session.
// RLS still rejects writes without a real authenticated session.
// .env.local is loaded by production builds too — remove before deploying.
export const DEBUG_ADMIN = process.env.REACT_APP_DEBUG_ADMIN === "true";

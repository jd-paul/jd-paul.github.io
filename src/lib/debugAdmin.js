// Local-dev only: renders admin UI without a GitHub session.
// RLS still rejects writes without a real authenticated session.
// Hard-gated to NODE_ENV so the flag can never leak into a production
// bundle even if .env.local sets REACT_APP_DEBUG_ADMIN=true.
export const DEBUG_ADMIN =
  process.env.NODE_ENV === "development" &&
  process.env.REACT_APP_DEBUG_ADMIN === "true";

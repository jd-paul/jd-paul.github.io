import { ADMIN_USER_ID, getAdminSession } from "./adminAuth";

test("accepts only the owner's session", () => {
  const ownerSession = { user: { id: ADMIN_USER_ID } };
  expect(getAdminSession(ownerSession)).toBe(ownerSession);
  expect(getAdminSession({ user: { id: "another-user" } })).toBeNull();
  expect(getAdminSession(null)).toBeNull();
});

export const ADMIN_USER_ID = "36b34aa4-4047-42f1-bdbf-295c5dfe4706";

export const getAdminSession = (session) =>
  session?.user?.id === ADMIN_USER_ID ? session : null;

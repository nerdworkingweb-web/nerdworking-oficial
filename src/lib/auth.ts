export function getAdminCredentials() {
  const username =
    process.env.nw_admin_user?.trim() ||
    process.env.NW_ADMIN_USER?.trim() ||
    "";
  const password =
    process.env.nw_admin_password?.trim() ||
    process.env.NW_ADMIN_PASSWORD?.trim() ||
    "";

  return { username, password };
}

export function verifyAdminCredentials(
  username: string,
  password: string
): boolean {
  const expected = getAdminCredentials();
  if (!expected.username || !expected.password) return false;
  return username === expected.username && password === expected.password;
}

/** Session token derived from credentials — verified server-side on each request. */
export function createAdminSessionToken(
  username: string,
  password: string
): string {
  return Buffer.from(
    JSON.stringify({ username, password }),
    "utf8"
  ).toString("base64url");
}

export function verifyAdminSessionToken(token: string | null): boolean {
  if (!token) return false;
  try {
    const parsed = JSON.parse(
      Buffer.from(token, "base64url").toString("utf8")
    ) as { username?: string; password?: string };
    if (!parsed.username || !parsed.password) return false;
    return verifyAdminCredentials(parsed.username, parsed.password);
  } catch {
    return false;
  }
}

export function verifyAdminToken(request: Request): boolean {
  const headerToken = request.headers.get("x-admin-token");
  return verifyAdminSessionToken(headerToken);
}

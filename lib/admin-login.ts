import { SESSION_COOKIE, TENANT_COOKIE } from "./admin-session.ts"

const SESSION_DAYS = 7
const INVALID_CREDENTIALS = "Invalid email or password."

export type AdminUser = {
  id: string
  email: string
  password_hash: string
  is_active: boolean
  tenant_id: string
}

export type AdminSession = {
  adminUserId: string
  token: string
  expiresAt: string
  ip: string
  userAgent: string
}

export type AdminLoginDependencies = {
  tenantId: string
  secureCookies: boolean
  now(): Date
  createToken(): string
  findAdminUser(email: string, tenantId: string): Promise<AdminUser | null>
  verifyPassword(password: string, passwordHash: string): Promise<boolean>
  createSession(session: AdminSession): Promise<void>
  recordLastLogin(adminUserId: string, at: string): Promise<void>
}

function loginError(request: Request, message: string) {
  const target = new URL("/admin/login", request.url)
  target.searchParams.set("error", message)
  return new Response(null, { status: 303, headers: { location: target.toString() } })
}

function serializeCookie(name: string, value: string, expiresAt: Date, secure: boolean) {
  return [
    `${name}=${value}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Expires=${expiresAt.toUTCString()}`,
    secure ? "Secure" : "",
  ].filter(Boolean).join("; ")
}

export function createLoginHandler(dependencies: AdminLoginDependencies) {
  return async function handleLogin(request: Request) {
    let email: string
    let password: string

    try {
      const form = await request.formData()
      email = String(form.get("email") || "").trim().toLowerCase()
      password = String(form.get("password") || "")
    } catch {
      return loginError(request, "Invalid login request.")
    }

    if (!email || !password) return loginError(request, "Email and password are required.")

    let user: AdminUser | null
    try {
      user = await dependencies.findAdminUser(email, dependencies.tenantId)
    } catch {
      return loginError(request, "Unable to sign in. Please try again.")
    }

    if (!user || user.tenant_id !== dependencies.tenantId || !user.is_active) {
      return loginError(request, INVALID_CREDENTIALS)
    }
    if (!(await dependencies.verifyPassword(password, user.password_hash))) {
      return loginError(request, INVALID_CREDENTIALS)
    }

    const now = dependencies.now()
    const expiresAt = new Date(now.getTime() + SESSION_DAYS * 24 * 60 * 60 * 1000)
    const token = dependencies.createToken()

    try {
      await dependencies.createSession({
        adminUserId: user.id,
        token,
        expiresAt: expiresAt.toISOString(),
        ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "",
        userAgent: request.headers.get("user-agent") || "",
      })
      await dependencies.recordLastLogin(user.id, now.toISOString())
    } catch {
      return loginError(request, "Unable to sign in. Please try again.")
    }

    const headers = new Headers({ location: new URL("/admin", request.url).toString() })
    headers.append("set-cookie", serializeCookie(SESSION_COOKIE, token, expiresAt, dependencies.secureCookies))
    headers.append(
      "set-cookie",
      serializeCookie(TENANT_COOKIE, dependencies.tenantId, expiresAt, dependencies.secureCookies),
    )
    return new Response(null, { status: 303, headers })
  }
}

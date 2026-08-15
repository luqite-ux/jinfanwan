import assert from "node:assert/strict"
import test from "node:test"
import * as adminLogin from "../lib/admin-login.ts"

const tenantId = "d1690bc3-c00b-4558-b669-92a7adf93179"

function loginRequest(email = "info@jinfanwanfoodstorage.com", password = "correct-password") {
  return new Request("https://jinfanwanfoodstorage.com/api/auth/login", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ email, password }),
  })
}

function dependencies(overrides = {}) {
  const sessions = []
  const logins = []
  return {
    value: {
      tenantId,
      secureCookies: true,
      now: () => new Date("2026-08-15T03:00:00.000Z"),
      createToken: () => "session-token",
      findAdminUser: async () => ({
        id: "admin-user-id",
        email: "info@jinfanwanfoodstorage.com",
        password_hash: "stored-hash",
        is_active: true,
        tenant_id: tenantId,
      }),
      verifyPassword: async (password) => password === "correct-password",
      createSession: async (session) => sessions.push(session),
      recordLastLogin: async (id, at) => logins.push({ id, at }),
      ...overrides,
    },
    sessions,
    logins,
  }
}

test("valid tenant login creates a session and redirects to customer admin", async () => {
  assert.equal(typeof adminLogin.createLoginHandler, "function")
  const deps = dependencies()
  const response = await adminLogin.createLoginHandler(deps.value)(loginRequest())
  const cookies = response.headers.getSetCookie().join("\n")

  assert.equal(response.status, 303)
  assert.equal(response.headers.get("location"), "https://jinfanwanfoodstorage.com/admin")
  assert.match(cookies, /hq_admin_session=session-token/)
  assert.match(cookies, new RegExp(`hq_tenant_id=${tenantId}`))
  assert.equal(deps.sessions.length, 1)
  assert.equal(deps.logins.length, 1)
})

test("wrong password returns a generic login error without cookies", async () => {
  assert.equal(typeof adminLogin.createLoginHandler, "function")
  const deps = dependencies({ verifyPassword: async () => false })
  const response = await adminLogin.createLoginHandler(deps.value)(loginRequest())

  assert.equal(response.status, 303)
  assert.match(response.headers.get("location"), /\/admin\/login\?error=Invalid\+email\+or\+password/)
  assert.equal(response.headers.getSetCookie().length, 0)
  assert.equal(deps.sessions.length, 0)
})

test("inactive and cross-tenant accounts cannot create sessions", async () => {
  assert.equal(typeof adminLogin.createLoginHandler, "function")
  for (const user of [
    { is_active: false, tenant_id: tenantId },
    { is_active: true, tenant_id: "another-tenant" },
  ]) {
    const deps = dependencies({
      findAdminUser: async () => ({
        id: "admin-user-id",
        email: "info@jinfanwanfoodstorage.com",
        password_hash: "stored-hash",
        ...user,
      }),
    })
    const response = await adminLogin.createLoginHandler(deps.value)(loginRequest())

    assert.equal(response.status, 303)
    assert.equal(response.headers.getSetCookie().length, 0)
    assert.equal(deps.sessions.length, 0)
  }
})

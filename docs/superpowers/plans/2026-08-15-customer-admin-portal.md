# JINFANWAN Customer Admin Portal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a real tenant-scoped `/admin` login and shared-admin proxy to the formal JINFANWAN domain.

**Architecture:** The customer site authenticates against its own tenant row in shared Supabase, creates the standard admin session, and proxies authenticated admin pages to `NEXT_PUBLIC_ADMIN_URL`. Middleware protects `/admin/*` while local login/logout routes remain public.

**Tech Stack:** Next.js 16 App Router, Supabase JS, bcryptjs, Node test runner, Vercel.

## Global Constraints

- Limit every admin query and update to tenant `d1690bc3-c00b-4558-b669-92a7adf93179` through `TENANT_ID`.
- Do not change shared `huanqiu-admin` code or other tenants.
- Keep the existing password hash unchanged.
- Use server-only Supabase service credentials.

---

### Task 1: Tenant Login And Admin Proxy

**Files:**
- Create: `lib/admin-session.ts`
- Create: `lib/admin-login.ts`
- Create: `app/api/auth/login/route.ts`
- Create: `app/admin/login/page.tsx`
- Create: `app/admin/logout/route.ts`
- Create: `proxy.ts`
- Modify: `next.config.mjs`
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Modify: `tests/site-quality.test.mjs`

**Interfaces:**
- Consumes: `TENANT_ID`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `NEXT_PUBLIC_ADMIN_URL`.
- Produces: `createLoginHandler(dependencies)`, `/api/auth/login`, `/admin/login`, `/admin/logout`, and protected `/admin/*` proxy behavior.

- [x] **Step 1: Write failing login-handler tests**

Add tests that call `createLoginHandler` with real `NextRequest` objects and dependency fakes. Assert a valid account produces a `303` redirect to `/admin` plus both cookies, while wrong-password, inactive, and cross-tenant accounts redirect to `/admin/login` without cookies.

- [x] **Step 2: Verify the tests fail**

Run: `pnpm test`

Expected: FAIL because `lib/admin-login.ts` and `createLoginHandler` do not exist.

- [x] **Step 3: Implement the login/session boundary**

Create a dependency-injected handler for tests and Production dependencies that query `admin_users`, verify bcrypt hashes, insert `admin_user_sessions`, update `last_login_at`, and write the standard cookies.

- [x] **Step 4: Add customer login UI, logout, middleware, and rewrites**

Add the English login page, cookie-clearing logout route, `/admin` session gate, and after-files rewrites for `/admin` and `/api/admin` to `NEXT_PUBLIC_ADMIN_URL`.

- [x] **Step 5: Verify locally**

Run: `pnpm test`

Expected: all tests pass.

Run: `pnpm build`

Expected: build exits `0` and includes `/admin/login`, `/admin/logout`, and `/api/auth/login`.

- [x] **Step 6: Commit and deploy**

Commit only the customer-site files, push `luqite-ux/jinfanwan` `main` with the company token workflow, and deploy the existing Vercel project to Production.

- [x] **Step 7: Verify the formal-domain flow**

Open `https://jinfanwanfoodstorage.com/admin/login`, sign in with `info@jinfanwanfoodstorage.com`, verify the final customer-domain `/admin` page and tenant dashboard, then log out and verify the protected page redirects to login.

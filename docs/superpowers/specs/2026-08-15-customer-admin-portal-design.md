# JINFANWAN Customer Admin Portal Design

## Goal

Provide a tenant-scoped administration entry at `https://jinfanwanfoodstorage.com/admin` using the existing shared admin application without changing shared `huanqiu-admin` code.

## Architecture

The customer site owns `/admin/login`, `/admin/logout`, and `/api/auth/login`. The login route reads Supabase credentials and `TENANT_ID` from server-only environment variables, limits the account query to the JINFANWAN tenant, verifies the existing bcrypt password hash, writes `admin_user_sessions`, and sets the standard `hq_admin_session` and `hq_tenant_id` cookies.

Authenticated `/admin/*` requests are allowed through customer middleware and rewritten to `NEXT_PUBLIC_ADMIN_URL`. The shared admin reads the forwarded session and tenant cookies and maps `/admin` to the correct tenant dashboard. Missing sessions redirect to the local customer login page.

## Security And Failure Handling

- Supabase service credentials remain server-only.
- Account lookup requires both email and the configured tenant ID.
- Existing password hashes are read and verified, never reset.
- Inactive accounts are rejected.
- Login errors return to `/admin/login` without exposing whether the email exists.
- Session cookies are `httpOnly`, `sameSite=lax`, `secure` in Production, and expire after seven days.
- Logout deletes both customer admin cookies.

## Verification

- Unit-test valid login, wrong password, inactive account, and tenant isolation through dependency injection.
- Build the Next.js application.
- Deploy to the existing Vercel Production project.
- Log in through `jinfanwanfoodstorage.com/admin/login` with the formal account and verify the final URL remains under `/admin` with the correct tenant dashboard.


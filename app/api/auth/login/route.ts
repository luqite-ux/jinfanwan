import bcrypt from "bcryptjs"
import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

import { createLoginHandler, type AdminLoginDependencies, type AdminUser } from "@/lib/admin-login"

function loginError(request: Request) {
  const target = new URL("/admin/login", request.url)
  target.searchParams.set("error", "The admin login service is not configured.")
  return NextResponse.redirect(target, 303)
}

function productionDependencies(): AdminLoginDependencies {
  const tenantId = process.env.TENANT_ID || process.env.NEXT_PUBLIC_TENANT_ID
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!tenantId || !supabaseUrl || !serviceRoleKey) throw new Error("Missing admin login environment variables")

  const db = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } })

  return {
    tenantId,
    secureCookies: process.env.NODE_ENV === "production",
    now: () => new Date(),
    createToken: () => crypto.randomUUID(),
    async findAdminUser(email, expectedTenantId) {
      const { data, error } = await db
        .from("admin_users")
        .select("id,email,password_hash,is_active,tenant_id")
        .eq("email", email)
        .eq("tenant_id", expectedTenantId)
        .single()
      return error || !data ? null : (data as AdminUser)
    },
    verifyPassword: (password, passwordHash) => bcrypt.compare(password, passwordHash),
    async createSession(session) {
      const { error } = await db.from("admin_user_sessions").insert({
        admin_user_id: session.adminUserId,
        token: session.token,
        expires_at: session.expiresAt,
        ip: session.ip,
        user_agent: session.userAgent,
      })
      if (error) throw error
    },
    async recordLastLogin(adminUserId, at) {
      const { error } = await db
        .from("admin_users")
        .update({ last_login_at: at })
        .eq("id", adminUserId)
        .eq("tenant_id", tenantId)
      if (error) throw error
    },
  }
}

export async function POST(request: Request) {
  try {
    return await createLoginHandler(productionDependencies())(request)
  } catch {
    return loginError(request)
  }
}

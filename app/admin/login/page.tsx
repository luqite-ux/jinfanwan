import { company } from "@/lib/site-data"

type AdminLoginPageProps = {
  searchParams: Promise<{ error?: string; reason?: string }>
}

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const { error, reason } = await searchParams

  return (
    <main className="admin-login-page">
      <section className="admin-login-panel">
        <img src={company.logo} alt="JINFANWAN" className="admin-login-logo" />
        <span className="eyebrow">JINFANWAN website administration</span>
        <h1>Sign in to manage your website</h1>
        <p>Use the customer administrator account assigned to {company.name}.</p>

        {reason === "unauthorized" && !error ? (
          <p className="admin-login-notice">Please sign in before opening the administration area.</p>
        ) : null}
        {error ? <p className="admin-login-error">{error}</p> : null}

        <form action="/api/auth/login" method="post" className="admin-login-form">
          <label>
            Email
            <input name="email" type="email" autoComplete="username" required />
          </label>
          <label>
            Password
            <input name="password" type="password" autoComplete="current-password" required />
          </label>
          <button type="submit">Sign In</button>
        </form>
        <a href="/">Return to website</a>
      </section>
    </main>
  )
}

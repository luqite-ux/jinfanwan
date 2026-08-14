import Link from "next/link"
import { ArrowRight, Mail, Menu, Phone } from "lucide-react"
import { company, navItems } from "@/lib/site-data"

export function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="brand-link" aria-label="JINFANWAN Home">
        <img src={company.logo} alt="JINFANWAN" className="brand-logo" />
      </Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <Link href="/contact#inquiry" className="quote-button">
        Request a Quote <ArrowRight size={16} />
      </Link>
      <button className="mobile-menu" aria-label="Open navigation">
        <Menu size={22} />
      </button>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <img src={company.logo} alt="JINFANWAN" className="footer-logo" />
          <p>
            Premium food storage container manufacturing for global B2B buyers, covering plastic, glass,
            silicone, and stainless steel lid container programs.
          </p>
        </div>
        <div>
          <h3>Products</h3>
          <Link href="/products">Plastic Food Containers</Link>
          <Link href="/products">Silicone Glass Food Containers</Link>
          <Link href="/products">Plastic Glass Food Containers</Link>
          <Link href="/products">Stainless Steel Lid Series</Link>
        </div>
        <div>
          <h3>Company</h3>
          <Link href="/about-us">About Us</Link>
          <Link href="/manufacturing">Manufacturing</Link>
          <Link href="/quality-control">Quality Control</Link>
          <Link href="/faq">FAQ</Link>
        </div>
        <div>
          <h3>Contact</h3>
          <p className="contact-line"><Mail size={16} /> {company.email}</p>
          <p className="contact-line"><Phone size={16} /> {company.phone}</p>
          <p>{company.address}</p>
          <Link href="/contact#inquiry" className="footer-cta">Send Inquiry</Link>
        </div>
      </div>
    </footer>
  )
}

export function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <section className="page-hero">
      <span>{eyebrow}</span>
      <h1>{title}</h1>
      <p>{text}</p>
    </section>
  )
}

export function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="section-heading">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  )
}

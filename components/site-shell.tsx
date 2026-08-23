"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowRight, Mail, Menu, Phone, X } from "lucide-react"
import { company, navItems } from "@/lib/site-data"

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <Link href="/" className="brand-link" aria-label="JINFANWAN Home">
        <img src={company.logo} alt="JINFANWAN" className="brand-logo" />
      </Link>
      <nav className={menuOpen ? "desktop-nav menu-open" : "desktop-nav"} aria-label="Primary navigation">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
            {item.label}
          </Link>
        ))}
      </nav>
      <Link href="/contact#inquiry" className="quote-button">
        Request a Quote <ArrowRight size={16} />
      </Link>
      <button
        type="button"
        className="mobile-menu"
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
    </header>
  )
}

export function Footer() {
  const legalName = "Suzhou Golden Rice Bowl New Material Technology Co., Ltd.".replace(/[.\s]+$/, "")
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <Link href="/" aria-label="JINFANWAN home">
            <img src={company.logo} alt="JINFANWAN" className="footer-logo" style={{ objectFit: "contain", maxWidth: "100%", height: "auto" }} />
          </Link>
          <p>
            Food storage container manufacturing for global B2B buyers, covering plastic containers and
            tempered-glass, plastic, and silicone lid structures.
          </p>
        </div>
        <div>
          <h3>Products</h3>
          <Link href="/products">Plastic Food Containers</Link>
          <Link href="/products">Vented Plastic Food Containers</Link>
          <Link href="/products">Tempered-Glass Lid Containers</Link>
          <Link href="/products">Glass and Silicone Storage Lids</Link>
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
      <div className="footer-bottom">© {new Date().getFullYear()} {legalName}. All rights reserved.</div>
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

"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, sectors } from "@/data/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [sectorsOpen, setSectorsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => {
    setOpen(false);
    setSectorsOpen(false);
  };

  return (
    <>
      <header className={`siteHeader ${scrolled ? "isScrolled" : ""}`}>
        <Link href="/" className="logoPlate" aria-label="Iraq Home Expo home">
          <Image
            src="/assets/iraq-home-expo-logo.png"
            alt="Iraq Home Expo"
            width={260}
            height={116}
            priority
          />
        </Link>

        <nav className="desktopNav" aria-label="Primary navigation">
          {nav.map(([label, href]) =>
            label === "Sectors" ? (
              <div className="megaWrap" key={href}>
                <Link href={href}>{label}</Link>
                <div className="megaMenu" role="menu">
                  {sectors.map((s) => (
                    <Link key={s.slug} href={`/sectors/${s.slug}`} role="menuitem">
                      {s.title}
                      <span aria-hidden="true">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={href} href={href}>
                {label}
              </Link>
            )
          )}
        </nav>

        <Link className="headerCta" href="/register">
          Register <span aria-hidden="true">→</span>
        </Link>

        <button
          className={`menuButton ${open ? "isOpen" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <div className={`mobileMenuOverlay ${open ? "open" : ""}`} aria-hidden={!open}>
        <nav className="mobileMenu" aria-label="Mobile navigation">
          {nav.map(([label, href]) =>
            label === "Sectors" ? (
              <div className="mobileNavGroup" key={href}>
                <button
                  type="button"
                  className="mobileNavToggle"
                  aria-expanded={sectorsOpen}
                  onClick={() => setSectorsOpen(!sectorsOpen)}
                >
                  {label}
                  <span aria-hidden="true">{sectorsOpen ? "−" : "+"}</span>
                </button>
                {sectorsOpen && (
                  <div className="mobileSubNav">
                    <Link onClick={closeMenu} href={href}>
                      All Sectors
                    </Link>
                    {sectors.map((s) => (
                      <Link key={s.slug} onClick={closeMenu} href={`/sectors/${s.slug}`}>
                        {s.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link onClick={closeMenu} key={href} href={href} className="mobileNavLink">
                {label}
              </Link>
            )
          )}
          <Link onClick={closeMenu} href="/register" className="mobileRegisterCta">
            Register to Visit or Exhibit
          </Link>
        </nav>
      </div>
    </>
  );
}

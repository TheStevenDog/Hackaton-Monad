"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useOutsideClick } from "~~/hooks/scaffold-eth";

type HeaderMenuLink = { label: string; href: string };

export const menuLinks: HeaderMenuLink[] = [
  { label: "Inicio", href: "/" },
  { label: "Verificar documento", href: "/certificate-verify" },
  { label: "Panel Admin", href: "/admin" },
];

export const HeaderMenuLinks = () => {
  const pathname = usePathname();
  return (
    <>
      {menuLinks.map(({ label, href }) => {
        const isActive = pathname === href;
        return (
          <li key={href}>
            <Link
              href={href}
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: isActive ? "var(--text)" : "var(--text-muted)",
                padding: "6px 14px",
                borderRadius: "6px",
                background: isActive ? "var(--navy-700)" : "transparent",
                transition: "color 0.2s, background 0.2s",
                textDecoration: "none",
                display: "block",
              }}
              onMouseEnter={e => {
                if (!isActive) (e.target as HTMLElement).style.color = "var(--text)";
              }}
              onMouseLeave={e => {
                if (!isActive) (e.target as HTMLElement).style.color = "var(--text-muted)";
              }}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </>
  );
};

export const Header = () => {
  const burgerMenuRef = useRef<HTMLDetailsElement>(null);
  useOutsideClick(burgerMenuRef, () => burgerMenuRef?.current?.removeAttribute("open"));

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(6,14,28,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div
        className="ent-container"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <img
            src="/logo.png"
            alt="TrustCert"
            style={{
              width: "32px",
              height: "32px",
              objectFit: "contain",
              filter: "invert(1) drop-shadow(0 0 6px rgba(14,165,233,0.4))",
              animation: "floatSlow 5s ease-in-out infinite",
            }}
          />
          <div>
            <div
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                color: "var(--text)",
                fontSize: "0.95rem",
                lineHeight: 1.2,
              }}
            >
              TrustCert
            </div>
            <div
              style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", color: "var(--text-muted)", lineHeight: 1 }}
            >
              Monad Testnet
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <ul style={{ display: "flex", listStyle: "none", margin: 0, padding: 0, gap: "2px" }}>
            <HeaderMenuLinks />
          </ul>
        </nav>

        {/* Mobile burger */}
        <details className="dropdown lg:hidden" ref={burgerMenuRef}>
          <summary className="btn btn-ghost btn-sm">
            <Bars3Icon style={{ width: "20px", height: "20px" }} />
          </summary>
          <ul
            className="menu dropdown-content"
            style={{
              position: "absolute",
              right: 0,
              top: "48px",
              background: "var(--navy-800)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              padding: "8px",
              minWidth: "180px",
              boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
            }}
            onClick={() => burgerMenuRef?.current?.removeAttribute("open")}
          >
            <HeaderMenuLinks />
          </ul>
        </details>
      </div>
    </header>
  );
};

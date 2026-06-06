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
          <li key={href} style={{ listStyle: "none" }}>
            <Link
              href={href}
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "0.82rem",
                fontWeight: isActive ? 600 : 500,
                color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                padding: "6px 14px",
                borderRadius: "6px",
                background: isActive ? "rgba(255,255,255,0.07)" : "transparent",
                border: isActive ? "1px solid rgba(255,255,255,0.1)" : "1px solid transparent",
                transition: "all 0.2s",
                textDecoration: "none",
                display: "block",
                letterSpacing: "0.01em",
                position: "relative",
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }
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
        background: "rgba(2,8,16,0.9)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          height: "2px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(37,99,235,0.7) 30%, rgba(14,165,233,0.7) 60%, transparent 100%)",
        }}
      />

      <div
        className="ent-container"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px" }}
      >
        {/* Logo + wordmark */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
              background: "rgba(37,99,235,0.12)",
              border: "1px solid rgba(37,99,235,0.2)",
              flexShrink: 0,
            }}
          >
            <img
              src="/logo.png"
              alt="TrustCert"
              style={{
                width: "20px",
                height: "20px",
                objectFit: "contain",
                filter: "invert(1) drop-shadow(0 0 4px rgba(14,165,233,0.5))",
                animation: "floatSlow 5s ease-in-out infinite",
              }}
            />
          </div>
          <div>
            <div
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                color: "var(--text-primary)",
                fontSize: "0.92rem",
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
              }}
            >
              TrustCert
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.62rem",
                color: "var(--text-tertiary)",
                lineHeight: 1,
                letterSpacing: "0.04em",
              }}
            >
              MONAD TESTNET
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav>
          <ul style={{ display: "flex", listStyle: "none", margin: 0, padding: 0, gap: "2px" }}>
            <HeaderMenuLinks />
          </ul>
        </nav>

        {/* Mobile burger */}
        <details className="dropdown lg:hidden" ref={burgerMenuRef}>
          <summary className="btn btn-ghost btn-sm" style={{ border: "1px solid var(--border)" }}>
            <Bars3Icon style={{ width: "18px", height: "18px", color: "var(--text-secondary)" }} />
          </summary>
          <ul
            className="menu dropdown-content"
            style={{
              position: "absolute",
              right: 0,
              top: "52px",
              background: "var(--surface-2)",
              border: "1px solid var(--border-strong)",
              borderRadius: "12px",
              padding: "6px",
              minWidth: "190px",
              boxShadow: "0 20px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset",
              backdropFilter: "blur(16px)",
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

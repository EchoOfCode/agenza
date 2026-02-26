"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, Zap, Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import styles from "./Navbar.module.css";

const navLinks = [
    { href: "/marketplace", label: "Marketplace" },
    { href: "/arena", label: "Arena" },
    { href: "/workflows", label: "Workflows" },
    { href: "/dashboard", label: "Dashboard" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className={styles.navbar}>
            <div className={styles.inner}>
                <Link href="/" className={styles.logo}>
                    <Zap size={24} strokeWidth={3} />
                    <span>AGENZA</span>
                    <span className={styles.version}>V1.0A</span>
                </Link>

                <div className={styles.links}>
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href} className={styles.link}>
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className={styles.actions}>
                    <button
                        className={styles.themeToggle}
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                    >
                        {theme === "light" ? <Moon size={18} strokeWidth={2.5} /> : <Sun size={18} strokeWidth={2.5} />}
                    </button>
                    <Link href="/submit" className="btn-brutal btn-brutal--primary btn-brutal--sm">
                        Buy Agent
                    </Link>
                </div>

                <button
                    className={styles.hamburger}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            <div className={`${styles.mobileMenu} ${isOpen ? styles.mobileMenuOpen : ""}`}>
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={styles.mobileLink}
                        onClick={() => setIsOpen(false)}
                    >
                        {link.label}
                    </Link>
                ))}
                <div className={styles.mobileActions}>
                    <button
                        className={styles.themeToggle}
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                    >
                        {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                        <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
                    </button>
                    <Link
                        href="/submit"
                        className="btn-brutal btn-brutal--primary"
                        onClick={() => setIsOpen(false)}
                    >
                        Buy Agent
                    </Link>
                </div>
            </div>
        </nav>
    );
}

"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Zap, Sun, Moon, ChevronDown } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import styles from "./Navbar.module.css";

const navLinks = [
    {
        label: "Marketplace",
        dropdown: true,
        items: [
            { href: "/marketplace", label: "Agent Marketplace" },
            { href: "/skills", label: "Skills Marketplace" },
        ],
    },
    { href: "/arena", label: "Arena" },
    { href: "/sell", label: "Sell" },
    { href: "/seller/dashboard", label: "Dashboard" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className={styles.navbar}>
            <div className={styles.inner}>
                <Link href="/" className={styles.logo}>
                    <Zap size={24} strokeWidth={3} />
                    <span>AGENZA</span>
                    <span className={styles.version}>V1.0A</span>
                </Link>

                <div className={styles.links}>
                    {navLinks.map((link) =>
                        link.dropdown ? (
                            <div
                                key={link.label}
                                className={styles.dropdownWrap}
                                ref={dropdownRef}
                                onMouseEnter={() => setDropdownOpen(true)}
                                onMouseLeave={() => setDropdownOpen(false)}
                            >
                                <button
                                    className={styles.dropdownTrigger}
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                >
                                    {link.label}
                                    <ChevronDown size={14} className={`${styles.chevron} ${dropdownOpen ? styles.chevronOpen : ""}`} />
                                </button>
                                <div className={`${styles.dropdownMenu} ${dropdownOpen ? styles.dropdownMenuOpen : ""}`}>
                                    {link.items.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={styles.dropdownItem}
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <Link key={link.href} href={link.href} className={styles.link}>
                                {link.label}
                            </Link>
                        )
                    )}
                </div>

                <div className={styles.actions}>
                    <button
                        className={styles.themeToggle}
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                    >
                        {theme === "light" ? <Moon size={18} strokeWidth={2.5} /> : <Sun size={18} strokeWidth={2.5} />}
                    </button>
                    <Link href="/sell" className="btn-brutal btn-brutal--primary btn-brutal--sm">
                        Sell Agent
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
                <div className={styles.mobileGroup}>
                    <span className={styles.mobileGroupLabel}>MARKETPLACE</span>
                    <Link href="/marketplace" className={styles.mobileLink} onClick={() => setIsOpen(false)}>
                        Agent Marketplace
                    </Link>
                    <Link href="/skills" className={styles.mobileLink} onClick={() => setIsOpen(false)}>
                        Skills Marketplace
                    </Link>
                </div>
                <Link href="/arena" className={styles.mobileLink} onClick={() => setIsOpen(false)}>
                    Arena
                </Link>
                <Link href="/sell" className={styles.mobileLink} onClick={() => setIsOpen(false)}>
                    Sell
                </Link>
                <Link href="/seller/dashboard" className={styles.mobileLink} onClick={() => setIsOpen(false)}>
                    Dashboard
                </Link>
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
                        href="/sell"
                        className="btn-brutal btn-brutal--primary"
                        onClick={() => setIsOpen(false)}
                    >
                        Sell Agent
                    </Link>
                </div>
            </div>
        </nav>
    );
}

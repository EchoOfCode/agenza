import Link from "next/link";
import { Zap, Github, Twitter } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.marquee}>
                <div className={styles.marqueeTrack}>
                    {[...Array(3)].map((_, i) => (
                        <span key={i} className={styles.marqueeBlock}>
                            <span>DEPLOY. DON&apos;T PROMPT.</span>
                            <span className={styles.dot}>◆</span>
                            <span>AUTONOMOUS EXECUTION</span>
                            <span className={styles.dot}>◆</span>
                            <span>MULTI-AGENT SWARM</span>
                            <span className={styles.dot}>◆</span>
                            <span>BRUTAL TRANSPARENCY</span>
                            <span className={styles.dot}>◆</span>
                        </span>
                    ))}
                </div>
            </div>

            <div className={styles.inner}>
                <div className={styles.grid}>
                    <div className={styles.brand}>
                        <div className={styles.logo}>
                            <Zap size={20} strokeWidth={3} />
                            <span>AGENZA</span>
                        </div>
                        <p className={styles.tagline}>
                            Ruthless marketplace for autonomous academic & professional workflows.
                        </p>
                        <div className={styles.buildTag}>BUILD V1.0A</div>
                    </div>

                    <div className={styles.col}>
                        <h4 className={styles.colTitle}>Platform</h4>
                        <Link href="/marketplace">Marketplace</Link>
                        <Link href="/arena">Arena</Link>
                        <Link href="/workflows">Workflows</Link>
                        <Link href="/dashboard">Dashboard</Link>
                    </div>

                    <div className={styles.col}>
                        <h4 className={styles.colTitle}>Builders</h4>
                        <Link href="/submit">Submit Agent</Link>
                        <Link href="/coming-soon">API Docs</Link>
                        <Link href="/coming-soon">Builder Guide</Link>
                        <Link href="/coming-soon">Pricing</Link>
                    </div>

                    <div className={styles.col}>
                        <h4 className={styles.colTitle}>Connect</h4>
                        <a href="https://github.com/EchoOfCode" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                            <Github size={14} /> GitHub
                        </a>
                        <Link href="/coming-soon" className={styles.socialLink}>
                            <Twitter size={14} /> Twitter
                        </Link>
                        <Link href="/coming-soon">Discord</Link>
                        <Link href="/coming-soon">Blog</Link>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <span>© 2025 Agenza. No rights reserved. Ship or die.</span>
                    <span className={styles.status}>
                        <span className={styles.statusDot}></span>
                        ALL SYSTEMS OPERATIONAL
                    </span>
                </div>
            </div>
        </footer>
    );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Zap, Loader } from "lucide-react";
import styles from "./page.module.css";

export default function ComingSoonPage() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                const remaining = 100 - prev;
                const increment = remaining * 0.02 + Math.random() * 0.3;
                const next = prev + increment;
                return next >= 99.9 ? 73 + Math.random() * 15 : next;
            });
        }, 200);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.badge}>
                    <Zap size={14} />
                    <span>UNDER CONSTRUCTION</span>
                </div>

                <h1 className={styles.title}>
                    COMING<br />
                    <span className={styles.highlight}>SOON</span>
                </h1>

                <p className={styles.subtitle}>
                    Our engineers are shipping at maximum velocity.<br />
                    This feature is being forged in the depths of the compile cycle.
                </p>

                <div className={styles.progressWrapper}>
                    <div className={styles.progressLabel}>
                        <span>LOADING FEATURE...</span>
                        <span className={styles.progressPercent}>
                            {progress.toFixed(1)}%
                        </span>
                    </div>
                    <div className={styles.progressTrack}>
                        <div
                            className={styles.progressBar}
                            style={{ width: `${progress}%` }}
                        />
                        <div className={styles.progressGlow} style={{ left: `${progress}%` }} />
                    </div>
                    <div className={styles.progressHint}>
                        <Loader size={12} className={styles.spin} />
                        <span>ETA: Unknown. Patience is a deprecated concept.</span>
                    </div>
                </div>

                <div className={styles.terminal}>
                    <div className={styles.termHeader}>
                        <span className={styles.termDot} style={{ background: "#FF3333" }} />
                        <span className={styles.termDot} style={{ background: "#FFE600" }} />
                        <span className={styles.termDot} style={{ background: "#00FF66" }} />
                        <span className={styles.termTitle}>agenza://live-terminal</span>
                    </div>
                    <div className={styles.termBody}>
                        <div className={styles.termLine}>
                            <span className={styles.termPrompt}>$</span>
                            <span>deploy --feature=this_page</span>
                        </div>
                        <div className={styles.termLine}>
                            <span className={styles.termInfo}>⟳</span>
                            <span>Compiling ambition into bytecode...</span>
                        </div>
                        <div className={styles.termLine}>
                            <span className={styles.termWarn}>⚠</span>
                            <span>Warning: feature.readiness === false</span>
                        </div>
                        <div className={styles.termLine}>
                            <span className={styles.termInfo}>⟳</span>
                            <span>Deploying anyway because we&apos;re built different</span>
                        </div>
                        <div className={styles.termLine}>
                            <span className={styles.termSuccess}>✓</span>
                            <span>Status: SHIPPING_SOON | Priority: MAXIMUM</span>
                        </div>
                    </div>
                </div>

                <Link href="/" className="btn-brutal btn-brutal--primary btn-brutal--lg">
                    <ArrowLeft size={18} />
                    BACK TO HOME
                </Link>
            </div>
        </div>
    );
}

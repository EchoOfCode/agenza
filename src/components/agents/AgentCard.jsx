"use client";
import Link from "next/link";
import { Shield, ExternalLink, ShoppingCart } from "lucide-react";
import styles from "./AgentCard.module.css";

function ScoreRing({ score }) {
    const radius = 22;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;
    const color = score > 70 ? "var(--green)" : score > 40 ? "var(--yellow)" : "var(--red)";

    return (
        <div className={styles.scoreRing}>
            <svg width="56" height="56" viewBox="0 0 56 56">
                <circle cx="28" cy="28" r={radius} fill="none" stroke="var(--off-white)" strokeWidth="4" />
                <circle
                    cx="28"
                    cy="28"
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth="4"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="butt"
                />
            </svg>
            <span className={styles.scoreValue} style={{ color }}>{score}</span>
        </div>
    );
}

export default function AgentCard({ agent }) {
    return (
        <div className={styles.card}>
            <Link href={`/agents/${agent.id}`} className={styles.cardLink}>
                <div className={styles.header}>
                    <div className={styles.headerLeft}>
                        <h4 className={styles.name}>{agent.name}</h4>
                        <div className={styles.creator}>
                            by {agent.creator}
                            {agent.verified && (
                                <span className={styles.verified}>
                                    <Shield size={10} /> VERIFIED
                                </span>
                            )}
                        </div>
                    </div>
                    <ScoreRing score={agent.brutalScore} />
                </div>

                <p className={styles.desc}>{agent.description}</p>

                <div className={styles.metrics}>
                    <div className={styles.metric}>
                        <span className={styles.metricLabel}>SPEED</span>
                        <span className={styles.metricValue}>{agent.speed}</span>
                    </div>
                    <div className={styles.metric}>
                        <span className={styles.metricLabel}>COST</span>
                        <span className={styles.metricValue}>{agent.cost}</span>
                    </div>
                    <div className={styles.metric}>
                        <span className={styles.metricLabel}>SUCCESS</span>
                        <span className={styles.metricValue}>{agent.successRate}</span>
                    </div>
                </div>

                <div className={styles.tags}>
                    {agent.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                    ))}
                </div>

                <div className={styles.tools}>
                    <span className={styles.toolsLabel}>TOOLS:</span>
                    {agent.toolCalls.map((tool) => (
                        <span key={tool} className={styles.toolChip}>{tool}</span>
                    ))}
                </div>
            </Link>

            <div className={styles.footer}>
                <span className={styles.execCount}>
                    {agent.executions.toLocaleString()} executions
                </span>
                <div className={styles.footerActions}>
                    <button
                        className="btn-brutal btn-brutal--primary btn-brutal--sm"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            alert(`✅ ${agent.name} deployed to your workspace!\n\nCost: ${agent.cost}/run\nSuccess Rate: ${agent.successRate}\n\nView it in your Dashboard.`);
                        }}
                    >
                        <ShoppingCart size={12} /> Buy
                    </button>
                    <Link href={`/agents/${agent.id}`} className="btn-brutal btn-brutal--outline btn-brutal--sm">
                        <ExternalLink size={12} />
                    </Link>
                </div>
            </div>
        </div>
    );
}

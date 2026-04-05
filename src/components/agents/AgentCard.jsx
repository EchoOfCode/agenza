"use client";
import Link from "next/link";
import { Shield, ShoppingCart, Swords, ExternalLink } from "lucide-react";
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

                <div className={styles.priceRow}>
                    <span className={styles.priceAmount}>
                        {agent.price || agent.cost}
                    </span>
                    <span className={styles.pricePer}>
                        {agent.priceModel === "subscription" ? "/mo" : "/run"}
                    </span>
                </div>

                <p className={styles.desc}>{agent.description}</p>

                <div className={styles.metrics}>
                    <div className={styles.metric}>
                        <span className={styles.metricLabel}>SPEED</span>
                        <span className={styles.metricValue}>{agent.speed}</span>
                    </div>
                    <div className={styles.metric}>
                        <span className={styles.metricLabel}>COST/RUN</span>
                        <span className={styles.metricValue}>{agent.cost}</span>
                    </div>
                    <div className={styles.metric}>
                        <span className={styles.metricLabel}>SUCCESS</span>
                        <span className={styles.metricValue}>{agent.successRate}</span>
                    </div>
                    <div className={styles.metric}>
                        <span className={styles.metricLabel}>TOTAL RUNS</span>
                        <span className={styles.metricValue}>{(agent.executions || 0).toLocaleString()}</span>
                    </div>
                </div>

                {agent.skills && agent.skills.length > 0 && (
                    <div className={styles.skills}>
                        <span className={styles.skillsLabel}>SKILLS:</span>
                        <div className={styles.skillTags}>
                            {agent.skills.map((skill) => (
                                <span key={skill.id} className={styles.skillTag}>
                                    🔒 {skill.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </Link>

            <div className={styles.footer}>
                <span className={styles.execCount}>
                    {(agent.executions || 0).toLocaleString()} runs
                </span>
                <div className={styles.footerActions}>
                    <button
                        className="btn-brutal btn-brutal--primary btn-brutal--sm"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            alert(`✅ ${agent.name} purchased!\n\nCost: ${agent.price || agent.cost}${agent.priceModel === "subscription" ? "/mo" : "/run"}\nSuccess Rate: ${agent.successRate}\n\nView it in your Dashboard.`);
                        }}
                    >
                        <ShoppingCart size={12} /> BUY
                    </button>
                    <Link
                        href={`/arena?agent=${agent.id}`}
                        className="btn-brutal btn-brutal--red btn-brutal--sm"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Swords size={12} /> BATTLE
                    </Link>
                </div>
            </div>
        </div>
    );
}

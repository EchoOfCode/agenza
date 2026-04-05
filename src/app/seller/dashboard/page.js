"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    DollarSign, BarChart3, Users, TrendingUp, Zap,
    CheckCircle, XCircle, Clock, ArrowUpRight, ArrowDownRight,
    ExternalLink
} from "lucide-react";
import styles from "./page.module.css";

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, delay: i * 0.08 },
    }),
};

const STATS = [
    { label: "TOTAL REVENUE", value: "$2,847.50", icon: <DollarSign size={22} />, color: "var(--green)", change: "+12.3%", up: true },
    { label: "TOTAL RUNS", value: "14,230", icon: <BarChart3 size={22} />, color: "var(--cyan)", change: "+8.7%", up: true },
    { label: "ACTIVE BUYERS", value: "342", icon: <Users size={22} />, color: "var(--yellow)", change: "+5.2%", up: true },
    { label: "BRUTAL SCORE™", value: "87", icon: <TrendingUp size={22} />, color: "var(--magenta)", change: "-0.4%", up: false },
];

const AGENTS = [
    { id: "citation-hunter", name: "Citation Hunter", category: "Research", brutalScore: 92, runs: 8240, revenue: "$1,648.00", status: "active" },
    { id: "event-architect", name: "Event Architect", category: "Productivity", brutalScore: 85, runs: 4120, revenue: "$824.00", status: "active" },
    { id: "cold-emailer", name: "Cold Emailer Pro", category: "Career", brutalScore: 78, runs: 1870, revenue: "$375.50", status: "active" },
];

const EXECUTIONS = [
    { buyer: "alex_dev", agent: "Citation Hunter", goal: "Summarize 5 quantum papers", result: "pass", score: 94, time: "42s", timestamp: "2 min ago" },
    { buyer: "research_bot", agent: "Citation Hunter", goal: "Find ML papers on transformers", result: "pass", score: 91, time: "38s", timestamp: "8 min ago" },
    { buyer: "startup_joe", agent: "Cold Emailer Pro", goal: "Draft 10 investor outreach emails", result: "pass", score: 88, time: "65s", timestamp: "15 min ago" },
    { buyer: "eventplanner99", agent: "Event Architect", goal: "Plan hackathon for 200 people", result: "pass", score: 85, time: "52s", timestamp: "23 min ago" },
    { buyer: "automate_io", agent: "Citation Hunter", goal: "Compare 3 drug trial papers", result: "fail", score: 34, time: "90s", timestamp: "31 min ago" },
    { buyer: "marketing_maya", agent: "Cold Emailer Pro", goal: "Generate follow-up sequences", result: "pass", score: 92, time: "45s", timestamp: "45 min ago" },
];

const PAYOUTS = [
    { date: "2025-03-28", amount: "$640.00", status: "paid", method: "Stripe" },
    { date: "2025-03-14", amount: "$520.50", status: "paid", method: "Stripe" },
    { date: "2025-02-28", amount: "$487.00", status: "paid", method: "Stripe" },
    { date: "2025-02-14", amount: "$412.00", status: "paid", method: "Stripe" },
    { date: "2025-04-01", amount: "$788.00", status: "pending", method: "Stripe" },
];

export default function SellerDashboardPage() {
    return (
        <div className={styles.page}>
            {/* Header */}
            <section className={styles.header}>
                <div className="container">
                    <div className={styles.headerInner}>
                        <div>
                            <div className="overline mb-1">SELLER DASHBOARD</div>
                            <h1 className={styles.title}>YOUR PERFORMANCE</h1>
                        </div>
                        <Link href="/sell" className="btn-brutal btn-brutal--primary btn-brutal--sm">
                            <Zap size={14} /> LIST NEW AGENT
                        </Link>
                    </div>
                </div>
            </section>

            <div className="container">
                {/* Stats Row */}
                <div className={styles.statsGrid}>
                    {STATS.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            className={styles.statCard}
                            initial="hidden"
                            animate="visible"
                            custom={i}
                            variants={fadeUp}
                        >
                            <div className={styles.statIcon} style={{ color: stat.color }}>{stat.icon}</div>
                            <div className={styles.statValue}>{stat.value}</div>
                            <div className={styles.statLabel}>{stat.label}</div>
                            <div className={`${styles.statChange} ${stat.up ? styles.statUp : styles.statDown}`}>
                                {stat.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                {stat.change}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Listed Agents */}
                <motion.div
                    className={styles.section}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={1}
                    variants={fadeUp}
                >
                    <h3 className={styles.sectionTitle}>LISTED AGENTS</h3>
                    <div className={styles.tableWrap}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>AGENT</th>
                                    <th>CATEGORY</th>
                                    <th>BRUTAL SCORE</th>
                                    <th>RUNS</th>
                                    <th>REVENUE</th>
                                    <th>STATUS</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {AGENTS.map((agent) => (
                                    <tr key={agent.id}>
                                        <td className={styles.agentName}>{agent.name}</td>
                                        <td>
                                            <span className="tag">{agent.category}</span>
                                        </td>
                                        <td>
                                            <span className={styles.scoreCell}>
                                                <Zap size={12} /> {agent.brutalScore}
                                            </span>
                                        </td>
                                        <td className={styles.mono}>{agent.runs.toLocaleString()}</td>
                                        <td className={`${styles.mono} text-green`}>{agent.revenue}</td>
                                        <td>
                                            <span className={`badge-brutal ${agent.status === "active" ? "badge-brutal--green" : "badge-brutal--red"}`}>
                                                <span className={`status-dot ${agent.status === "active" ? "status-dot--active" : "status-dot--error"}`}></span>
                                                {agent.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td>
                                            <Link href={`/agents/${agent.id}`} className={styles.tableLink}>
                                                <ExternalLink size={14} />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Recent Executions */}
                <motion.div
                    className={styles.section}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={2}
                    variants={fadeUp}
                >
                    <h3 className={styles.sectionTitle}>RECENT EXECUTIONS</h3>
                    <div className={styles.feedList}>
                        {EXECUTIONS.map((exec, i) => (
                            <div key={i} className={styles.feedItem}>
                                <div className={styles.feedLeft}>
                                    <div className={styles.feedResult}>
                                        {exec.result === "pass" ? (
                                            <CheckCircle size={16} className="text-green" />
                                        ) : (
                                            <XCircle size={16} className="text-red" />
                                        )}
                                    </div>
                                    <div className={styles.feedInfo}>
                                        <div className={styles.feedTop}>
                                            <span className={styles.feedBuyer}>{exec.buyer}</span>
                                            <span className={styles.feedAgent}>→ {exec.agent}</span>
                                        </div>
                                        <p className={styles.feedGoal}>{exec.goal}</p>
                                    </div>
                                </div>
                                <div className={styles.feedRight}>
                                    <span className={`${styles.feedScore} ${exec.result === "pass" ? "text-green" : "text-red"}`}>
                                        {exec.score}
                                    </span>
                                    <span className={styles.feedTime}>{exec.time}</span>
                                    <span className={styles.feedTimestamp}>{exec.timestamp}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Payout History */}
                <motion.div
                    className={styles.section}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={3}
                    variants={fadeUp}
                >
                    <h3 className={styles.sectionTitle}>PAYOUT HISTORY</h3>
                    <div className={styles.payoutList}>
                        {PAYOUTS.map((payout, i) => (
                            <div key={i} className={styles.payoutItem}>
                                <div className={styles.payoutLeft}>
                                    <span className={styles.payoutDate}>{payout.date}</span>
                                    <span className={styles.payoutMethod}>{payout.method}</span>
                                </div>
                                <div className={styles.payoutRight}>
                                    <span className={`${styles.payoutAmount} ${payout.status === "paid" ? "text-green" : ""}`}>
                                        {payout.amount}
                                    </span>
                                    <span className={`badge-brutal ${payout.status === "paid" ? "badge-brutal--green" : "badge-brutal--yellow"}`}>
                                        {payout.status === "paid" ? <CheckCircle size={10} /> : <Clock size={10} />}
                                        {payout.status.toUpperCase()}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

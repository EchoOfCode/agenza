"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    Zap,
    ArrowRight,
    TrendingUp,
    DollarSign,
    Clock,
    CheckCircle,
    XCircle,
    RefreshCw,
    BarChart3,
    Swords,
    Plus,
    Loader,
} from "lucide-react";
import { fetchAgents, fetchExecutions } from "@/lib/api";
import styles from "./page.module.css";

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, delay: i * 0.08 },
    }),
};

function transformExecution(exec) {
    const durationS = (exec.duration_ms || 0) / 1000;
    const timeStr = durationS >= 60 ? `${(durationS / 60).toFixed(0)}m ${(durationS % 60).toFixed(0)}s` : `${durationS.toFixed(0)}s`;
    const statusMap = { done: "success", failed: "failed", running: "running", timeout: "failed", pending: "running" };
    const date = exec.created_at ? new Date(exec.created_at + "Z") : new Date();
    const ago = getTimeAgo(date);

    return {
        id: exec.id,
        agent: exec.agent_id?.replace("agent-", "").replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) || "Unknown",
        task: exec.goal || "—",
        status: statusMap[exec.status] || "success",
        time: timeStr,
        cost: `$${(exec.token_cost || 0).toFixed(2)}`,
        date: ago,
    };
}

function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
}

export default function DashboardPage() {
    const [deployedAgents, setDeployedAgents] = useState([]);
    const [executionHistory, setExecutionHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalExecs, setTotalExecs] = useState(0);
    const [totalSpent, setTotalSpent] = useState(0);
    const [avgSpeed, setAvgSpeed] = useState("—");
    const [successRate, setSuccessRate] = useState("—");

    useEffect(() => {
        async function load() {
            setLoading(true);
            const [agentsData, execsData] = await Promise.all([
                fetchAgents(),
                fetchExecutions(null, 20),
            ]);

            if (agentsData?.agents?.length > 0) {
                setDeployedAgents(
                    agentsData.agents.slice(0, 3).map((a) => ({
                        id: a.id,
                        name: a.name,
                        category: a.category ? a.category.charAt(0).toUpperCase() + a.category.slice(1) : "General",
                        brutalScore: Math.round(a.brutal_score || 0),
                        speed: `${((a.cost_per_run || 0.02) * 1000).toFixed(0)}s`,
                        cost: `$${(a.cost_per_run || 0).toFixed(2)}`,
                        executions: a.total_runs || 0,
                    }))
                );
                const runs = agentsData.agents.reduce((sum, a) => sum + (a.total_runs || 0), 0);
                setTotalExecs(runs);

                const avgRate = agentsData.agents.reduce((sum, a) => sum + (a.success_rate || 0), 0) / agentsData.agents.length;
                setSuccessRate(`${(avgRate * 100).toFixed(1)}%`);
            }

            if (execsData?.executions?.length > 0) {
                const transformed = execsData.executions.map(transformExecution);
                setExecutionHistory(transformed);
                const spent = execsData.executions.reduce((sum, e) => sum + (e.token_cost || 0), 0);
                setTotalSpent(spent);

                const avgMs = execsData.executions.reduce((sum, e) => sum + (e.duration_ms || 0), 0) / execsData.executions.length;
                const avgS = avgMs / 1000;
                setAvgSpeed(avgS >= 60 ? `${(avgS / 60).toFixed(0)}m ${(avgS % 60).toFixed(0)}s` : `${avgS.toFixed(0)}s`);
            }

            setLoading(false);
        }
        load();
    }, []);

    return (
        <div className={styles.page}>
            <section className={styles.header}>
                <div className="container">
                    <div className={styles.headerContent}>
                        <div>
                            <div className="overline mb-1" style={{ color: "var(--yellow)" }}>COMMAND CENTER</div>
                            <h1 className={styles.title}>DASHBOARD</h1>
                        </div>
                        <div className={styles.headerActions}>
                            <Link href="/marketplace" className="btn-brutal btn-brutal--primary btn-brutal--sm">
                                <Plus size={14} /> Buy Agent
                            </Link>
                            <Link href="/arena" className="btn-brutal btn-brutal--outline btn-brutal--sm" style={{ borderColor: "var(--white)", color: "var(--white)" }}>
                                <Swords size={14} /> Arena
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.statsSection}>
                <div className="container">
                    <div className={styles.statsGrid}>
                        {[
                            { label: "TASKS COMPLETED", value: loading ? "..." : totalExecs.toLocaleString(), icon: <CheckCircle size={20} />, color: "var(--green)" },
                            { label: "TOTAL SPENT", value: loading ? "..." : `$${totalSpent.toFixed(2)}`, icon: <DollarSign size={20} />, color: "var(--yellow)" },
                            { label: "AVG SPEED", value: loading ? "..." : avgSpeed, icon: <Clock size={20} />, color: "var(--cyan)" },
                            { label: "SUCCESS RATE", value: loading ? "..." : successRate, icon: <TrendingUp size={20} />, color: "var(--green)" },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                className={styles.statCard}
                                initial="hidden"
                                animate="visible"
                                custom={i}
                                variants={fadeUp}
                            >
                                <div className={styles.statIcon} style={{ color: stat.color }}>{stat.icon}</div>
                                <div className={styles.statValue}>{stat.value}</div>
                                <div className={styles.statLabel}>{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className={styles.sectionHead}>
                        <h2>YOUR AGENTS</h2>
                        <Link href="/marketplace" className={styles.viewAll}>
                            View All <ArrowRight size={14} />
                        </Link>
                    </div>
                    {loading ? (
                        <div style={{ textAlign: "center", padding: "2rem", color: "var(--gray)" }}>
                            <Loader size={24} style={{ animation: "spin 1s linear infinite" }} />
                        </div>
                    ) : deployedAgents.length === 0 ? (
                        <div style={{ textAlign: "center", padding: "2rem", color: "var(--gray)", fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>
                            No agents yet. Start the backend server.
                        </div>
                    ) : (
                        <div className={styles.deployedGrid}>
                            {deployedAgents.map((agent, i) => (
                                <motion.div
                                    key={agent.id}
                                    className={styles.deployedCard}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    custom={i}
                                    variants={fadeUp}
                                >
                                    <div className={styles.dcHeader}>
                                        <div>
                                            <h4 className={styles.dcName}>{agent.name}</h4>
                                            <span className={styles.dcCategory}>{agent.category}</span>
                                        </div>
                                        <div className={styles.dcStatus}>
                                            <span className={styles.statusDotActive}></span>
                                            ACTIVE
                                        </div>
                                    </div>
                                    <div className={styles.dcMetrics}>
                                        <div>
                                            <span className={styles.dcMetricLabel}>RUNS</span>
                                            <span className={styles.dcMetricVal}>{agent.executions}</span>
                                        </div>
                                        <div>
                                            <span className={styles.dcMetricLabel}>SPEED</span>
                                            <span className={styles.dcMetricVal}>{agent.speed}</span>
                                        </div>
                                        <div>
                                            <span className={styles.dcMetricLabel}>COST</span>
                                            <span className={styles.dcMetricVal}>{agent.cost}</span>
                                        </div>
                                        <div>
                                            <span className={styles.dcMetricLabel}>SCORE</span>
                                            <span className={styles.dcMetricVal} style={{ color: "var(--green)" }}>{agent.brutalScore}</span>
                                        </div>
                                    </div>
                                    <div className={styles.dcBar}>
                                        <div className={styles.dcBarFill} style={{ width: `${agent.brutalScore}%` }}></div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <section className={`section ${styles.historySection}`}>
                <div className="container">
                    <h2 className="mb-3">EXECUTION HISTORY</h2>
                    {executionHistory.length === 0 && !loading ? (
                        <div style={{ textAlign: "center", padding: "2rem", color: "var(--gray)", fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>
                            No executions yet. Run an agent from the Arena to see history.
                        </div>
                    ) : (
                        <div className={styles.historyTable}>
                            <div className={styles.historyHead}>
                                <span>STATUS</span>
                                <span>AGENT</span>
                                <span>TASK</span>
                                <span>TIME</span>
                                <span>COST</span>
                                <span>WHEN</span>
                            </div>
                            {executionHistory.map((exec, i) => (
                                <motion.div
                                    key={exec.id}
                                    className={styles.historyRow}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    custom={i}
                                    variants={fadeUp}
                                >
                                    <span>
                                        {exec.status === "success" && <CheckCircle size={16} className={styles.iconSuccess} />}
                                        {exec.status === "failed" && <XCircle size={16} className={styles.iconFailed} />}
                                        {exec.status === "running" && <RefreshCw size={16} className={styles.iconRunning} />}
                                    </span>
                                    <span className={styles.historyAgent}>{exec.agent}</span>
                                    <span className={styles.historyTask}>{exec.task}</span>
                                    <span className={styles.historyMono}>{exec.time}</span>
                                    <span className={styles.historyMono}>{exec.cost}</span>
                                    <span className={styles.historyDate}>{exec.date}</span>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <section className={styles.quickSection}>
                <div className="container">
                    <div className={styles.quickGrid}>
                        <Link href="/marketplace" className={styles.quickCard} style={{ borderColor: "var(--yellow)" }}>
                            <Zap size={28} style={{ color: "var(--yellow)" }} />
                            <h3>BUY NEW AGENT</h3>
                            <p>Browse marketplace</p>
                        </Link>
                        <Link href="/arena" className={styles.quickCard} style={{ borderColor: "var(--red)" }}>
                            <Swords size={28} style={{ color: "var(--red)" }} />
                            <h3>START BATTLE</h3>
                            <p>Compare agents live</p>
                        </Link>
                        <Link href="/workflows" className={styles.quickCard} style={{ borderColor: "var(--green)" }}>
                            <BarChart3 size={28} style={{ color: "var(--green)" }} />
                            <h3>VIEW WORKFLOWS</h3>
                            <p>End-to-end demos</p>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

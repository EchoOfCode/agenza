"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    ArrowLeft,
    ArrowDown,
    Shield,
    ShoppingCart,
    Zap,
    Clock,
    DollarSign,
    TrendingUp,
    Target,
    Activity,
    CheckCircle,
    XCircle,
    Loader,
    BarChart3,
    Cpu,
    GitBranch,
    ExternalLink,
    Workflow,
    Search,
    FileText,
    Presentation,
    PenTool,
} from "lucide-react";
import { fetchAgent } from "@/lib/api";
import styles from "./page.module.css";

function ScoreBar({ label, score, color, icon }) {
    return (
        <div className={styles.scoreBar}>
            <div className={styles.scoreBarHeader}>
                <span className={styles.scoreBarIcon}>{icon}</span>
                <span className={styles.scoreBarLabel}>{label}</span>
                <span className={styles.scoreBarValue} style={{ color }}>{score.toFixed(1)}</span>
            </div>
            <div className={styles.scoreBarTrack}>
                <motion.div
                    className={styles.scoreBarFill}
                    style={{ background: color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                />
            </div>
        </div>
    );
}

function ScoreRing({ score, size = 120 }) {
    const radius = (size - 12) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;
    const color = score > 70 ? "var(--green)" : score > 40 ? "var(--yellow)" : "var(--red)";

    return (
        <div className={styles.bigScoreRing} style={{ width: size, height: size }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--off-white)" strokeWidth="8" />
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.2 }}
                    strokeLinecap="butt"
                    style={{ transformOrigin: "center", transform: "rotate(-90deg)" }}
                />
            </svg>
            <span className={styles.bigScoreValue} style={{ color }}>{Math.round(score)}</span>
        </div>
    );
}

export default function AgentDetailPage() {
    const params = useParams();
    const [agent, setAgent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            const data = await fetchAgent(params.id);
            if (data) setAgent(data);
            setLoading(false);
        }
        load();
    }, [params.id]);

    if (loading) {
        return (
            <div className={styles.page}>
                <div className={styles.loading}>
                    <Loader size={32} style={{ animation: "spin 1s linear infinite" }} />
                    <span>Loading agent...</span>
                </div>
            </div>
        );
    }

    if (!agent) {
        return (
            <div className={styles.page}>
                <div className={styles.loading}>
                    <h2>AGENT NOT FOUND</h2>
                    <p>Make sure the backend is running.</p>
                    <Link href="/marketplace" className="btn-brutal btn-brutal--primary">
                        <ArrowLeft size={14} /> Back to Marketplace
                    </Link>
                </div>
            </div>
        );
    }

    const category = agent.category ? agent.category.charAt(0).toUpperCase() + agent.category.slice(1) : "General";
    const brutalScore = agent.brutal_score || 0;
    const speedScore = Math.max(0, 100 - ((agent.cost_per_run || 0.02) * 1000 / 60) * 100);
    const costScore = Math.max(0, 100 - ((agent.cost_per_run || 0.02) / 0.10) * 100);
    const accuracyScore = Math.min(100, (agent.success_rate || 0.9) * 100 + 5);
    const reliabilityScore = (agent.success_rate || 0.9) * 100;
    const executions = agent.recent_executions || [];

    return (
        <div className={styles.page}>
            <div className={styles.breadcrumb}>
                <div className="container">
                    <Link href="/marketplace" className={styles.backLink}>
                        <ArrowLeft size={14} /> Marketplace
                    </Link>
                    <span>/</span>
                    <span>{agent.name}</span>
                </div>
            </div>

            <section className={styles.hero}>
                <div className="container">
                    <div className={styles.heroGrid}>
                        <div className={styles.heroLeft}>
                            <div className={styles.heroBadges}>
                                <span className={styles.categoryBadge}>{category}</span>
                                <span className={styles.verifiedBadge}>
                                    <Shield size={10} /> VERIFIED
                                </span>
                            </div>
                            <h1 className={styles.heroTitle}>{agent.name}</h1>
                            <p className={styles.heroDesc}>{agent.description}</p>

                            <div className={styles.heroMeta}>
                                <div className={styles.metaItem}>
                                    <Clock size={14} />
                                    <span>{((agent.cost_per_run || 0.02) * 1000).toFixed(0)}s avg</span>
                                </div>
                                <div className={styles.metaItem}>
                                    <DollarSign size={14} />
                                    <span>${(agent.cost_per_run || 0).toFixed(2)} / run</span>
                                </div>
                                <div className={styles.metaItem}>
                                    <Activity size={14} />
                                    <span>{agent.total_runs || 0} runs</span>
                                </div>
                                <div className={styles.metaItem}>
                                    <TrendingUp size={14} />
                                    <span>{((agent.success_rate || 0) * 100).toFixed(0)}% success</span>
                                </div>
                            </div>

                            <div className={styles.heroCtas}>
                                <button
                                    className="btn-brutal btn-brutal--primary btn-brutal--lg"
                                    onClick={() => alert(`✅ ${agent.name} deployed to your workspace!\n\nCost: $${(agent.cost_per_run || 0.02).toFixed(2)}/run\nSuccess Rate: ${((agent.success_rate || 0) * 100).toFixed(0)}%\n\nView it in your Dashboard.`)}
                                >
                                    <ShoppingCart size={16} /> BUY — ${(agent.cost_per_run || 0.02).toFixed(2)}
                                </button>
                                <Link href="/arena" className="btn-brutal btn-brutal--dark btn-brutal--lg">
                                    <Zap size={16} /> TEST IN ARENA
                                </Link>
                            </div>
                        </div>

                        <div className={styles.heroRight}>
                            <ScoreRing score={brutalScore} size={160} />
                            <div className={styles.scoreLabel}>BRUTAL SCORE™</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.benchmarkSection}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <BarChart3 size={20} />
                        <h2>BENCHMARK BREAKDOWN</h2>
                    </div>
                    <div className={styles.benchmarkGrid}>
                        <div className={styles.benchmarkCard}>
                            <h3 className={styles.benchmarkCardTitle}>PERFORMANCE METRICS</h3>
                            <div className={styles.scoreBars}>
                                <ScoreBar label="SPEED" score={speedScore} color="var(--cyan)" icon={<Clock size={14} />} />
                                <ScoreBar label="COST EFFICIENCY" score={costScore} color="var(--green)" icon={<DollarSign size={14} />} />
                                <ScoreBar label="ACCURACY" score={accuracyScore} color="var(--yellow)" icon={<Target size={14} />} />
                                <ScoreBar label="RELIABILITY" score={reliabilityScore} color="var(--red)" icon={<Shield size={14} />} />
                            </div>
                            <div className={styles.formula}>
                                <code>Score = Speed(25%) + Cost(25%) + Accuracy(30%) + Reliability(20%)</code>
                            </div>
                        </div>

                        <div className={styles.benchmarkCard}>
                            <h3 className={styles.benchmarkCardTitle}>SPECIFICATIONS</h3>
                            <div className={styles.specGrid}>
                                {[
                                    { label: "Runtime", value: "Python 3.11", icon: <Cpu size={14} /> },
                                    { label: "Execution", value: "Subprocess", icon: <GitBranch size={14} /> },
                                    { label: "Timeout", value: "60s", icon: <Clock size={14} /> },
                                    { label: "Avg Cost", value: `$${(agent.cost_per_run || 0).toFixed(3)}`, icon: <DollarSign size={14} /> },
                                    { label: "Total Runs", value: (agent.total_runs || 0).toLocaleString(), icon: <Activity size={14} /> },
                                    { label: "Success Rate", value: `${((agent.success_rate || 0) * 100).toFixed(1)}%`, icon: <TrendingUp size={14} /> },
                                    { label: "Category", value: category, icon: <Target size={14} /> },
                                    { label: "Creator", value: "Agenza Team", icon: <Shield size={14} /> },
                                ].map((spec, i) => (
                                    <div key={i} className={styles.specRow}>
                                        <span className={styles.specIcon}>{spec.icon}</span>
                                        <span className={styles.specLabel}>{spec.label}</span>
                                        <span className={styles.specValue}>{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.workflowSection}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <Workflow size={20} />
                        <h2>WORKFLOW COMPOSITION</h2>
                    </div>
                    <p className={styles.workflowDesc}>
                        Chain agents together into structured automation pipelines. Each agent's output becomes the next agent's input.
                    </p>
                    <div className={styles.pipelineCard}>
                        <div className={styles.pipelineLabel}>EXAMPLE PIPELINE</div>
                        <div className={styles.pipeline}>
                            {[
                                { name: "Research Agent", desc: "Gather sources & data", icon: <Search size={20} />, color: "var(--cyan)" },
                                { name: "Outline Generator", desc: "Structure the content", icon: <FileText size={20} />, color: "var(--yellow)" },
                                { name: "Slide Creator", desc: "Design visual slides", icon: <Presentation size={20} />, color: "var(--green)" },
                                { name: "Script Writer", desc: "Write presentation script", icon: <PenTool size={20} />, color: "var(--red)" },
                            ].map((step, i) => (
                                <div key={i} className={styles.pipelineStep}>
                                    {i > 0 && (
                                        <motion.div
                                            className={styles.pipelineArrow}
                                            initial={{ opacity: 0, y: -10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.15 }}
                                        >
                                            <ArrowDown size={20} />
                                        </motion.div>
                                    )}
                                    <motion.div
                                        className={styles.pipelineNode}
                                        style={{ borderColor: step.color }}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.15 }}
                                    >
                                        <div className={styles.pipelineIcon} style={{ color: step.color }}>{step.icon}</div>
                                        <div>
                                            <div className={styles.pipelineNodeName}>{step.name}</div>
                                            <div className={styles.pipelineNodeDesc}>{step.desc}</div>
                                        </div>
                                        <div className={styles.pipelineNum}>0{i + 1}</div>
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                        <div className={styles.pipelineFooter}>
                            <span>4 agents</span>
                            <span>•</span>
                            <span>Fully automated</span>
                            <span>•</span>
                            <span>~3 minutes total</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.historySection}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <Activity size={20} />
                        <h2>RECENT EXECUTIONS</h2>
                    </div>
                    {executions.length === 0 ? (
                        <div className={styles.emptyHistory}>
                            <p>No executions yet. Run this agent from the Arena to see results.</p>
                        </div>
                    ) : (
                        <div className={styles.historyTable}>
                            <div className={styles.historyHead}>
                                <span>STATUS</span>
                                <span>GOAL</span>
                                <span>DURATION</span>
                                <span>COST</span>
                                <span>SCORE</span>
                            </div>
                            {executions.map((exec, i) => (
                                <motion.div
                                    key={exec.id || i}
                                    className={styles.historyRow}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <span>
                                        {exec.status === "done" ? (
                                            <CheckCircle size={16} style={{ color: "var(--green)" }} />
                                        ) : (
                                            <XCircle size={16} style={{ color: "var(--red)" }} />
                                        )}
                                    </span>
                                    <span className={styles.historyGoal}>{exec.goal || "—"}</span>
                                    <span className={styles.historyMono}>{((exec.duration_ms || 0) / 1000).toFixed(1)}s</span>
                                    <span className={styles.historyMono}>${(exec.token_cost || 0).toFixed(3)}</span>
                                    <span className={styles.historyMono} style={{ color: "var(--green)" }}>
                                        {(exec.brutal_score || 0).toFixed(1)}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <section className={styles.ctaSection}>
                <div className="container">
                    <div className={styles.ctaCard}>
                        <h3>READY TO USE {agent.name.toUpperCase()}?</h3>
                        <div className={styles.ctaButtons}>
                            <button
                                className="btn-brutal btn-brutal--primary btn-brutal--lg"
                                onClick={() => alert(`✅ ${agent.name} deployed to your workspace!\n\nView it in your Dashboard.`)}
                            >
                                <ShoppingCart size={16} /> BUY NOW
                            </button>
                            <Link href="/arena" className="btn-brutal btn-brutal--outline btn-brutal--lg">
                                TEST IN ARENA <Zap size={16} />
                            </Link>
                            <Link href="/marketplace" className="btn-brutal btn-brutal--dark btn-brutal--lg">
                                BROWSE MORE <ExternalLink size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

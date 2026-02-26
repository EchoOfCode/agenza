"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, ArrowUpDown, Loader } from "lucide-react";
import AgentCard from "@/components/agents/AgentCard";
import { fetchAgents } from "@/lib/api";
import styles from "./page.module.css";

const CATEGORIES = ["All", "Research", "Engineering", "Productivity", "Career"];

function transformAgent(a) {
    return {
        id: a.id,
        name: a.name,
        description: a.description,
        category: a.category ? a.category.charAt(0).toUpperCase() + a.category.slice(1) : "General",
        brutalScore: Math.round(a.brutal_score || 0),
        speed: `${((a.cost_per_run || 0.02) * 1000).toFixed(0)}s`,
        cost: `$${(a.cost_per_run || 0).toFixed(2)}`,
        successRate: `${((a.success_rate || 0) * 100).toFixed(1)}%`,
        reliability: Math.round((a.success_rate || 0) * 100),
        creator: "Agenza Team",
        creatorGithub: "EchoOfCode",
        verified: true,
        toolCalls: ["Search", "Parse", "Write", "Export"],
        tags: [a.category || "general"],
        executions: a.total_runs || 0,
        status: "active",
    };
}

export default function MarketplacePage() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [sortBy, setSortBy] = useState("score");
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            setLoading(true);
            const data = await fetchAgents();
            if (data?.agents) {
                setAgents(data.agents.map(transformAgent));
            }
            setLoading(false);
        }
        load();
    }, []);

    const filtered = useMemo(() => {
        let result = agents;

        if (search) {
            const q = search.toLowerCase();
            result = result.filter(
                (a) =>
                    a.name.toLowerCase().includes(q) ||
                    a.description.toLowerCase().includes(q) ||
                    a.tags.some((t) => t.toLowerCase().includes(q))
            );
        }

        if (category !== "All") {
            result = result.filter((a) => a.category.toLowerCase() === category.toLowerCase());
        }

        switch (sortBy) {
            case "score":
                result = [...result].sort((a, b) => b.brutalScore - a.brutalScore);
                break;
            case "fastest":
                result = [...result].sort((a, b) => parseFloat(a.speed) - parseFloat(b.speed));
                break;
            case "cheapest":
                result = [...result].sort(
                    (a, b) => parseFloat(a.cost.slice(1)) - parseFloat(b.cost.slice(1))
                );
                break;
            case "popular":
                result = [...result].sort((a, b) => b.executions - a.executions);
                break;
        }

        return result;
    }, [search, category, sortBy, agents]);

    return (
        <div className={styles.page}>
            <section className={styles.header}>
                <div className="container">
                    <div className="overline mb-1">BROWSE & DEPLOY</div>
                    <h1 className={styles.title}>AGENT MARKETPLACE</h1>
                    <p className={styles.subtitle}>
                        {agents.length} autonomous agents ready to execute. Compare Brutal Scores. No guessing.
                    </p>
                </div>
            </section>

            <section className={styles.controls}>
                <div className="container">
                    <div className={styles.controlsInner}>
                        <div className={styles.searchWrap}>
                            <Search size={18} className={styles.searchIcon} />
                            <input
                                type="text"
                                className={`input-brutal ${styles.searchInput}`}
                                placeholder="Search agents, tools, categories..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <div className={styles.filters}>
                            <div className={styles.filterGroup}>
                                <SlidersHorizontal size={14} />
                                <select
                                    className="select-brutal"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    {CATEGORIES.map((c) => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.filterGroup}>
                                <ArrowUpDown size={14} />
                                <select
                                    className="select-brutal"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="score">Top Rated</option>
                                    <option value="fastest">Fastest</option>
                                    <option value="cheapest">Cheapest</option>
                                    <option value="popular">Most Popular</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className={styles.catPills}>
                        {CATEGORIES.map((c) => (
                            <button
                                key={c}
                                className={`${styles.pill} ${c === category ? styles.pillActive : ""}`}
                                onClick={() => setCategory(c)}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className={styles.resultsHeader}>
                        <span className={styles.resultCount}>
                            {loading ? (
                                <><Loader size={14} style={{ animation: "spin 1s linear infinite" }} /> LOADING...</>
                            ) : (
                                <>{filtered.length} AGENT{filtered.length !== 1 ? "S" : ""} FOUND</>
                            )}
                        </span>
                    </div>
                    <div className={styles.grid}>
                        {filtered.map((agent, i) => (
                            <motion.div
                                key={agent.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <AgentCard agent={agent} />
                            </motion.div>
                        ))}
                    </div>
                    {!loading && filtered.length === 0 && (
                        <div className={styles.empty}>
                            <h3>NO AGENTS FOUND</h3>
                            <p>Try adjusting your search or filters. Make sure the backend is running.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swords, Play, Trophy, Timer, DollarSign, Cpu, Loader } from "lucide-react";
import { fetchAgents, runBattle } from "@/lib/api";
import styles from "./page.module.css";

function BattlePanel({ name, logs, isRunning, isComplete, executionTime, tokenCost, toolCallCount }) {
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className={styles.panel}>
            <div className={styles.panelHeader}>
                <h3 className={styles.panelName}>{name}</h3>
                <div className={styles.panelMeta}>
                    {isComplete && (
                        <>
                            <span><Timer size={12} /> {executionTime}</span>
                            <span><DollarSign size={12} /> {tokenCost}</span>
                            <span><Cpu size={12} /> {toolCallCount} calls</span>
                        </>
                    )}
                </div>
            </div>
            <div className={styles.terminal} ref={scrollRef}>
                {logs.filter(Boolean).map((log, i) => (
                    <div key={i} className={`${styles.logLine} ${styles[`log_${log.level}`]}`}>
                        <span className={styles.logTime}>{log.time}</span>
                        <span className={styles.logText}>{log.text}</span>
                    </div>
                ))}
                {isRunning && !isComplete && (
                    <motion.span
                        className={styles.cursor}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                    >
                        █
                    </motion.span>
                )}
            </div>
        </div>
    );
}

export default function ArenaPage() {
    const [isRunning, setIsRunning] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [battleResult, setBattleResult] = useState(null);
    const [alphaLogs, setAlphaLogs] = useState([]);
    const [betaLogs, setBetaLogs] = useState([]);

    const [agents, setAgents] = useState([]);
    const [selectedAlpha, setSelectedAlpha] = useState("");
    const [selectedBeta, setSelectedBeta] = useState("");
    const [battleTask, setBattleTask] = useState("Summarize the top 5 breakthroughs in quantum computing from 2024-2025");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            setLoading(true);
            const data = await fetchAgents();
            if (data?.agents?.length > 0) {
                setAgents(data.agents);
                setSelectedAlpha(data.agents[0]?.id || "");
                setSelectedBeta(data.agents[1]?.id || data.agents[0]?.id || "");
            }
            setLoading(false);
        }
        load();
    }, []);

    const getAgentName = (id) => agents.find((a) => a.id === id)?.name || id;

    const handleBattle = async () => {
        if (!selectedAlpha || !selectedBeta) return;
        setIsRunning(true);
        setIsComplete(false);
        setBattleResult(null);
        setAlphaLogs([]);
        setBetaLogs([]);

        const result = await runBattle(selectedAlpha, selectedBeta, battleTask);

        if (result) {
            setBattleResult(result);
            const aLogs = result.alpha?.logs || [];
            const bLogs = result.beta?.logs || [];
            for (let i = 0; i < Math.max(aLogs.length, bLogs.length); i++) {
                await new Promise((r) => setTimeout(r, 200));
                if (i < aLogs.length) setAlphaLogs((prev) => [...prev, aLogs[i]]);
                if (i < bLogs.length) setBetaLogs((prev) => [...prev, bLogs[i]]);
            }
            await new Promise((r) => setTimeout(r, 500));
        }
        setIsComplete(true);
    };

    const handleReset = () => {
        setIsRunning(false);
        setIsComplete(false);
        setBattleResult(null);
        setAlphaLogs([]);
        setBetaLogs([]);
    };

    const alphaTime = battleResult?.alpha ? `${(battleResult.alpha.duration_ms / 1000).toFixed(1)}s` : "—";
    const betaTime = battleResult?.beta ? `${(battleResult.beta.duration_ms / 1000).toFixed(1)}s` : "—";
    const alphaCost = battleResult?.alpha ? `$${(battleResult.alpha.token_cost || 0).toFixed(3)}` : "—";
    const betaCost = battleResult?.beta ? `$${(battleResult.beta.token_cost || 0).toFixed(3)}` : "—";
    const alphaTools = battleResult?.alpha?.tool_calls || 0;
    const betaTools = battleResult?.beta?.tool_calls || 0;
    const winnerName = battleResult?.winner_id ? getAgentName(battleResult.winner_id) : "—";

    return (
        <div className={styles.page}>
            <section className={styles.header}>
                <div className="container">
                    <div className={styles.headerContent}>
                        <div>
                            <div className="overline mb-1" style={{ color: "var(--yellow)" }}>LIVE COMPETITION</div>
                            <h1 className={styles.title}>
                                <Swords size={40} /> THE ARENA
                            </h1>
                            <p className={styles.subtitle}>
                                Pit agents head-to-head on the same task. Speed. Cost. Accuracy. No more guessing.
                            </p>
                        </div>
                        {agents.length > 0 && (
                            <div className={styles.liveTag}>
                                <span className={styles.liveDot}></span> LIVE API
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section className={styles.taskSection}>
                <div className="container">
                    <div className={styles.taskCard}>
                        <div className={styles.taskLabel}>BATTLE TASK</div>
                        <input
                            type="text"
                            className="input-brutal"
                            value={battleTask}
                            onChange={(e) => setBattleTask(e.target.value)}
                            placeholder="Enter task for agents to compete on..."
                            style={{ width: "100%", marginBottom: "1rem" }}
                        />

                        {loading ? (
                            <div style={{ textAlign: "center", padding: "2rem", color: "var(--gray)" }}>
                                <Loader size={20} style={{ animation: "spin 1s linear infinite" }} /> Loading agents...
                            </div>
                        ) : agents.length === 0 ? (
                            <div style={{ textAlign: "center", padding: "2rem", color: "var(--gray)", fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>
                                No agents available. Make sure the backend is running on port 8000.
                            </div>
                        ) : (
                            <>
                                <div className={styles.agentSelectors}>
                                    <div className={styles.selectorGroup}>
                                        <label className={styles.selectorLabel}>AGENT ALPHA</label>
                                        <select
                                            className="select-brutal"
                                            value={selectedAlpha}
                                            onChange={(e) => setSelectedAlpha(e.target.value)}
                                        >
                                            {agents.map((a) => (
                                                <option key={a.id} value={a.id}>{a.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className={styles.vs}>VS</div>

                                    <div className={styles.selectorGroup}>
                                        <label className={styles.selectorLabel}>AGENT BETA</label>
                                        <select
                                            className="select-brutal"
                                            value={selectedBeta}
                                            onChange={(e) => setSelectedBeta(e.target.value)}
                                        >
                                            {agents.map((a) => (
                                                <option key={a.id} value={a.id}>{a.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className={styles.taskActions}>
                                    {!isRunning ? (
                                        <button
                                            className="btn-brutal btn-brutal--primary btn-brutal--lg"
                                            onClick={handleBattle}
                                        >
                                            <Play size={18} /> START BATTLE
                                        </button>
                                    ) : isComplete ? (
                                        <button
                                            className="btn-brutal btn-brutal--red btn-brutal--lg"
                                            onClick={handleReset}
                                        >
                                            RESET
                                        </button>
                                    ) : (
                                        <button className="btn-brutal btn-brutal--lg" disabled style={{ opacity: 0.7 }}>
                                            <Loader size={18} style={{ animation: "spin 1s linear infinite" }} /> EXECUTING...
                                        </button>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>

            <section className={styles.battleSection}>
                <div className="container">
                    <div className={styles.battleGrid}>
                        <BattlePanel
                            name={getAgentName(selectedAlpha)}
                            logs={alphaLogs}
                            isRunning={isRunning}
                            isComplete={isComplete}
                            executionTime={alphaTime}
                            tokenCost={alphaCost}
                            toolCallCount={alphaTools}
                        />
                        <BattlePanel
                            name={getAgentName(selectedBeta)}
                            logs={betaLogs}
                            isRunning={isRunning}
                            isComplete={isComplete}
                            executionTime={betaTime}
                            tokenCost={betaCost}
                            toolCallCount={betaTools}
                        />
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {isComplete && battleResult && (
                    <motion.section
                        className={styles.comparisonSection}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="container">
                            <div className={styles.winnerBanner}>
                                <Trophy size={28} />
                                <span>WINNER: {winnerName.toUpperCase()}</span>
                                <span className={styles.winnerReason}>FASTER &amp; CHEAPER</span>
                            </div>

                            <table className={styles.compTable}>
                                <thead>
                                    <tr>
                                        <th>METRIC</th>
                                        <th className={battleResult.winner_id === selectedAlpha ? styles.alphaCol : ""}>
                                            {getAgentName(selectedAlpha)}
                                            {battleResult.winner_id === selectedAlpha && <span className={styles.winTag}> 🏆</span>}
                                        </th>
                                        <th className={battleResult.winner_id === selectedBeta ? styles.alphaCol : ""}>
                                            {getAgentName(selectedBeta)}
                                            {battleResult.winner_id === selectedBeta && <span className={styles.winTag}> 🏆</span>}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Execution Time</td>
                                        <td className={battleResult.winner_id === selectedAlpha ? styles.winner : ""}>{alphaTime}</td>
                                        <td className={battleResult.winner_id === selectedBeta ? styles.winner : ""}>{betaTime}</td>
                                    </tr>
                                    <tr>
                                        <td>Token Cost</td>
                                        <td className={battleResult.winner_id === selectedAlpha ? styles.winner : ""}>{alphaCost}</td>
                                        <td className={battleResult.winner_id === selectedBeta ? styles.winner : ""}>{betaCost}</td>
                                    </tr>
                                    <tr>
                                        <td>Tool Calls</td>
                                        <td>{alphaTools}</td>
                                        <td>{betaTools}</td>
                                    </tr>
                                    <tr>
                                        <td>Verdict</td>
                                        <td className={battleResult.winner_id === selectedAlpha ? styles.winner : ""}>
                                            {battleResult.winner_id === selectedAlpha ? "🏆 Winner" : "Runner-up"}
                                        </td>
                                        <td className={battleResult.winner_id === selectedBeta ? styles.winner : ""}>
                                            {battleResult.winner_id === selectedBeta ? "🏆 Winner" : "Runner-up"}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>
        </div>
    );
}

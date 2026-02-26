"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap, Target, CheckCircle, Trophy, Shield, TrendingUp, Loader } from "lucide-react";
import AgentCard from "@/components/agents/AgentCard";
import WorkflowPipeline from "@/components/workflows/WorkflowPipeline";
import { fetchAgents } from "@/lib/api";
import styles from "./page.module.css";

const workflows = [
  {
    id: "syllabus-hacker",
    name: "The Syllabus Hacker",
    description: "Upload syllabus PDF → Extract deadlines → Generate study schedule → Dispatch calendar invites",
    steps: [
      { label: "Upload", description: "Upload your syllabus PDF", icon: "Upload", status: "complete", detail: "syllabus_fall2025.pdf (2.4 MB)" },
      { label: "Extract", description: "AI parses all dates & assignments", icon: "FileSearch", status: "complete", detail: "Found 34 deadlines, 12 exams, 8 projects" },
      { label: "Schedule", description: "Generate optimized study plan", icon: "Calendar", status: "complete", detail: "Created 52 study blocks across 16 weeks" },
      { label: "Dispatch", description: "Send calendar invites automatically", icon: "Send", status: "complete", detail: "52 events added to Google Calendar" },
    ],
  },
  {
    id: "event-architect",
    name: "The Event Architect",
    description: "Input event concept → Generate budget → Draft sponsor emails → Schedule social media campaign",
    steps: [
      { label: "Concept", description: "Define your event details", icon: "Lightbulb", status: "complete", detail: "Tech Hackathon — 200 attendees, 2 days" },
      { label: "Budget", description: "AI generates detailed budget", icon: "DollarSign", status: "complete", detail: "$12,400 budget — venue, food, prizes, swag" },
      { label: "Sponsors", description: "Draft & send sponsor emails", icon: "Mail", status: "complete", detail: "15 personalized emails sent, 4 replies" },
      { label: "Social", description: "Schedule social media campaign", icon: "Share2", status: "complete", detail: "28 posts scheduled across 3 platforms" },
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const terminalLines = [
  { prompt: "→", text: "user.setGoal('Summarize 5 quantum papers')", type: "command" },
  { prompt: "⚡", text: "AgentSwarm.deploy(CitationHunter)", type: "info" },
  { prompt: "⚙", text: "[TOOL] SerpAPI.search('quantum computing 2025')", type: "tool" },
  { prompt: "✓", text: "Found 23 results across 4 databases", type: "success" },
  { prompt: "⚙", text: "[TOOL] PDF.parse(arxiv_paper_1.pdf)", type: "tool" },
  { prompt: "⚙", text: "[HIRE] PythonGraphingAgent → data visualization", type: "info" },
  { prompt: "✓", text: "Generated 3 charts, exported as SVG", type: "success" },
  { prompt: "✓", text: "TASK COMPLETE — 42s, $0.02, 97% accuracy", type: "success" },
];

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

export default function HomePage() {
  const [featuredAgents, setFeaturedAgents] = useState([]);
  const [stats, setStats] = useState({ totalAgents: 0, tasksCompleted: 0, avgCost: 0, uptime: 99.9, activeUsers: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await fetchAgents();
      if (data?.agents) {
        setFeaturedAgents(data.agents.slice(0, 6).map(transformAgent));
        const totalRuns = data.agents.reduce((s, a) => s + (a.total_runs || 0), 0);
        const avgCost = data.agents.reduce((s, a) => s + (a.cost_per_run || 0), 0) / (data.agents.length || 1);
        setStats({
          totalAgents: data.total || data.agents.length,
          tasksCompleted: totalRuns,
          avgCost: avgCost.toFixed(2),
          uptime: 99.9,
          activeUsers: totalRuns > 0 ? Math.floor(totalRuns / 3) : 0,
        });
      }
      setLoading(false);
    }
    load();
  }, []);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <motion.div
            className={styles.heroContent}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <div className={styles.heroBadge}>
              <Zap size={14} />
              <span>THE FUTURE OF ACADEMIC WORK</span>
            </div>
            <h1 className={styles.heroTitle}>
              DEPLOY.<br />
              <span className={styles.heroAccent}>DON&apos;T</span><br />
              PROMPT.
            </h1>
            <p className={styles.heroSub}>
              Stop copy-pasting between apps. Deploy autonomous AI agents that
              execute entire workflows — from goal to verified outcome.
            </p>
            <div className={styles.heroCtas}>
              <Link href="/marketplace" className="btn-brutal btn-brutal--primary btn-brutal--lg">
                Explore Agents <ArrowRight size={18} />
              </Link>
              <Link href="/arena" className="btn-brutal btn-brutal--dark btn-brutal--lg">
                Watch Arena <Trophy size={18} />
              </Link>
            </div>
          </motion.div>

          <motion.div
            className={styles.heroTerminal}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className={styles.terminalHeader}>
              <span className={styles.termDot} style={{ background: "var(--red)" }}></span>
              <span className={styles.termDot} style={{ background: "var(--yellow)" }}></span>
              <span className={styles.termDot} style={{ background: "var(--green)" }}></span>
              <span className={styles.termTitle}>agenza://live-execution</span>
            </div>
            <div className={styles.terminalBody}>
              {terminalLines.map((line, i) => (
                <motion.div
                  key={i}
                  className={styles.termLine}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.15 }}
                >
                  <span className={`${styles.termPrompt} ${styles[`term_${line.type}`]}`}>
                    {line.prompt}
                  </span>
                  <span className={styles[`term_${line.type}`]}>{line.text}</span>
                </motion.div>
              ))}
              <motion.div
                className={styles.termCursor}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ delay: 2.5, repeat: Infinity, duration: 1 }}
              >
                █
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className={styles.statsMarquee}>
        <div className={styles.statsTrack}>
          {[...Array(3)].map((_, i) => (
            <div key={i} className={styles.statsBlock}>
              <span><strong>{stats.totalAgents}+</strong> AGENTS</span>
              <span className={styles.statsDot}>◆</span>
              <span><strong>{stats.tasksCompleted.toLocaleString()}</strong> TASKS COMPLETED</span>
              <span className={styles.statsDot}>◆</span>
              <span><strong>${stats.avgCost}</strong> AVG COST</span>
              <span className={styles.statsDot}>◆</span>
              <span><strong>{stats.uptime}%</strong> UPTIME</span>
              <span className={styles.statsDot}>◆</span>
              <span><strong>{stats.activeUsers.toLocaleString()}</strong> ACTIVE USERS</span>
              <span className={styles.statsDot}>◆</span>
            </div>
          ))}
        </div>
      </div>

      <section className={`${styles.howItWorks} section`}>
        <div className="container">
          <div className="overline mb-2">THE NEW META</div>
          <h2 className="mb-4">HOW IT WORKS</h2>
          <div className={styles.stepsGrid}>
            {[
              {
                num: "01",
                icon: <Target size={32} />,
                title: "PICK AGENT",
                desc: "Browse the marketplace. Compare Brutal Scores. Read real execution logs. No guessing.",
              },
              {
                num: "02",
                icon: <Zap size={32} />,
                title: "SET GOAL",
                desc: "Define your workflow goal in plain text. The agent decomposes it into executable sub-tasks.",
              },
              {
                num: "03",
                icon: <CheckCircle size={32} />,
                title: "GET OUTCOME",
                desc: "Sit back. The agent executes, hires sub-agents if needed, and delivers a verified result.",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                className={`card-brutal ${styles.stepCard}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
              >
                <div className={styles.stepNum}>{step.num}</div>
                <div className={styles.stepIcon}>{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={`section section--dark`}>
        <div className="container">
          <div className="overline mb-2" style={{ color: "var(--yellow)" }}>CORE MECHANICS</div>
          <h2 className="mb-4" style={{ color: "var(--white)" }}>THE SWARM PROTOCOL</h2>
          <div className={styles.mechanicsGrid}>
            {[
              {
                icon: <Zap size={28} />,
                title: "MULTI-AGENT SWARM",
                desc: "Primary agents autonomously hire sub-agents for specialized tasks. A Thesis Director hires a Graphing Agent, gets the chart, integrates it.",
                accent: "var(--yellow)",
              },
              {
                icon: <Trophy size={28} />,
                title: "LIVE ARENA BATTLES",
                desc: "Can't decide between agents? Watch them compete head-to-head on the same task. Speed, cost, and accuracy — measured in real-time.",
                accent: "var(--green)",
              },
              {
                icon: <Shield size={28} />,
                title: "CREATOR VERIFICATION",
                desc: "GitHub identity verification + 60-second video pitches. No spam agents. No prompt wrappers. Real builders only.",
                accent: "var(--cyan)",
              },
              {
                icon: <TrendingUp size={28} />,
                title: "BRUTAL SCORE™",
                desc: "Dynamic 0-100 rating from raw telemetry — latency, accuracy, cost, and crash frequency. No fake reviews.",
                accent: "var(--red)",
              },
            ].map((m, i) => (
              <motion.div
                key={i}
                className={styles.mechanicCard}
                style={{ borderColor: m.accent }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
              >
                <div className={styles.mechanicIcon} style={{ color: m.accent }}>{m.icon}</div>
                <h4 style={{ color: m.accent }}>{m.title}</h4>
                <p>{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <div className="overline mb-1">MARKETPLACE</div>
              <h2>TOP RATED AGENTS</h2>
            </div>
            <Link href="/marketplace" className="btn-brutal btn-brutal--outline btn-brutal--sm">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className={styles.agentsGrid}>
            {featuredAgents.map((agent, i) => (
              <motion.div
                key={agent.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
              >
                <AgentCard agent={agent} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={`section section--dark`}>
        <div className="container">
          <div className="overline mb-2" style={{ color: "var(--yellow)" }}>END-TO-END WORKFLOWS</div>
          <h2 className="mb-4" style={{ color: "var(--white)" }}>SEE IT IN ACTION</h2>
          <div className={styles.workflowsGrid}>
            {workflows.map((wf, i) => (
              <motion.div
                key={wf.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
              >
                <WorkflowPipeline workflow={wf} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className="container text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2>READY TO STOP PROMPTING?</h2>
            <p className={styles.ctaSub}>
              Deploy your first agent in under 60 seconds. Or build one and join the marketplace.
            </p>
            <div className={styles.ctaButtons}>
              <Link href="/marketplace" className="btn-brutal btn-brutal--primary btn-brutal--lg">
                EXPLORE MARKETPLACE <ArrowRight size={18} />
              </Link>
              <Link href="/submit" className="btn-brutal btn-brutal--dark btn-brutal--lg">
                BUILD AN AGENT <Zap size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

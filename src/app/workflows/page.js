"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap, Clock, CheckCircle, DollarSign } from "lucide-react";
import WorkflowPipeline from "@/components/workflows/WorkflowPipeline";
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
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, delay: i * 0.1 },
    }),
};

export default function WorkflowsPage() {
    return (
        <div className={styles.page}>
            <section className={styles.header}>
                <div className="container">
                    <div className="overline mb-1" style={{ color: "var(--yellow)" }}>AUTONOMOUS EXECUTION</div>
                    <h1 className={styles.title}>END-TO-END WORKFLOWS</h1>
                    <p className={styles.subtitle}>
                        From goal to verified outcome. No manual steps. No copy-paste. Watch agents execute entire pipelines.
                    </p>
                </div>
            </section>

            <div className={styles.strip}>
                <div className="container">
                    <div className={styles.stripInner}>
                        {[
                            { icon: <Zap size={16} />, label: "MULTI-AGENT", value: "ORCHESTRATION" },
                            { icon: <Clock size={16} />, label: "AVG COMPLETION", value: "< 2 MINUTES" },
                            { icon: <CheckCircle size={16} />, label: "SUCCESS RATE", value: "96.3%" },
                            { icon: <DollarSign size={16} />, label: "AVG COST", value: "$0.03" },
                        ].map((s, i) => (
                            <div key={i} className={styles.stripItem}>
                                {s.icon}
                                <span className={styles.stripLabel}>{s.label}</span>
                                <span className={styles.stripValue}>{s.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <div className={styles.workflowList}>
                        {workflows.map((wf, i) => (
                            <motion.div
                                key={wf.id}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                custom={i}
                                variants={fadeUp}
                                className={styles.workflowBlock}
                            >
                                <div className={styles.workflowMeta}>
                                    <div className={styles.workflowNum}>0{i + 1}</div>
                                    <div>
                                        <h2 className={styles.workflowName}>{wf.name}</h2>
                                        <p className={styles.workflowDesc}>{wf.description}</p>
                                    </div>
                                </div>
                                <WorkflowPipeline workflow={wf} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className={`section section--dark`}>
                <div className="container">
                    <div className="overline mb-2" style={{ color: "var(--yellow)" }}>UNDER THE HOOD</div>
                    <h2 className="mb-4" style={{ color: "var(--white)" }}>THE SWARM PROTOCOL</h2>
                    <div className={styles.swarmGrid}>
                        {[
                            {
                                num: "01",
                                title: "TASK DECOMPOSITION",
                                desc: "The primary agent receives your goal and breaks it into atomic sub-tasks, each with clear inputs and expected outputs.",
                            },
                            {
                                num: "02",
                                title: "AGENT DISCOVERY",
                                desc: "For each sub-task, the orchestrator queries the marketplace for the highest-rated specialist agent. Brutal Scores determine selection.",
                            },
                            {
                                num: "03",
                                title: "CONTEXT HANDOFF",
                                desc: "The primary agent creates a structured context packet including data, constraints, and format specs. No information is lost between agents.",
                            },
                            {
                                num: "04",
                                title: "PARALLEL EXECUTION",
                                desc: "Independent sub-tasks run simultaneously in isolated containers. Dependent tasks maintain execution order and state.",
                            },
                            {
                                num: "05",
                                title: "RESULT AGGREGATION",
                                desc: "Sub-agent outputs are validated, merged, and formatted into your final deliverable. Quality checks run at every junction.",
                            },
                            {
                                num: "06",
                                title: "VERIFICATION",
                                desc: "The completed workflow output is verified against your original goal. Telemetry is logged for Brutal Score updates.",
                            },
                        ].map((step, i) => (
                            <motion.div
                                key={i}
                                className={styles.swarmCard}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                custom={i}
                                variants={fadeUp}
                            >
                                <span className={styles.swarmNum}>{step.num}</span>
                                <h4 className={styles.swarmTitle}>{step.title}</h4>
                                <p className={styles.swarmDesc}>{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className={styles.cta}>
                <div className="container text-center">
                    <h2>BUILD YOUR OWN WORKFLOW</h2>
                    <p className={styles.ctaSub}>
                        Chain agents together. Automate anything. Ship faster.
                    </p>
                    <div className={styles.ctaButtons}>
                        <Link href="/marketplace" className="btn-brutal btn-brutal--primary btn-brutal--lg">
                            BROWSE AGENTS <ArrowRight size={18} />
                        </Link>
                        <Link href="/submit" className="btn-brutal btn-brutal--dark btn-brutal--lg">
                            SUBMIT AGENT <Zap size={18} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

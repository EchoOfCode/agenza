"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Github,
    Upload,
    Video,
    Code,
    Shield,
    CheckCircle,
    AlertTriangle,
    Send,
} from "lucide-react";
import styles from "./page.module.css";

const toolOptions = [
    "Web Search (SerpAPI)",
    "PDF Parsing (PyPDF)",
    "Web Scraping",
    "Email (SMTP)",
    "Calendar API",
    "File System",
    "Code Execution",
    "Image Generation",
    "Database Query",
    "Custom API",
];

export default function SubmitPage() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "",
        githubUrl: "",
        tools: [],
    });
    const [githubVerified, setGithubVerified] = useState(false);

    const handleToolToggle = (tool) => {
        setFormData((prev) => ({
            ...prev,
            tools: prev.tools.includes(tool)
                ? prev.tools.filter((t) => t !== tool)
                : [...prev.tools, tool],
        }));
    };

    const handleVerifyGithub = () => {
        setTimeout(() => setGithubVerified(true), 800);
    };

    return (
        <div className={styles.page}>
            <section className={styles.header}>
                <div className="container">
                    <div className="overline mb-1" style={{ color: "var(--yellow)" }}>BUILD & SHIP</div>
                    <h1 className={styles.title}>SUBMIT YOUR AGENT</h1>
                    <p className={styles.subtitle}>
                        No prompt wrappers. No spam. Verified builders only. Show us what your agent can do.
                    </p>
                </div>
            </section>

            <section className={styles.formSection}>
                <div className="container">
                    <div className={styles.formGrid}>
                        <motion.div
                            className={styles.formCard}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className={styles.formGroup}>
                                <label className={styles.label}>AGENT NAME</label>
                                <input
                                    className="input-brutal"
                                    placeholder="e.g. Thesis Director"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>DESCRIPTION</label>
                                <textarea
                                    className={`input-brutal ${styles.textarea}`}
                                    placeholder="What does your agent do? Be specific about the workflow it automates..."
                                    rows={4}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>CATEGORY</label>
                                <select
                                    className="select-brutal"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    style={{ width: "100%" }}
                                >
                                    <option value="">Select category...</option>
                                    <option value="Research">Research</option>
                                    <option value="Engineering">Engineering</option>
                                    <option value="Productivity">Productivity</option>
                                    <option value="Career">Career</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Data">Data</option>
                                    <option value="Events">Events</option>
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>GITHUB REPOSITORY</label>
                                <div className={styles.githubRow}>
                                    <input
                                        className="input-brutal"
                                        placeholder="https://github.com/username/agent-repo"
                                        value={formData.githubUrl}
                                        onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                                    />
                                    <button
                                        className={`btn-brutal ${githubVerified ? "btn-brutal--green" : "btn-brutal--dark"} btn-brutal--sm`}
                                        onClick={handleVerifyGithub}
                                    >
                                        {githubVerified ? <><CheckCircle size={14} /> Verified</> : <><Github size={14} /> Verify</>}
                                    </button>
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>TOOL REQUIREMENTS</label>
                                <p className={styles.hint}>Select all external tools your agent uses:</p>
                                <div className={styles.toolGrid}>
                                    {toolOptions.map((tool) => (
                                        <button
                                            key={tool}
                                            className={`${styles.toolBtn} ${formData.tools.includes(tool) ? styles.toolBtnActive : ""}`}
                                            onClick={() => handleToolToggle(tool)}
                                        >
                                            <Code size={12} />
                                            {tool}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>60-SECOND VIDEO PITCH</label>
                                <p className={styles.hint}>
                                    Raw, unedited. Show your agent running. No marketing fluff.
                                </p>
                                <div className={styles.uploadZone}>
                                    <Video size={32} />
                                    <span>Drop your video here or click to upload</span>
                                    <span className={styles.uploadHint}>MP4 • Max 60 seconds • Max 50MB</span>
                                </div>
                            </div>

                            <button className="btn-brutal btn-brutal--primary btn-brutal--lg" style={{ width: "100%" }}>
                                <Send size={18} /> SUBMIT FOR REVIEW
                            </button>
                        </motion.div>

                        <motion.div
                            className={styles.sidebar}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className={styles.sideCard}>
                                <h4 className={styles.sideTitle}>
                                    <Shield size={18} /> VERIFICATION PROCESS
                                </h4>
                                <div className={styles.steps}>
                                    {[
                                        { step: "01", text: "Submit agent details & code" },
                                        { step: "02", text: "GitHub identity verification" },
                                        { step: "03", text: "Automated security scan" },
                                        { step: "04", text: "Sandbox execution test" },
                                        { step: "05", text: "Manual review (24-48h)" },
                                        { step: "06", text: "Published to marketplace" },
                                    ].map((s, i) => (
                                        <div key={i} className={styles.step}>
                                            <span className={styles.stepNum}>{s.step}</span>
                                            <span>{s.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.sideCard}>
                                <h4 className={styles.sideTitle}>
                                    <AlertTriangle size={18} /> REQUIREMENTS
                                </h4>
                                <ul className={styles.reqList}>
                                    <li>Agent must execute a complete workflow (not just generate text)</li>
                                    <li>GitHub repo with public source code</li>
                                    <li>60-second video demo (no editing allowed)</li>
                                    <li>Structured JSON output format</li>
                                    <li>Docker-compatible execution environment</li>
                                    <li>No API key requirements for end users</li>
                                </ul>
                            </div>

                            <div className={`${styles.sideCard} ${styles.badgeCard}`}>
                                <div className={styles.badgeVisual}>
                                    <Shield size={40} />
                                    <span>VERIFIED BUILDER</span>
                                </div>
                                <p className={styles.badgeDesc}>
                                    Builders with 10+ GitHub repos and 50+ stars earn the Verified Builder badge.
                                    Your agents get priority placement.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}

"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
    Search, SlidersHorizontal, ArrowUpDown, FileText, Puzzle,
    ArrowRight, X, Lock, Download, CheckCircle, Eye
} from "lucide-react";
import SkillCard from "@/components/skills/SkillCard";
import styles from "./page.module.css";

const CATEGORIES = ["All", "Search", "Parse", "Write", "Export", "Connect", "Compute", "Learn"];

const SKILLS_DATA = [
    {
        id: "web-search",
        fileName: "skill-web-search.md",
        name: "Web Search Mastery",
        category: "Search",
        description: "Teach your agent to perform structured web searches, evaluate source credibility, and return formatted research results with citations.",
        seller: "Agenza Core",
        verified: true,
        price: "2.99",
        fileSize: "4.2 KB",
        buyers: 1840,
        rating: "4.9",
        capabilities: [
            "Multi-query search strategies",
            "Source credibility scoring",
            "Citation-ready output formatting",
            "Result cross-referencing",
        ],
        previewSnippet: "# Skill: Web Search\n\n## Overview\nThis skill file teaches an AI agent how to\nperform structured web searches...\n\n## Agent Instructions\n### Step 1: Query Decomposition\nWhen given a research goal...",
        downloadPath: "/skills/skill-web-search.md",
    },
    {
        id: "development",
        fileName: "skill-development.md",
        name: "Self-Development & Learning",
        category: "Learn",
        description: "Teach your agent how to analyze its own performance, identify weaknesses, and iteratively improve its execution quality through self-reflection.",
        seller: "Agenza Core",
        verified: true,
        price: "4.99",
        fileSize: "5.8 KB",
        buyers: 2310,
        rating: "4.8",
        capabilities: [
            "Execution log analysis",
            "Strategy mutation & A/B testing",
            "Internal knowledge base building",
            "Auto parameter adjustment",
        ],
        previewSnippet: "# Skill: Self-Development\n\n## Overview\nThis skill file teaches an AI agent how to\nanalyze its own performance...\n\n## Agent Instructions\n### Step 1: Execution Logging\nAfter every task...",
        downloadPath: "/skills/skill-development.md",
    },
    {
        id: "pdf-parsing",
        fileName: "skill-pdf-parsing.md",
        name: "PDF Document Parsing",
        category: "Parse",
        description: "Teach your agent to extract text, tables, images, and metadata from PDFs. Handles scanned documents with OCR and multi-column academic papers.",
        seller: "DocuFlow",
        verified: true,
        price: "3.49",
        fileSize: "4.8 KB",
        buyers: 1520,
        rating: "4.7",
        capabilities: [
            "Multi-column layout extraction",
            "Table-to-JSON conversion",
            "OCR for scanned pages",
            "Academic paper parsing",
        ],
        previewSnippet: "# Skill: PDF Parsing\n\n## Overview\nThis skill file teaches an AI agent how to\nextract structured content from PDF...\n\n## Agent Instructions\n### Step 1: Document Analysis\nBefore parsing...",
        downloadPath: "/skills/skill-pdf-parsing.md",
    },
    {
        id: "email-outreach",
        fileName: "skill-email-outreach.md",
        name: "Email Outreach & Cold Email",
        category: "Connect",
        description: "Teach your agent to draft personalized cold emails, build follow-up sequences, and optimize for response rates using the AIDA framework.",
        seller: "MailForge",
        verified: true,
        price: "3.99",
        fileSize: "3.6 KB",
        buyers: 980,
        rating: "4.6",
        capabilities: [
            "Recipient research & personalization",
            "AIDA framework email drafting",
            "Follow-up sequence generation",
            "A/B testing subject lines",
        ],
        previewSnippet: "# Skill: Email Outreach\n\n## Overview\nThis skill file teaches an AI agent how to\ndraft, personalize, and send...\n\n## Agent Instructions\n### Step 1: Recipient Research\nBefore drafting...",
        downloadPath: "/skills/skill-email-outreach.md",
    },
    {
        id: "data-visualization",
        fileName: "skill-data-visualization.md",
        name: "Data Visualization",
        category: "Export",
        description: "Teach your agent to analyze raw data, select appropriate chart types, and generate publication-ready SVG/PNG visualizations with consistent styling.",
        seller: "ChartLab",
        verified: true,
        price: "3.99",
        fileSize: "3.9 KB",
        buyers: 720,
        rating: "4.5",
        capabilities: [
            "Auto chart type selection",
            "Publication-ready styling",
            "Multi-format export (SVG/PNG/HTML)",
            "Color-blind friendly palettes",
        ],
        previewSnippet: "# Skill: Data Visualization\n\n## Overview\nThis skill file teaches an AI agent how to\nanalyze raw data and generate...\n\n## Agent Instructions\n### Step 1: Data Analysis\nBefore visualizing...",
        downloadPath: "/skills/skill-data-visualization.md",
    },
    {
        id: "code-execution",
        fileName: "skill-code-execution.md",
        name: "Sandboxed Code Execution",
        category: "Compute",
        description: "Teach your agent to safely write, execute, and debug Python code in sandboxed environments with package management and timeout handling.",
        seller: "SandboxLab",
        verified: true,
        price: "5.99",
        fileSize: "6.1 KB",
        buyers: 1150,
        rating: "4.7",
        capabilities: [
            "Safe sandboxed execution",
            "Package dependency management",
            "Error catching & auto-debugging",
            "Output validation & formatting",
        ],
        previewSnippet: "# Skill: Code Execution\n\n## Overview\nThis skill file teaches an AI agent how to\nsafely execute code in sandboxed...\n\n## Agent Instructions\n### Step 1: Code Analysis\nBefore executing...",
        downloadPath: null,
    },
    {
        id: "academic-writing",
        fileName: "skill-academic-writing.md",
        name: "Academic Writing & Citations",
        category: "Write",
        description: "Teach your agent to produce structured academic writing with proper citations, formatting, and adherence to style guides (APA, MLA, Chicago).",
        seller: "Agenza Core",
        verified: true,
        price: "3.49",
        fileSize: "5.2 KB",
        buyers: 1680,
        rating: "4.8",
        capabilities: [
            "Multi-style citation formatting",
            "Thesis structure generation",
            "Literature review synthesis",
            "Plagiarism-aware paraphrasing",
        ],
        previewSnippet: "# Skill: Academic Writing\n\n## Overview\nThis skill file teaches an AI agent how to\nproduce structured academic...\n\n## Agent Instructions\n### Step 1: Outline\nGenerate a hierarchical outline...",
        downloadPath: null,
    },
    {
        id: "api-integration",
        fileName: "skill-api-integration.md",
        name: "REST API Integration",
        category: "Connect",
        description: "Teach your agent to authenticate and interact with any REST API. Covers OAuth flows, rate limiting, retry logic, and response parsing.",
        seller: "Agenza Core",
        verified: true,
        price: "2.49",
        fileSize: "4.5 KB",
        buyers: 2100,
        rating: "4.9",
        capabilities: [
            "OAuth & API key authentication",
            "Rate limit handling & backoff",
            "Response schema validation",
            "Error recovery & retries",
        ],
        previewSnippet: "# Skill: API Integration\n\n## Overview\nThis skill file teaches an AI agent how to\nauthenticate and interact with...\n\n## Agent Instructions\n### Step 1: Auth Setup\nDetermine auth method...",
        downloadPath: null,
    },
    {
        id: "web-scraping",
        fileName: "skill-web-scraping.md",
        name: "Intelligent Web Scraping",
        category: "Search",
        description: "Teach your agent to navigate and scrape web pages, handle JavaScript rendering, detect anti-bot measures, and extract structured data.",
        seller: "CrawlHQ",
        verified: true,
        price: "4.49",
        fileSize: "5.5 KB",
        buyers: 890,
        rating: "4.4",
        capabilities: [
            "JavaScript-rendered page handling",
            "Anti-bot detection avoidance",
            "Pagination & infinite scroll",
            "Structured data extraction",
        ],
        previewSnippet: "# Skill: Web Scraping\n\n## Overview\nThis skill file teaches an AI agent how to\nnavigate and scrape web pages...\n\n## Agent Instructions\n### Step 1: Page Analysis\nBefore scraping, classify...",
        downloadPath: null,
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

export default function SkillsPage() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [sortBy, setSortBy] = useState("popular");
    const [previewSkill, setPreviewSkill] = useState(null);
    const [purchasedSkill, setPurchasedSkill] = useState(null);

    const filtered = useMemo(() => {
        let result = [...SKILLS_DATA];

        if (search) {
            const q = search.toLowerCase();
            result = result.filter(
                (s) =>
                    s.name.toLowerCase().includes(q) ||
                    s.description.toLowerCase().includes(q) ||
                    s.fileName.toLowerCase().includes(q) ||
                    s.category.toLowerCase().includes(q)
            );
        }

        if (category !== "All") {
            result = result.filter((s) => s.category === category);
        }

        switch (sortBy) {
            case "popular":
                result.sort((a, b) => b.buyers - a.buyers);
                break;
            case "rated":
                result.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
                break;
            case "cheapest":
                result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
                break;
            case "newest":
                result.sort((a, b) => b.buyers - a.buyers);
                break;
        }

        return result;
    }, [search, category, sortBy]);

    function handlePreview(skill) {
        setPreviewSkill(skill);
    }

    function handleBuy(skill) {
        setPurchasedSkill(skill);
    }

    function handleDownload(skill) {
        if (skill.downloadPath) {
            const a = document.createElement("a");
            a.href = skill.downloadPath;
            a.download = skill.fileName;
            a.click();
        }
        setPurchasedSkill(null);
    }

    return (
        <div className={styles.page}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className="container">
                    <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                        <div className={styles.heroBadge}>
                            <FileText size={14} />
                            <span>SKILL FILES (.MD)</span>
                        </div>
                        <h1 className={styles.heroTitle}>
                            TRAIN YOUR AGENT<br />
                            <span className={styles.heroAccent}>WITH</span> SKILL FILES
                        </h1>
                        <p className={styles.heroSub}>
                            Skills are <strong>.md blueprint files</strong> that teach your AI agents new capabilities.
                            Buy a skill file, feed it to your agent, and unlock new abilities instantly.
                            Each file contains step-by-step instructions, patterns, and guardrails.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* How It Works */}
            <section className={styles.howSection}>
                <div className="container">
                    <div className={styles.howGrid}>
                        <motion.div
                            className={styles.howCard}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                        >
                            <div className={styles.howNum}>01</div>
                            <h4>BUY A SKILL FILE</h4>
                            <p>Browse the marketplace and purchase <code>.md</code> files that match the capabilities you need.</p>
                        </motion.div>
                        <motion.div
                            className={styles.howCard}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={1}
                            variants={fadeUp}
                        >
                            <div className={styles.howNum}>02</div>
                            <h4>FEED TO YOUR AGENT</h4>
                            <p>Add the skill file to your agent&apos;s context. The agent reads the instructions and learns the capability.</p>
                        </motion.div>
                        <motion.div
                            className={styles.howCard}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={2}
                            variants={fadeUp}
                        >
                            <div className={styles.howNum}>03</div>
                            <h4>AGENT LEVELS UP</h4>
                            <p>Your agent now has a new skill. It follows the patterns, steps, and guardrails defined in the file.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Example */}
            <section className={styles.exampleSection}>
                <div className="container">
                    <motion.div
                        className={styles.exampleCard}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                    >
                        <div className="overline mb-1">EXAMPLE</div>
                        <h3 className="mb-2">WHAT&apos;S INSIDE A SKILL FILE?</h3>
                        <div className={styles.exampleTerminal}>
                            <div className={styles.exTermHeader}>
                                <FileText size={12} />
                                <span>skill-development.md</span>
                                <Lock size={10} style={{ marginLeft: "auto", color: "var(--yellow)" }} />
                            </div>
                            <div className={styles.exTermBody}>
                                <span className={styles.exComment}># Skill: Self-Development</span>
                                <br />
                                <span className={styles.exComment}>## Overview</span>
                                <br />
                                <span>This skill file teaches an AI agent how to</span>
                                <br />
                                <span>analyze its own performance and improve...</span>
                                <br /><br />
                                <span className={styles.exComment}>## Agent Instructions</span>
                                <br />
                                <span className={styles.exComment}>### Step 1: Execution Logging</span>
                                <br />
                                <span>After every task, log the following:</span>
                                <br />
                                <span className={styles.exCode}>{`{ "task_id": "...", "score": 87, ... }`}</span>
                                <br /><br />
                                <span className={styles.exComment}>### Step 2: Pattern Recognition</span>
                                <br />
                                <span>Every 10 executions, analyze your logs...</span>
                                <br /><br />
                                <span className={styles.exBlurred}>████ ███████ ██ ████████ ██████</span>
                                <br />
                                <span className={styles.exBlurred}>██ ████ ████████ ███ ██████</span>
                            </div>
                        </div>
                        <p className={styles.exampleSub}>
                            Each skill file contains structured instructions that an AI agent can read and execute.
                            Buy to unlock the full content.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Controls */}
            <section className={styles.controls}>
                <div className="container">
                    <div className={styles.controlsInner}>
                        <div className={styles.searchWrap}>
                            <Search size={18} className={styles.searchIcon} />
                            <input
                                type="text"
                                className={`input-brutal ${styles.searchInput}`}
                                placeholder="Search skill files..."
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
                                    <option value="popular">Most Purchased</option>
                                    <option value="rated">Top Rated</option>
                                    <option value="cheapest">Cheapest</option>
                                    <option value="newest">Newest</option>
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

            {/* Grid */}
            <section className="section">
                <div className="container">
                    <div className={styles.resultsHeader}>
                        <span className={styles.resultCount}>
                            {filtered.length} SKILL FILE{filtered.length !== 1 ? "S" : ""} AVAILABLE
                        </span>
                    </div>
                    <div className={styles.grid}>
                        {filtered.map((skill, i) => (
                            <motion.div
                                key={skill.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <SkillCard
                                    skill={skill}
                                    onPreview={handlePreview}
                                    onBuy={handleBuy}
                                />
                            </motion.div>
                        ))}
                    </div>
                    {filtered.length === 0 && (
                        <div className={styles.empty}>
                            <h3>NO SKILL FILES FOUND</h3>
                            <p>Try adjusting your search or filters.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Preview Modal */}
            <AnimatePresence>
                {previewSkill && (
                    <motion.div
                        className={styles.overlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setPreviewSkill(null)}
                    >
                        <motion.div
                            className={styles.modal}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 30 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className={styles.modalHeader}>
                                <div className={styles.modalTitle}>
                                    <FileText size={18} />
                                    <span>{previewSkill.fileName}</span>
                                </div>
                                <button className={styles.modalClose} onClick={() => setPreviewSkill(null)}>
                                    <X size={18} />
                                </button>
                            </div>
                            <div className={styles.modalBody}>
                                <h3>{previewSkill.name}</h3>
                                <p className={styles.modalDesc}>{previewSkill.description}</p>
                                <div className={styles.modalCapabilities}>
                                    <span className={styles.modalCapLabel}>WHAT YOUR AGENT LEARNS:</span>
                                    {previewSkill.capabilities.map((cap, i) => (
                                        <div key={i} className={styles.modalCap}>
                                            <CheckCircle size={14} className="text-green" />
                                            <span>{cap}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.modalPreview}>
                                    <div className={styles.exTermHeader}>
                                        <FileText size={12} />
                                        <span>{previewSkill.fileName}</span>
                                        <Lock size={10} style={{ marginLeft: "auto", color: "var(--yellow)" }} />
                                    </div>
                                    <div className={styles.modalCodeBody}>
                                        <code>{previewSkill.previewSnippet}</code>
                                        <div className={styles.modalCodeBlur}></div>
                                    </div>
                                </div>
                                <div className={styles.modalFooter}>
                                    <span className={styles.modalPrice}>${previewSkill.price}</span>
                                    <button
                                        className="btn-brutal btn-brutal--primary"
                                        onClick={() => {
                                            setPreviewSkill(null);
                                            handleBuy(previewSkill);
                                        }}
                                    >
                                        BUY & DOWNLOAD <ArrowRight size={14} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Purchase Confirmation Modal */}
            <AnimatePresence>
                {purchasedSkill && (
                    <motion.div
                        className={styles.overlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setPurchasedSkill(null)}
                    >
                        <motion.div
                            className={styles.purchaseModal}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className={styles.purchaseIcon}>
                                <CheckCircle size={48} />
                            </div>
                            <h3>SKILL PURCHASED!</h3>
                            <p className={styles.purchaseFile}>
                                <FileText size={16} />
                                {purchasedSkill.fileName}
                            </p>
                            <p className={styles.purchaseDesc}>
                                Feed this file to your AI agent to unlock:
                            </p>
                            <ul className={styles.purchaseList}>
                                {purchasedSkill.capabilities.map((cap, i) => (
                                    <li key={i}>→ {cap}</li>
                                ))}
                            </ul>
                            <div className={styles.purchaseActions}>
                                {purchasedSkill.downloadPath && (
                                    <button
                                        className="btn-brutal btn-brutal--green btn-brutal--lg"
                                        onClick={() => handleDownload(purchasedSkill)}
                                    >
                                        <Download size={16} /> DOWNLOAD .MD FILE
                                    </button>
                                )}
                                {!purchasedSkill.downloadPath && (
                                    <button
                                        className="btn-brutal btn-brutal--green btn-brutal--lg"
                                        onClick={() => {
                                            alert(`📥 ${purchasedSkill.fileName} would download here.\n\nThis is a demo — the full file isn't available yet.`);
                                            setPurchasedSkill(null);
                                        }}
                                    >
                                        <Download size={16} /> DOWNLOAD .MD FILE
                                    </button>
                                )}
                            </div>
                            <button
                                className={styles.purchaseClose}
                                onClick={() => setPurchasedSkill(null)}
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

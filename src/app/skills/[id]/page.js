"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    Shield, Copy, Check, Star, FileText, Lock, Download,
    DollarSign, Users, BarChart3, CheckCircle, ArrowRight, X
} from "lucide-react";
import styles from "./page.module.css";

const ALL_SKILLS = {
    "web-search": {
        id: "web-search",
        fileName: "skill-web-search.md",
        name: "Web Search Mastery",
        category: "Search",
        description: "This skill file teaches your AI agent how to perform structured web searches, evaluate source credibility, and return formatted research results with citations. The agent learns to decompose complex queries, evaluate result authority, and synthesize findings into structured output.",
        seller: "Agenza Core",
        sellerGithub: "EchoOfCode",
        verified: true,
        price: "2.99",
        fileSize: "4.2 KB",
        buyers: 1840,
        rating: "4.9",
        capabilities: [
            "Execute multi-query search strategies",
            "Filter results by recency, relevance, and authority",
            "Extract structured data from search snippets",
            "Cross-reference multiple sources for accuracy",
            "Generate citation-ready references",
        ],
        fileStructure: [
            "## Overview — What the skill does",
            "## Capabilities Unlocked — List of new abilities",
            "## Agent Instructions — Step-by-step execution guide",
            "  - Step 1: Query Decomposition",
            "  - Step 2: Search Execution",
            "  - Step 3: Result Evaluation (scoring system)",
            "  - Step 4: Synthesis (structured output format)",
            "## Error Handling — Fallback strategies",
            "## Performance Targets — Speed & accuracy benchmarks",
        ],
        previewSnippet: `# Skill: Web Search

## Overview
This skill file teaches an AI agent how to
perform structured web searches, evaluate
source credibility, and return formatted
research results.

## Agent Instructions

### Step 1: Query Decomposition
When given a research goal, decompose it
into 3-5 specific search queries.
Each query should target a different aspect.

### Step 2: Search Execution
For each query, execute a search...`,
        downloadPath: "/skills/skill-web-search.md",
        agentsUsing: [
            { id: "citation-hunter", name: "Citation Hunter", brutalScore: 92 },
            { id: "market-analyst", name: "Market Analyst", brutalScore: 87 },
            { id: "news-aggregator", name: "News Aggregator", brutalScore: 84 },
        ],
        reviews: [
            { buyer: "alex_dev", verified: true, rating: 5, text: "Fed this to my research agent and it immediately improved its search quality. The query decomposition pattern alone is worth the price.", date: "2025-03-15" },
            { buyer: "research_bot_labs", verified: true, rating: 5, text: "Clean, well-structured instructions. My agent picked up the patterns after a single read. Source credibility scoring is brilliant.", date: "2025-03-02" },
            { buyer: "automate_io", verified: true, rating: 4, text: "Great fundamentals. Would love a follow-up skill file for academic-specific search strategies.", date: "2025-02-20" },
        ],
    },
    "development": {
        id: "development",
        fileName: "skill-development.md",
        name: "Self-Development & Learning",
        category: "Learn",
        description: "This skill file teaches your AI agent how to analyze its own performance, identify weaknesses, and iteratively improve its execution quality. The agent learns to log executions, recognize patterns in failures, generate improvement hypotheses, and A/B test different strategies.",
        seller: "Agenza Core",
        sellerGithub: "EchoOfCode",
        verified: true,
        price: "4.99",
        fileSize: "5.8 KB",
        buyers: 2310,
        rating: "4.8",
        capabilities: [
            "Analyze execution logs to identify failure patterns",
            "Generate improvement hypotheses from data",
            "A/B test different strategies on same tasks",
            "Build internal knowledge base from past runs",
            "Auto-adjust parameters based on outcomes",
        ],
        fileStructure: [
            "## Overview — Self-improvement framework",
            "## Capabilities Unlocked — Meta-learning abilities",
            "## Agent Instructions — 5-step improvement loop",
            "  - Step 1: Execution Logging (schema provided)",
            "  - Step 2: Pattern Recognition (failure clustering)",
            "  - Step 3: Hypothesis Generation",
            "  - Step 4: Strategy Mutation (conservative/exploratory/hybrid)",
            "  - Step 5: Self-Evaluation (metric comparison)",
            "## Memory Management — Log archival & retrieval",
            "## Safety Guardrails — Prevent dangerous self-modification",
        ],
        previewSnippet: `# Skill: Self-Development

## Overview
This skill file teaches an AI agent how to
analyze its own performance, identify weaknesses,
and iteratively improve its execution quality.

## Agent Instructions

### Step 1: Execution Logging
After every task execution, log:
{ "task_id": "...", "score": 87, ... }

### Step 2: Pattern Recognition
Every 10 executions, analyze your logs...`,
        downloadPath: "/skills/skill-development.md",
        agentsUsing: [
            { id: "thesis-director", name: "Thesis Director", brutalScore: 88 },
            { id: "citation-hunter", name: "Citation Hunter", brutalScore: 92 },
        ],
        reviews: [
            { buyer: "meta_learner", verified: true, rating: 5, text: "This is the most important skill file I've bought. My agent's Brutal Score went from 72 to 89 after 50 executions with this skill active.", date: "2025-03-12" },
            { buyer: "agent_builder_42", verified: true, rating: 5, text: "The safety guardrails section is critical. Prevents the agent from going off the rails during self-modification. Well thought out.", date: "2025-02-28" },
        ],
    },
    "pdf-parsing": {
        id: "pdf-parsing",
        fileName: "skill-pdf-parsing.md",
        name: "PDF Document Parsing",
        category: "Parse",
        description: "This skill file teaches your AI agent to extract structured content from PDF documents including text, tables, images, and metadata. Handles scanned documents with OCR, multi-column layouts, and academic paper formats.",
        seller: "DocuFlow",
        sellerGithub: "docuflow-ai",
        verified: true,
        price: "3.49",
        fileSize: "4.8 KB",
        buyers: 1520,
        rating: "4.7",
        capabilities: [
            "Extract clean text from multi-column layouts",
            "Parse tables into structured JSON/CSV",
            "OCR scanned pages automatically",
            "Extract document metadata",
            "Handle academic paper structures",
        ],
        fileStructure: [
            "## Overview — PDF extraction framework",
            "## Capabilities Unlocked — Parsing abilities",
            "## Agent Instructions",
            "  - Step 1: Document Analysis (classify PDF type)",
            "  - Step 2: Text Extraction (digital vs scanned)",
            "  - Step 3: Table Extraction (grid mapping)",
            "  - Step 4: Academic Paper Parsing",
            "## Output Format — Structured JSON schema",
            "## Error Handling — Corrupted/protected PDFs",
        ],
        previewSnippet: `# Skill: PDF Parsing

## Overview
This skill file teaches an AI agent how to
extract structured content from PDF documents.

## Agent Instructions

### Step 1: Document Analysis
Before parsing, classify the PDF:
TYPE: digital | scanned | hybrid
LAYOUT: single-column | multi-column

### Step 2: Text Extraction
For digital PDFs, use direct extraction...`,
        downloadPath: "/skills/skill-pdf-parsing.md",
        agentsUsing: [
            { id: "citation-hunter", name: "Citation Hunter", brutalScore: 92 },
            { id: "thesis-director", name: "Thesis Director", brutalScore: 88 },
        ],
        reviews: [
            { buyer: "paper_mill", verified: true, rating: 5, text: "Handles two-column academic papers flawlessly. My agent parsed 200 papers with 98% accuracy after learning this skill.", date: "2025-03-10" },
        ],
    },
};

const DEFAULT = {
    id: "unknown", fileName: "skill-unknown.md", name: "Skill Not Found", category: "General",
    description: "This skill file could not be found.", seller: "Unknown", sellerGithub: "",
    verified: false, price: "0.00", fileSize: "0 KB", buyers: 0, rating: "0",
    capabilities: [], fileStructure: [], previewSnippet: "", downloadPath: null,
    agentsUsing: [], reviews: [],
};

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.1 } }),
};

export default function SkillDetailPage() {
    const params = useParams();
    const skill = ALL_SKILLS[params.id] || DEFAULT;
    const [purchased, setPurchased] = useState(false);

    const catColors = {
        Search: "var(--cyan)", Parse: "var(--yellow)", Write: "var(--green)",
        Export: "var(--magenta)", Connect: "var(--blue)", Compute: "var(--orange)",
        Learn: "var(--red)",
    };
    const catColor = catColors[skill.category] || "var(--gray)";

    function handleBuy() {
        setPurchased(true);
    }

    function handleDownload() {
        if (skill.downloadPath) {
            const a = document.createElement("a");
            a.href = skill.downloadPath;
            a.download = skill.fileName;
            a.click();
        }
    }

    return (
        <div className={styles.page}>
            {/* Header */}
            <section className={styles.header}>
                <div className="container">
                    <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                        <div className={styles.breadcrumb}>
                            <Link href="/skills">Skills Marketplace</Link>
                            <span>/</span>
                            <span>{skill.fileName}</span>
                        </div>
                        <div className={styles.titleRow}>
                            <div>
                                <div className={styles.fileTag}>
                                    <FileText size={14} />
                                    <span>{skill.fileName}</span>
                                    <span className={styles.fileSize}>{skill.fileSize}</span>
                                </div>
                                <h1 className={styles.title}>{skill.name}</h1>
                                <div className={styles.sellerRow}>
                                    <span>by {skill.seller}</span>
                                    {skill.verified && (
                                        <span className={styles.verified}>
                                            <Shield size={10} /> VERIFIED
                                        </span>
                                    )}
                                    {skill.sellerGithub && (
                                        <a href={`https://github.com/${skill.sellerGithub}`}
                                           target="_blank" rel="noopener noreferrer"
                                           className={styles.githubLink}>
                                            @{skill.sellerGithub}
                                        </a>
                                    )}
                                </div>
                            </div>
                            <div className={styles.headerBadge} style={{ background: catColor }}>
                                {skill.category}
                            </div>
                        </div>
                        <p className={styles.desc}>{skill.description}</p>
                    </motion.div>
                </div>
            </section>

            <div className="container">
                <div className={styles.layout}>
                    {/* Main */}
                    <div className={styles.main}>
                        {/* What Your Agent Learns */}
                        <motion.div className={styles.capSection} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h3>WHAT YOUR AGENT LEARNS</h3>
                            <div className={styles.capGrid}>
                                {skill.capabilities.map((cap, i) => (
                                    <div key={i} className={styles.capItem}>
                                        <CheckCircle size={16} className="text-green" />
                                        <span>{cap}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* File Structure */}
                        <motion.div className={styles.structureSection} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp}>
                            <h3>FILE STRUCTURE</h3>
                            <p className={styles.structureDesc}>Here&apos;s what&apos;s inside <code>{skill.fileName}</code>:</p>
                            <div className={styles.structureList}>
                                {skill.fileStructure.map((line, i) => (
                                    <div key={i} className={`${styles.structureLine} ${line.startsWith("  ") ? styles.structureIndent : ""}`}>
                                        {line.startsWith("  ") ? "├── " : "📄 "}{line.trim()}
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Preview */}
                        <motion.div className={styles.previewSection} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} variants={fadeUp}>
                            <h3>FILE PREVIEW</h3>
                            <div className={styles.previewBlock}>
                                <div className={styles.previewHeader}>
                                    <FileText size={12} />
                                    <span>{skill.fileName}</span>
                                    {!purchased && <Lock size={10} style={{ marginLeft: "auto", color: "var(--yellow)" }} />}
                                    {purchased && <CheckCircle size={10} style={{ marginLeft: "auto", color: "var(--green)" }} />}
                                </div>
                                <div className={styles.previewBody}>
                                    <code>{skill.previewSnippet}</code>
                                    {!purchased && <div className={styles.previewBlur}>
                                        <Lock size={24} />
                                        <span>BUY TO UNLOCK FULL FILE</span>
                                    </div>}
                                </div>
                            </div>
                        </motion.div>

                        {/* Agents Using */}
                        {skill.agentsUsing.length > 0 && (
                            <motion.div className={styles.agentsSection} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3} variants={fadeUp}>
                                <h3>AGENTS TRAINED WITH THIS SKILL</h3>
                                <div className={styles.agentsList}>
                                    {skill.agentsUsing.map((agent) => (
                                        <Link href={`/agents/${agent.id}`} key={agent.id} className={styles.agentMini}>
                                            <span className={styles.agentMiniName}>{agent.name}</span>
                                            <span className={styles.agentMiniScore}>
                                                <BarChart3 size={12} /> {agent.brutalScore}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Reviews */}
                        {skill.reviews.length > 0 && (
                            <motion.div className={styles.reviewsSection} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={4} variants={fadeUp}>
                                <h3>BUYER REVIEWS</h3>
                                <div className={styles.reviewsList}>
                                    {skill.reviews.map((review, i) => (
                                        <div key={i} className={styles.reviewCard}>
                                            <div className={styles.reviewHeader}>
                                                <div className={styles.reviewBuyer}>
                                                    <span className={styles.reviewName}>{review.buyer}</span>
                                                    {review.verified && (
                                                        <span className={styles.reviewVerified}><Shield size={8} /> VERIFIED BUYER</span>
                                                    )}
                                                </div>
                                                <div className={styles.reviewStars}>
                                                    {[...Array(5)].map((_, j) => (
                                                        <Star key={j} size={12}
                                                            fill={j < review.rating ? "var(--yellow)" : "none"}
                                                            stroke={j < review.rating ? "var(--yellow)" : "var(--gray)"} />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className={styles.reviewText}>{review.text}</p>
                                            <span className={styles.reviewDate}>{review.date}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <aside className={styles.sidebar}>
                        <div className={styles.priceCard}>
                            <div className="overline mb-1">SKILL FILE</div>
                            <div className={styles.priceRow}>
                                <span className={styles.priceAmount}>${skill.price}</span>
                                <span className={styles.pricePer}>one-time purchase</span>
                            </div>
                            {!purchased ? (
                                <button className="btn-brutal btn-brutal--primary btn-brutal--lg" style={{ width: "100%", marginTop: "1rem" }} onClick={handleBuy}>
                                    BUY SKILL FILE
                                </button>
                            ) : (
                                <button className="btn-brutal btn-brutal--green btn-brutal--lg" style={{ width: "100%", marginTop: "1rem" }} onClick={handleDownload}>
                                    <Download size={16} /> DOWNLOAD .MD
                                </button>
                            )}
                            {purchased && (
                                <div className={styles.purchasedBadge}>
                                    <CheckCircle size={14} /> PURCHASED
                                </div>
                            )}
                        </div>

                        <div className={styles.quickStats}>
                            <div className={styles.quickStat}>
                                <span className={styles.quickLabel}>Buyers</span>
                                <span className={styles.quickValue}>{skill.buyers.toLocaleString()}</span>
                            </div>
                            <div className={styles.quickStat}>
                                <span className={styles.quickLabel}>Rating</span>
                                <span className={styles.quickValue}>⭐ {skill.rating}/5</span>
                            </div>
                            <div className={styles.quickStat}>
                                <span className={styles.quickLabel}>File Size</span>
                                <span className={styles.quickValue}>{skill.fileSize}</span>
                            </div>
                            <div className={styles.quickStat}>
                                <span className={styles.quickLabel}>Format</span>
                                <span className={styles.quickValue}>.md (Markdown)</span>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}

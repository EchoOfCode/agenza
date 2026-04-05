"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    ArrowRight, Code2, Upload, DollarSign, Github, Video,
    Shield, CheckCircle, TrendingUp, Zap, Package, BarChart3
} from "lucide-react";
import styles from "./page.module.css";

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.1 },
    }),
};

export default function SellPage() {
    const [form, setForm] = useState({
        name: "",
        description: "",
        category: "research",
        pricingModel: "per-run",
        priceAmount: "",
        agentFile: null,
        demoVideoUrl: "",
    });

    function handleChange(e) {
        const { name, value, files } = e.target;
        if (files) {
            setForm((f) => ({ ...f, [name]: files[0] }));
        } else {
            setForm((f) => ({ ...f, [name]: value }));
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        alert(
            `🚀 Agent Submitted for Review!\n\n` +
            `Name: ${form.name}\n` +
            `Category: ${form.category}\n` +
            `Pricing: ${form.pricingModel === "per-run" ? `$${form.priceAmount}/run` : `$${form.priceAmount}/mo`}\n\n` +
            `You'll receive an email once your agent is approved.`
        );
    }

    return (
        <div className={styles.page}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className="container">
                    <motion.div
                        className={styles.heroContent}
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                    >
                        <div className={styles.heroBadge}>
                            <DollarSign size={14} />
                            <span>CREATOR PROGRAM</span>
                        </div>
                        <h1 className={styles.heroTitle}>
                            LIST YOUR AGENT.<br />
                            <span className={styles.heroAccent}>EARN</span> REVENUE.
                        </h1>
                        <p className={styles.heroSub}>
                            Build autonomous agents, submit them to the marketplace, and earn money
                            every time someone runs your agent. Real builders. Real revenue.
                        </p>
                        <a href="#submit-form" className="btn-brutal btn-brutal--primary btn-brutal--lg">
                            START SELLING <ArrowRight size={18} />
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* How It Works */}
            <section className={`section ${styles.howSection}`}>
                <div className="container">
                    <div className="overline mb-2">SELLER JOURNEY</div>
                    <h2 className="mb-4">HOW IT WORKS</h2>
                    <div className={styles.stepsGrid}>
                        {[
                            {
                                num: "01",
                                icon: <Code2 size={32} />,
                                title: "BUILD",
                                desc: "Create your autonomous agent using Python. Define goals, tool calls, sub-agent hiring logic, and output formats.",
                                color: "var(--cyan)",
                            },
                            {
                                num: "02",
                                icon: <Upload size={32} />,
                                title: "SUBMIT",
                                desc: "Upload your agent .py file, record a 60-second demo video, verify your GitHub identity. We review within 48 hours.",
                                color: "var(--yellow)",
                            },
                            {
                                num: "03",
                                icon: <DollarSign size={32} />,
                                title: "EARN",
                                desc: "Your agent goes live on the marketplace. Earn revenue every time a buyer runs it. Track everything in your seller dashboard.",
                                color: "var(--green)",
                            },
                        ].map((step, i) => (
                            <motion.div
                                key={i}
                                className={styles.stepCard}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                custom={i}
                                variants={fadeUp}
                            >
                                <div className={styles.stepNum} style={{ color: step.color }}>{step.num}</div>
                                <div className={styles.stepIcon} style={{ background: step.color }}>{step.icon}</div>
                                <h3>{step.title}</h3>
                                <p>{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Requirements */}
            <section className="section section--dark">
                <div className="container">
                    <div className="overline mb-2" style={{ color: "var(--yellow)" }}>BEFORE YOU SUBMIT</div>
                    <h2 className="mb-4" style={{ color: "var(--white)" }}>REQUIREMENTS</h2>
                    <div className={styles.reqGrid}>
                        <motion.div
                            className={styles.reqCard}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                        >
                            <div className={styles.reqIcon}><Github size={32} /></div>
                            <h4>GITHUB VERIFICATION</h4>
                            <p>
                                Link your GitHub account. We verify your identity, contribution history,
                                and code quality. No anonymous uploads. No prompt wrappers.
                            </p>
                            <div className={styles.reqChecks}>
                                <span><CheckCircle size={14} /> Public profile required</span>
                                <span><CheckCircle size={14} /> At least 5 repos</span>
                                <span><CheckCircle size={14} /> Account age 90+ days</span>
                            </div>
                        </motion.div>
                        <motion.div
                            className={styles.reqCard}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={1}
                            variants={fadeUp}
                        >
                            <div className={styles.reqIcon}><Video size={32} /></div>
                            <h4>60-SECOND DEMO VIDEO</h4>
                            <p>
                                Record a short video showing your agent executing a real task end-to-end.
                                This is shown to buyers on the marketplace page.
                            </p>
                            <div className={styles.reqChecks}>
                                <span><CheckCircle size={14} /> Max 60 seconds</span>
                                <span><CheckCircle size={14} /> Show real execution</span>
                                <span><CheckCircle size={14} /> YouTube or Loom URL</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Revenue Model */}
            <section className={`section ${styles.revenueSection}`}>
                <div className="container">
                    <motion.div
                        className={styles.revenueCard}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                    >
                        <div className="overline mb-1">REVENUE SPLIT</div>
                        <h2 className="mb-3">AGENZA TAKES 20%. YOU KEEP 80%.</h2>
                        <p className={styles.revenueSub}>
                            Every time a buyer runs your agent or subscribes to it, you earn 80% of the revenue.
                            No hidden fees. No minimum payouts. Withdraw anytime.
                        </p>
                        <div className={styles.revenueBar}>
                            <div className={styles.revenueBarYours}>
                                <span>YOU: 80%</span>
                            </div>
                            <div className={styles.revenueBarPlatform}>
                                <span>20%</span>
                            </div>
                        </div>
                        <div className={styles.revenueExample}>
                            <div className={styles.revenueExRow}>
                                <span>If your agent earns</span>
                                <strong>$1,000</strong>
                            </div>
                            <div className={styles.revenueExRow}>
                                <span>You receive</span>
                                <strong className="text-green">$800</strong>
                            </div>
                            <div className={styles.revenueExRow}>
                                <span>Platform fee</span>
                                <strong className="text-gray">$200</strong>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Submission Form */}
            <section className="section" id="submit-form">
                <div className="container">
                    <div className="overline mb-2">AGENT SUBMISSION</div>
                    <h2 className="mb-4">SUBMIT YOUR AGENT</h2>
                    <div className={styles.formLayout}>
                        <motion.form
                            className={styles.form}
                            onSubmit={handleSubmit}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                        >
                            <div className={styles.formGroup}>
                                <label className={styles.label}>AGENT NAME</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="input-brutal"
                                    placeholder="e.g. Citation Hunter"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>DESCRIPTION</label>
                                <textarea
                                    name="description"
                                    className={`input-brutal ${styles.textarea}`}
                                    placeholder="Describe what your agent does, what tools it uses, and what outcomes it delivers..."
                                    rows={4}
                                    value={form.description}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>CATEGORY</label>
                                    <select
                                        name="category"
                                        className="select-brutal"
                                        value={form.category}
                                        onChange={handleChange}
                                        style={{ width: "100%" }}
                                    >
                                        <option value="research">Research</option>
                                        <option value="engineering">Engineering</option>
                                        <option value="productivity">Productivity</option>
                                        <option value="career">Career</option>
                                    </select>
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>PRICING MODEL</label>
                                    <select
                                        name="pricingModel"
                                        className="select-brutal"
                                        value={form.pricingModel}
                                        onChange={handleChange}
                                        style={{ width: "100%" }}
                                    >
                                        <option value="per-run">Per Run</option>
                                        <option value="subscription">Monthly Subscription</option>
                                    </select>
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>
                                    PRICE ({form.pricingModel === "per-run" ? "USD per run" : "USD per month"})
                                </label>
                                <input
                                    type="number"
                                    name="priceAmount"
                                    className="input-brutal"
                                    placeholder={form.pricingModel === "per-run" ? "0.02" : "4.99"}
                                    step="0.01"
                                    min="0"
                                    value={form.priceAmount}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>AGENT FILE (.py)</label>
                                <div className={styles.fileUpload}>
                                    <Upload size={20} />
                                    <span>
                                        {form.agentFile ? form.agentFile.name : "Click to upload or drag & drop your .py file"}
                                    </span>
                                    <input
                                        type="file"
                                        name="agentFile"
                                        accept=".py"
                                        onChange={handleChange}
                                        className={styles.fileInput}
                                    />
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>DEMO VIDEO URL</label>
                                <input
                                    type="url"
                                    name="demoVideoUrl"
                                    className="input-brutal"
                                    placeholder="https://youtube.com/watch?v=... or https://loom.com/..."
                                    value={form.demoVideoUrl}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn-brutal btn-brutal--primary btn-brutal--lg" style={{ width: "100%" }}>
                                SUBMIT FOR REVIEW <ArrowRight size={18} />
                            </button>
                        </motion.form>

                        {/* Dashboard Preview */}
                        <motion.div
                            className={styles.dashPreview}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={1}
                            variants={fadeUp}
                        >
                            <div className={styles.dashPreviewHeader}>
                                <h4>SELLER DASHBOARD PREVIEW</h4>
                                <span className="badge-brutal badge-brutal--yellow">COMING SOON</span>
                            </div>
                            <div className={styles.dashStats}>
                                <div className={styles.dashStat}>
                                    <DollarSign size={16} />
                                    <div className={styles.dashStatValue}>$2,847</div>
                                    <div className={styles.dashStatLabel}>TOTAL REVENUE</div>
                                </div>
                                <div className={styles.dashStat}>
                                    <BarChart3 size={16} />
                                    <div className={styles.dashStatValue}>14,230</div>
                                    <div className={styles.dashStatLabel}>TOTAL RUNS</div>
                                </div>
                                <div className={styles.dashStat}>
                                    <Package size={16} />
                                    <div className={styles.dashStatValue}>3</div>
                                    <div className={styles.dashStatLabel}>LISTED AGENTS</div>
                                </div>
                                <div className={styles.dashStat}>
                                    <TrendingUp size={16} />
                                    <div className={styles.dashStatValue}>87</div>
                                    <div className={styles.dashStatLabel}>BRUTAL SCORE™</div>
                                </div>
                            </div>
                            <div className={styles.dashOverlay}>
                                <Link href="/seller/dashboard" className="btn-brutal btn-brutal--dark">
                                    VIEW FULL DASHBOARD <ArrowRight size={14} />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}

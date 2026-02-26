"use client";
import { motion } from "framer-motion";
import {
    Upload,
    FileSearch,
    Calendar,
    Send,
    Lightbulb,
    DollarSign,
    Mail,
    Share2,
    ChevronRight,
    CheckCircle,
} from "lucide-react";
import styles from "./WorkflowPipeline.module.css";

const iconMap = {
    Upload,
    FileSearch,
    Calendar,
    Send,
    Lightbulb,
    DollarSign,
    Mail,
    Share2,
};

export default function WorkflowPipeline({ workflow }) {
    return (
        <div className={styles.pipeline}>
            <div className={styles.header}>
                <h3 className={styles.title}>{workflow.name}</h3>
                <p className={styles.desc}>{workflow.description}</p>
            </div>
            <div className={styles.steps}>
                {workflow.steps.map((step, i) => {
                    const Icon = iconMap[step.icon] || Upload;
                    return (
                        <div key={i} className={styles.stepRow}>
                            <motion.div
                                className={styles.stepCard}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                            >
                                <div className={styles.stepIcon}>
                                    <Icon size={20} />
                                </div>
                                <div className={styles.stepContent}>
                                    <div className={styles.stepLabel}>
                                        <span className={styles.stepNum}>0{i + 1}</span>
                                        <span className={styles.stepName}>{step.label}</span>
                                        <CheckCircle size={14} className={styles.checkIcon} />
                                    </div>
                                    <p className={styles.stepDesc}>{step.description}</p>
                                    <div className={styles.stepDetail}>{step.detail}</div>
                                </div>
                            </motion.div>
                            {i < workflow.steps.length - 1 && (
                                <div className={styles.connector}>
                                    <ChevronRight size={16} />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

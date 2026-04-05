"use client";
import { Shield, ShoppingCart, Eye, FileText, Lock } from "lucide-react";
import styles from "./SkillCard.module.css";

const CAT_CLASSES = {
    search: styles.cat_search,
    parse: styles.cat_parse,
    write: styles.cat_write,
    export: styles.cat_export,
    connect: styles.cat_connect,
    compute: styles.cat_compute,
    learn: styles.cat_learn,
};

export default function SkillCard({ skill, onPreview, onBuy }) {
    const catClass = CAT_CLASSES[skill.category.toLowerCase()] || styles.cat_search;

    return (
        <div className={styles.card}>
            <div className={styles.cardBody}>
                <div className={styles.header}>
                    <div className={styles.headerLeft}>
                        <div className={styles.fileIcon}>
                            <FileText size={18} />
                        </div>
                        <div>
                            <h4 className={styles.name}>{skill.fileName}</h4>
                            <div className={styles.seller}>
                                by {skill.seller}
                                {skill.verified && (
                                    <span className={styles.verified}>
                                        <Shield size={8} /> VERIFIED
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <span className={`${styles.categoryBadge} ${catClass}`}>
                        {skill.category}
                    </span>
                </div>

                <h4 className={styles.skillTitle}>{skill.name}</h4>
                <p className={styles.desc}>{skill.description}</p>

                <div className={styles.teaches}>
                    <span className={styles.teachesLabel}>TEACHES YOUR AGENT:</span>
                    <ul className={styles.teachesList}>
                        {skill.capabilities.slice(0, 3).map((cap, i) => (
                            <li key={i}>{cap}</li>
                        ))}
                    </ul>
                </div>

                <div className={styles.meta}>
                    <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>FILE SIZE</span>
                        <span className={styles.metaValue}>{skill.fileSize}</span>
                    </div>
                    <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>BUYERS</span>
                        <span className={styles.metaValue}>{skill.buyers.toLocaleString()}</span>
                    </div>
                    <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>RATING</span>
                        <span className={styles.metaValue}>⭐ {skill.rating}</span>
                    </div>
                </div>

                <div className={styles.preview}>
                    <div className={styles.previewHeader}>
                        <FileText size={12} />
                        <span>{skill.fileName}</span>
                        <Lock size={10} className={styles.lockIcon} />
                    </div>
                    <div className={styles.previewBody}>
                        <code>{skill.previewSnippet}</code>
                    </div>
                    <div className={styles.previewBlur}></div>
                </div>

                <div className={styles.price}>
                    <span className={styles.priceAmount}>${skill.price}</span>
                    <span className={styles.pricePer}>one-time purchase</span>
                </div>
            </div>

            <div className={styles.footer}>
                <button
                    className={`btn-brutal btn-brutal--outline btn-brutal--sm ${styles.btnPreview}`}
                    onClick={() => onPreview?.(skill)}
                >
                    <Eye size={12} /> Preview
                </button>
                <button
                    className={`btn-brutal btn-brutal--primary btn-brutal--sm ${styles.btnBuy}`}
                    onClick={() => onBuy?.(skill)}
                >
                    <ShoppingCart size={12} /> Buy — ${skill.price}
                </button>
            </div>
        </div>
    );
}

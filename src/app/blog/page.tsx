import React from 'react';
import Link from 'next/link';
import styles from './Blog.module.css';

const MOCK_POSTS = [
    {
        slug: 'understanding-dva-entitlements',
        title: 'Understanding Your DVA Entitlements',
        date: 'October 24, 2023',
        excerpt: 'A comprehensive guide to navigating the Department of Veterans\' Affairs claims process and understanding what you are eligible for.'
    },
    {
        slug: 'transitioning-to-civilian-employment',
        title: 'Transitioning to Civilian Employment',
        date: 'November 12, 2023',
        excerpt: 'Tips and strategies for translating your military skills into a civilian resume and acing your job interviews.'
    },
    {
        slug: 'mental-health-resources-for-families',
        title: 'Mental Health Resources for Families',
        date: 'December 05, 2023',
        excerpt: 'Support isn\'t just for the veteran. Discover the range of mental health services available for partners and children of ADF members.'
    }
];

export default function BlogIndexPage() {
    return (
        <div className={`container ${styles.container}`}>
            <div className={styles.header}>
                <h1 className={styles.title}>Resources & Insights</h1>
                <p className={styles.subtitle}>Articles, guides, and news to support your journey.</p>
            </div>

            <div className={styles.grid}>
                {MOCK_POSTS.map(post => (
                    <article key={post.slug} className={styles.card}>
                        <div className={styles.cardContent}>
                            <span className={styles.cardDate}>{post.date}</span>
                            <h2 className={styles.cardTitle}>{post.title}</h2>
                            <p className={styles.cardExcerpt}>{post.excerpt}</p>
                            <Link href={`/blog/${post.slug}`} className={styles.readMore}>
                                Read Article &rarr;
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}

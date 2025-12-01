import React from 'react';
import Link from 'next/link';
import styles from '../Blog.module.css';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    // In a real app, fetch data based on params.slug
    const title = params.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    return (
        <div className={`container ${styles.container}`}>
            <Link href="/blog" style={{ display: 'inline-block', marginBottom: '1rem', color: 'var(--color-text-muted)' }}>
                &larr; Back to Resources
            </Link>

            <article>
                <header className={styles.postHeader}>
                    <div className={styles.postMeta}>Published on October 24, 2023 • By Admin</div>
                    <h1 className={styles.title}>{title}</h1>
                </header>

                <div className={styles.postContent}>
                    <p>
                        <strong>Note: This is a placeholder article generated based on the slug: {params.slug}.</strong>
                    </p>
                    <p>
                        Transitioning from military to civilian life is a significant life event. It involves changes in identity, routine, community, and purpose.
                        For many Australian Defence Force (ADF) members, this process can be both exciting and challenging.
                    </p>
                    <h2>Key Considerations</h2>
                    <p>
                        One of the first steps is understanding your entitlements. The Department of Veterans' Affairs (DVA) provides a range of support services,
                        but navigating the system can sometimes feel overwhelming. It is important to engage with DVA early, ideally before your discharge date.
                    </p>
                    <h2>Seeking Support</h2>
                    <p>
                        Remember, you do not have to do this alone. Organizations like Open Arms, RSL, and Soldier On are there to provide guidance, advocacy, and community.
                        Whether you need help with claims, employment, or just someone to talk to, reach out.
                    </p>
                    <p>
                        <em>"No Ranks. No Red Tape."</em> This philosophy drives many of the modern support networks available to you today.
                    </p>
                </div>
            </article>
        </div>
    );
}

import React from 'react';
import Link from 'next/link';
import Hero from '@/components/Hero';
import styles from './Home.module.css';

export default function Home() {
  return (
    <>
      <Hero />

      {/* CTA Tiles Section */}
      <section className={`${styles.section} ${styles.bgGray}`}>
        <div className="container">
          <h2 className={styles.sectionTitle}>How We Can Help</h2>
          <div className={styles.grid}>
            <div className={styles.tile}>
              <div className={styles.tileIcon}>🧠</div>
              <h3 className={styles.tileTitle}>Mental Health</h3>
              <p className={styles.tileDesc}>Confidential support and resources for you and your family.</p>
              <Link href="/directory?category=mental-health" className="btn btn-primary">Find Support</Link>
            </div>
            <div className={styles.tile}>
              <div className={styles.tileIcon}>💼</div>
              <h3 className={styles.tileTitle}>Employment</h3>
              <p className={styles.tileDesc}>Connect with veteran-friendly employers and career guidance.</p>
              <Link href="/directory?category=employment" className="btn btn-primary">Explore Jobs</Link>
            </div>
            <div className={styles.tile}>
              <div className={styles.tileIcon}>📋</div>
              <h3 className={styles.tileTitle}>Service Directory</h3>
              <p className={styles.tileDesc}>A comprehensive list of trusted services across Australia.</p>
              <Link href="/directory" className="btn btn-primary">Browse All</Link>
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistant Section */}
      <section className={`${styles.section} ${styles.aiSection}`}>
        <div className="container">
          <div className={styles.aiContainer}>
            <h2 style={{ color: 'white', marginBottom: '1rem' }}>Australian Military Veteran GPT</h2>
            <p style={{ color: 'var(--color-gray-200)', marginBottom: '2rem', fontSize: '1.1rem' }}>
              Get immediate, region-aware advice on entitlements, transition pathways, and support services.
              No ranks, no red tape.
            </p>
            <Link href="/gpt-assistant" className="btn btn-secondary" style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}>
              Start Chatting Now
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Resources / Blog Preview */}
      <section className={styles.section}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Latest Resources</h2>
          <div className={styles.blogPreview}>
            {[1, 2, 3].map((i) => (
              <div key={i} className={styles.blogCard}>
                <div className={styles.blogContent}>
                  <div className={styles.blogDate}>October 24, 2023</div>
                  <h3 className={styles.blogTitle}>Understanding Your DVA Entitlements</h3>
                  <p className={styles.blogExcerpt}>
                    A comprehensive guide to navigating the Department of Veterans' Affairs claims process...
                  </p>
                  <Link href={`/blog/post-${i}`} style={{ color: 'var(--color-adf-red)', fontWeight: '600' }}>
                    Read Article &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link href="/blog" className="btn btn-primary">View All Resources</Link>
          </div>
        </div>
      </section>
    </>
  );
}

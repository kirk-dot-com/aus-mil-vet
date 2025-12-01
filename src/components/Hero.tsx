import React from 'react';
import Link from 'next/link';
import styles from './Hero.module.css';

const Hero = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.heroContent}>
                <h1 className={styles.title}>Support That Understands Service</h1>
                <p className={styles.subtitle}>
                    The trusted digital hub for former Australian Defence Force members and their families.
                    Connect with services, get answers, and navigate your transition with confidence.
                </p>
                <div className={styles.ctaGroup}>
                    <Link href="/directory" className={`btn btn-secondary ${styles.heroBtn}`}>
                        Find Support Services
                    </Link>
                    <Link href="/gpt-assistant" className={`btn btn-primary ${styles.heroBtn}`} style={{ backgroundColor: 'var(--color-light-blue)', color: 'var(--color-navy-blue)' }}>
                        Ask GPT Assistant
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;

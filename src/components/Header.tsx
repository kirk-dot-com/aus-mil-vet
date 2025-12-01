"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className={styles.header}>
            <div className={`container ${styles.navContainer}`}>
                <Link href="/" className={styles.logo}>
                    Australian <span>Military Veteran</span>
                </Link>

                <button className={styles.mobileMenuBtn} onClick={toggleMenu} aria-label="Toggle menu">
                    ☰
                </button>

                <nav>
                    <ul className={`${styles.navLinks} ${isMenuOpen ? styles.open : ''}`}>
                        <li><Link href="/" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Home</Link></li>
                        <li><Link href="/about" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>About</Link></li>
                        <li><Link href="/directory" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Directory</Link></li>
                        <li><Link href="/gpt-assistant" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>GPT Assistant</Link></li>
                        <li><Link href="/blog" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Blog</Link></li>
                        <li><Link href="/login" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Login</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;

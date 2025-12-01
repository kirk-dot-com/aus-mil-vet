"use client";

import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.footerContent}>
                    <div className={styles.column}>
                        <h3>Australian Military Veteran</h3>
                        <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                            Bridging the gap between service and civilian life. Support that understands service.
                        </p>
                    </div>

                    <div className={styles.column}>
                        <h3>Quick Links</h3>
                        <ul className={styles.linkList}>
                            <li><Link href="/directory" className={styles.footerLink}>Service Directory</Link></li>
                            <li><Link href="/gpt-assistant" className={styles.footerLink}>GPT Assistant</Link></li>
                            <li><Link href="/blog" className={styles.footerLink}>Blog & Resources</Link></li>
                            <li><Link href="/contact" className={styles.footerLink}>Contact Us</Link></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h3>Legal</h3>
                        <ul className={styles.linkList}>
                            <li><Link href="/privacy" className={styles.footerLink}>Privacy Policy</Link></li>
                            <li><Link href="/terms" className={styles.footerLink}>Terms of Service</Link></li>
                            <li><Link href="/accessibility" className={styles.footerLink}>Accessibility</Link></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h3>Stay Updated</h3>
                        <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
                            <input type="email" placeholder="Enter your email" className={styles.input} />
                            <button type="submit" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                                Join
                            </button>
                        </form>
                    </div>
                </div>

                <div className={styles.copyright}>
                    &copy; {new Date().getFullYear()} Australian Military Veteran Application. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;

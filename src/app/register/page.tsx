"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '../auth/Auth.module.css';

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock register logic
        console.log('Registering:', name, email, password);
        router.push('/login');
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Create Account</h1>
                <p className={styles.subtitle}>Join to list your services in our directory.</p>

                <form className={styles.form} onSubmit={handleRegister}>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="name">Organization Name</label>
                        <input
                            id="name"
                            type="text"
                            className={styles.input}
                            placeholder="e.g. Veteran Support Inc."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            className={styles.input}
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            className={styles.input}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className={`btn btn-primary ${styles.submitBtn}`}>
                        Register
                    </button>
                </form>

                <div className={styles.footer}>
                    Already have an account? <Link href="/login" className={styles.link}>Sign in</Link>
                </div>
            </div>
        </div>
    );
}

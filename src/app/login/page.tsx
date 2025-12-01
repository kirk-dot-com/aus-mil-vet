"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '../auth/Auth.module.css';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock login logic
        console.log('Logging in with:', email, password);
        // Redirect to admin dashboard if email contains 'admin', else home
        if (email.includes('admin')) {
            router.push('/admin/dashboard');
        } else {
            router.push('/');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Welcome Back</h1>
                <p className={styles.subtitle}>Sign in to manage your directory listings.</p>

                <form className={styles.form} onSubmit={handleLogin}>
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
                        Sign In
                    </button>
                </form>

                <div className={styles.footer}>
                    Don't have an account? <Link href="/register" className={styles.link}>Register here</Link>
                </div>
            </div>
        </div>
    );
}

"use client";

import React, { useState } from 'react';
import styles from './Dashboard.module.css';

const MOCK_PENDING_LISTINGS = [
    { id: 1, name: 'Veteran Coffee Club', category: 'Community', submittedBy: 'john@example.com', date: '2023-11-25' },
    { id: 2, name: 'Tech Skills for Vets', category: 'Education', submittedBy: 'sarah@tech.edu', date: '2023-11-26' },
    { id: 3, name: 'Local Physio', category: 'Health', submittedBy: 'admin@physio.com.au', date: '2023-11-26' },
];

export default function AdminDashboard() {
    const [pendingListings, setPendingListings] = useState(MOCK_PENDING_LISTINGS);

    const handleApprove = (id: number) => {
        setPendingListings(pendingListings.filter(item => item.id !== id));
        alert(`Listing ${id} approved!`);
    };

    const handleReject = (id: number) => {
        setPendingListings(pendingListings.filter(item => item.id !== id));
        alert(`Listing ${id} rejected.`);
    };

    return (
        <div className={`container ${styles.container}`}>
            <div className={styles.header}>
                <h1 className={styles.title}>Admin Dashboard</h1>
                <button className="btn btn-primary">Create New Blog Post</button>
            </div>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statValue}>1,248</div>
                    <div className={styles.statLabel}>Total Users</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statValue}>356</div>
                    <div className={styles.statLabel}>Active Listings</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statValue}>{pendingListings.length}</div>
                    <div className={styles.statLabel}>Pending Reviews</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statValue}>89</div>
                    <div className={styles.statLabel}>GPT Queries Today</div>
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Pending Directory Submissions</h2>
                </div>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Organization Name</th>
                                <th>Category</th>
                                <th>Submitted By</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingListings.length > 0 ? (
                                pendingListings.map(listing => (
                                    <tr key={listing.id}>
                                        <td>{listing.name}</td>
                                        <td>{listing.category}</td>
                                        <td>{listing.submittedBy}</td>
                                        <td>{listing.date}</td>
                                        <td>
                                            <button
                                                className={`${styles.actionBtn} ${styles.approveBtn}`}
                                                onClick={() => handleApprove(listing.id)}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                className={`${styles.actionBtn} ${styles.rejectBtn}`}
                                                onClick={() => handleReject(listing.id)}
                                            >
                                                Reject
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>
                                        No pending submissions. Good job!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

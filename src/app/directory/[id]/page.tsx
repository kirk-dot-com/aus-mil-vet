import React from 'react';
import Link from 'next/link';
import styles from './ListingDetail.module.css';
import { getServiceById } from '@/services/directoryService';

export default async function ListingDetailPage({ params }: { params: { id: string } }) {
    const service = await getServiceById(params.id);

    if (!service) {
        return (
            <div className={`container ${styles.container}`}>
                <h1>Service Not Found</h1>
                <Link href="/directory">Back to Directory</Link>
            </div>
        );
    }

    return (
        <div className={`container ${styles.container}`}>
            <Link href="/directory" className={styles.backLink}>
                &larr; Back to Directory
            </Link>

            <div className={styles.header}>
                <span className={styles.category}>{service.category}</span>
                <h1 className={styles.title}>{service.name}</h1>
                <div className={styles.location}>
                    <span>📍</span> {service.location}
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.mainInfo}>
                    <h2 style={{ marginBottom: '1rem', color: 'var(--color-navy-blue)' }}>About this Service</h2>
                    <p>{service.description}</p>
                    <p style={{ marginTop: '1rem' }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                </div>

                <aside className={styles.sidebar}>
                    <h3 className={styles.sidebarTitle}>Contact Information</h3>

                    {service.address && (
                        <div className={styles.contactItem}>
                            <span className={styles.contactLabel}>Address</span>
                            <span className={styles.contactValue}>{service.address}</span>
                        </div>
                    )}

                    {service.phone && (
                        <div className={styles.contactItem}>
                            <span className={styles.contactLabel}>Phone</span>
                            <span className={styles.contactValue}>{service.phone}</span>
                        </div>
                    )}

                    {service.email && (
                        <div className={styles.contactItem}>
                            <span className={styles.contactLabel}>Email</span>
                            <span className={styles.contactValue}>{service.email}</span>
                        </div>
                    )}

                    {service.website && (
                        <a href={service.website} target="_blank" rel="noopener noreferrer" className={`btn btn-primary ${styles.websiteBtn}`}>
                            Visit Website
                        </a>
                    )}
                </aside>
            </div>
        </div>
    );
}

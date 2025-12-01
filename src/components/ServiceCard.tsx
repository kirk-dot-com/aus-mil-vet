import React from 'react';
import Link from 'next/link';
import styles from './ServiceCard.module.css';

interface ServiceCardProps {
    id: string;
    name: string;
    category: string;
    description: string;
    location: string;
    phone?: string;
}

const ServiceCard = ({ id, name, category, description, location, phone }: ServiceCardProps) => {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <span className={styles.category}>{category}</span>
            </div>
            <h3 className={styles.title}>{name}</h3>
            <p className={styles.description}>{description}</p>

            <div className={styles.details}>
                <div className={styles.detailRow}>
                    <span>📍</span> {location}
                </div>
                {phone && (
                    <div className={styles.detailRow}>
                        <span>📞</span> {phone}
                    </div>
                )}
            </div>

            <div className={styles.actions}>
                <Link href={`/directory/${id}`} className={styles.viewBtn}>
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default ServiceCard;

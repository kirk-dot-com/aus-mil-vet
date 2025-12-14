"use client";

import React, { useState, useEffect } from 'react';
import ServiceCard from '@/components/ServiceCard';
import MapComponent from '@/components/MapComponent';
import styles from './Directory.module.css';
import { getServices, ServiceListing } from '@/services/directoryService';

export default function DirectoryPage() {
    const [services, setServices] = useState<ServiceListing[]>([]);
    const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');

    useEffect(() => {
        const fetchServices = async () => {
            const data = await getServices();
            console.log('DEBUG: Fetched services:', data);
            setServices(data);
        };
        fetchServices();
    }, []);

    const filteredServices = services.filter(service => {
        const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'All' || service.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const categories = ['All', ...Array.from(new Set(services.map(s => s.category)))];

    return (
        <div className={`container ${styles.pageContainer}`}>
            <div className={styles.header}>
                <h1 className={styles.title}>Service Directory</h1>
                <p className={styles.subtitle}>Find trusted support services, veteran-friendly employers, and community groups near you.</p>
            </div>

            <div className={styles.controls}>
                <div className={styles.searchBox}>
                    <input
                        type="text"
                        placeholder="Search services..."
                        className={styles.searchInput}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className={styles.filters}>
                    <select
                        className={styles.filterSelect}
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.viewToggle}>
                    <button
                        className={`${styles.toggleBtn} ${viewMode === 'list' ? styles.active : ''}`}
                        onClick={() => setViewMode('list')}
                    >
                        List
                    </button>
                    <button
                        className={`${styles.toggleBtn} ${viewMode === 'map' ? styles.active : ''}`}
                        onClick={() => setViewMode('map')}
                    >
                        Map
                    </button>
                </div>
            </div>

            {viewMode === 'list' ? (
                <div className={styles.grid}>
                    {filteredServices.map(service => (
                        <ServiceCard key={service.id} {...service} />
                    ))}
                </div>
            ) : (
                <div className={styles.mapContainer}>
                    <MapComponent services={filteredServices} />
                </div>
            )}
        </div>
    );
}

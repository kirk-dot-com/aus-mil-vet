'use client';

import React from 'react';
import { ActionItem } from '../../types/transition';
import styles from './Transition.module.css';

interface ActionItemListProps {
    items: ActionItem[];
    onToggleItem: (itemId: string) => void;
}

const ActionItemList: React.FC<ActionItemListProps> = ({ items, onToggleItem }) => {
    return (
        <ul className={styles.actionList}>
            {items.map((item) => (
                <li key={item.id} className={`${styles.actionItem} ${item.isCompleted ? styles.completed : ''}`}>
                    <div className={styles.itemHeader}>
                        <input
                            type="checkbox"
                            checked={item.isCompleted}
                            onChange={() => onToggleItem(item.id)}
                            className={styles.checkbox}
                            id={`check-${item.id}`}
                        />
                        <label htmlFor={`check-${item.id}`} className={styles.itemTitle}>{item.title}</label>
                    </div>
                    <p className={styles.itemDescription}>{item.description}</p>
                    {item.resources && item.resources.length > 0 && (
                        <div className={styles.resources}>
                            <span className={styles.resourceLabel}>Resources:</span>
                            {item.resources.map(res => (
                                <a key={res.id} href={res.url} target="_blank" rel="noopener noreferrer" className={styles.resourceLink}>
                                    {res.title}
                                </a>
                            ))}
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default ActionItemList;

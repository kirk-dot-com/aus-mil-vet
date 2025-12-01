import { db } from '@/lib/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    content?: string;
    author?: string;
}

const MOCK_POSTS: BlogPost[] = [
    {
        slug: 'understanding-dva-entitlements',
        title: 'Understanding Your DVA Entitlements',
        date: 'October 24, 2023',
        excerpt: 'A comprehensive guide to navigating the Department of Veterans\' Affairs claims process and understanding what you are eligible for.',
        content: 'Full content would go here...'
    },
    {
        slug: 'transitioning-to-civilian-employment',
        title: 'Transitioning to Civilian Employment',
        date: 'November 12, 2023',
        excerpt: 'Tips and strategies for translating your military skills into a civilian resume and acing your job interviews.',
        content: 'Full content would go here...'
    },
    {
        slug: 'mental-health-resources-for-families',
        title: 'Mental Health Resources for Families',
        date: 'December 05, 2023',
        excerpt: 'Support isn\'t just for the veteran. Discover the range of mental health services available for partners and children of ADF members.',
        content: 'Full content would go here...'
    }
];

const USE_MOCK = true;

export const getBlogPosts = async (): Promise<BlogPost[]> => {
    if (USE_MOCK) {
        return MOCK_POSTS;
    }
    // ... implementation
    return MOCK_POSTS;
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
    if (USE_MOCK) {
        return MOCK_POSTS.find(p => p.slug === slug) || null;
    }

    // Real implementation would query by slug field
    return null;
};

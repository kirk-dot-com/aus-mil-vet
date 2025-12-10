import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';

export interface ServiceListing {
    id: string;
    name: string;
    category: string;
    description: string;
    location: string;
    phone?: string;
    website?: string;
    email?: string;
    address?: string;
}

// Mock Data
const MOCK_SERVICES: ServiceListing[] = [
    {
        id: '1',
        name: 'Open Arms - Veterans & Families Counselling',
        category: 'Mental Health',
        description: 'Free and confidential, 24/7 counselling and support for current and former ADF members and their families.',
        location: 'National',
        phone: '1800 011 046',
        website: 'https://www.openarms.gov.au',
        email: 'support@openarms.gov.au',
        address: 'Various locations across Australia'
    },
    {
        id: '2',
        name: 'RSL Queensland',
        category: 'Support Services',
        description: 'Providing welfare, advocacy, and wellbeing support for veterans and their families in Queensland.',
        location: 'Brisbane, QLD',
        phone: '133 775',
        website: 'https://rslqld.org',
        email: 'vs@rslqld.org',
        address: '283 St Pauls Terrace, Fortitude Valley QLD 4006'
    },
    {
        id: '3',
        name: 'Soldier On',
        category: 'Employment',
        description: 'Supporting veterans and their families to secure their future through health, employment and education programs.',
        location: 'Canberra, ACT',
        phone: '1300 620 380'
    },
    {
        id: '4',
        name: 'Mates4Mates',
        category: 'Wellbeing',
        description: 'Physical rehabilitation and psychological services for current and ex-serving Defence Force members.',
        location: 'Townsville, QLD',
        phone: '1300 462 837'
    },
    {
        id: '5',
        name: 'Bravery Trust',
        category: 'Financial',
        description: 'Financial support for veterans facing hardship.',
        location: 'National',
        phone: '1800 272 837'
    },
    {
        id: '6',
        name: 'Defence Bank',
        category: 'Business Discounts',
        description: 'Banking services tailored for the defence community.',
        location: 'National',
        phone: '1800 033 139'
    }
];

const USE_MOCK = true; // Toggle this to false when ready to use real Firebase data

export const getServices = async (): Promise<ServiceListing[]> => {
    if (USE_MOCK) {
        return MOCK_SERVICES;
    }

    try {
        const querySnapshot = await getDocs(collection(db, "directory_listings"));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ServiceListing));
    } catch (error) {
        console.error("Error fetching services:", error);
        return [];
    }
};

export const getServiceById = async (id: string): Promise<ServiceListing | null> => {
    if (USE_MOCK) {
        return MOCK_SERVICES.find(s => s.id === id) || null;
    }

    try {
        const docRef = doc(db, "directory_listings", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as ServiceListing;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching service:", error);
        return null;
    }
};

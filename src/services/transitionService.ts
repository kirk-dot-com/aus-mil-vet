import { TransitionStep, UserTransitionProgress } from '../types/transition';

const MOCK_STEPS: TransitionStep[] = [
    {
        id: 'step-1',
        title: 'Pre-Discharge Preparation',
        description: 'Critical tasks to complete before leaving the service.',
        order: 1,
        isCompleted: false,
        items: [
            {
                id: 'action-1-1',
                title: 'Attend Transition Seminar',
                description: 'Register and attend a mandatory transition seminar.',
                isCompleted: false,
                resources: [
                    { id: 'res-1', title: 'Transition Seminar Info', url: 'https://www.defence.gov.au/transition' }
                ]
            },
            {
                id: 'action-1-2',
                title: 'Medical Assessment',
                description: 'Complete your final medical and dental assessments.',
                isCompleted: false,
            }
        ]
    },
    {
        id: 'step-2',
        title: 'Career Planning',
        description: 'Plan your civilian career path.',
        order: 2,
        isCompleted: false,
        items: [
            {
                id: 'action-2-1',
                title: 'Draft Resume',
                description: 'Translate your military skills into a civilian resume.',
                isCompleted: false,
            },
            {
                id: 'action-2-2',
                title: 'Identify Skills Gaps',
                description: 'Determine if you need additional training or education.',
                isCompleted: false,
            }
        ]
    },
    {
        id: 'step-3',
        title: 'Post-Discharge Settlement',
        description: 'Settling into civilian life.',
        order: 3,
        isCompleted: false,
        items: [
            {
                id: 'action-3-1',
                title: 'Apply for DVA Support',
                description: 'Lodging claims with the Department of Veterans\' Affairs.',
                isCompleted: false,
                resources: [
                    { id: 'res-2', title: 'MyService', url: 'https://www.dva.gov.au/myservice' }
                ]
            },
            {
                id: 'action-3-2',
                title: 'Medicare Enrollment',
                description: 'Ensure you are enrolled in Medicare and have your card.',
                isCompleted: false,
            }
        ]
    }
];

// In-memory store for demo purposes
let userProgress: UserTransitionProgress = {
    userId: 'current-user',
    completedStepIds: [],
    completedActionItemIds: []
};

export const getTransitionSteps = async (): Promise<TransitionStep[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Merge progress with steps
    return MOCK_STEPS.map(step => ({
        ...step,
        isCompleted: userProgress.completedStepIds.includes(step.id),
        items: step.items.map(item => ({
            ...item,
            isCompleted: userProgress.completedActionItemIds.includes(item.id)
        }))
    }));
};

export const toggleActionItemCompletion = async (itemId: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 200));

    if (userProgress.completedActionItemIds.includes(itemId)) {
        userProgress.completedActionItemIds = userProgress.completedActionItemIds.filter(id => id !== itemId);
    } else {
        userProgress.completedActionItemIds.push(itemId);
    }

    // Auto-complete step if all items are done? keeping it simple for now, logic can be added here
    // For now, let's say a step is complete if all its items are complete
    updateStepCompletion();
};

const updateStepCompletion = () => {
    MOCK_STEPS.forEach(step => {
        const allItemsCompleted = step.items.every(item => userProgress.completedActionItemIds.includes(item.id));
        if (allItemsCompleted) {
            if (!userProgress.completedStepIds.includes(step.id)) {
                userProgress.completedStepIds.push(step.id);
            }
        } else {
            userProgress.completedStepIds = userProgress.completedStepIds.filter(id => id !== step.id);
        }
    });
}

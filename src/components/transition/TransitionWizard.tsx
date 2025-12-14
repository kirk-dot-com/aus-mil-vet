'use client';

import React, { useState, useEffect } from 'react';
import { TransitionStep } from '../../types/transition';
import { getTransitionSteps, toggleActionItemCompletion } from '../../services/transitionService';
import ActionItemList from './ActionItemList';
import styles from './Transition.module.css';

const TransitionWizard: React.FC = () => {
    const [steps, setSteps] = useState<TransitionStep[]>([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadSteps();
    }, []);

    const loadSteps = async () => {
        const data = await getTransitionSteps();
        setSteps(data);
        setLoading(false);
        // Find first incomplete step to set as initial
        const firstIncomplete = data.findIndex(s => !s.isCompleted);
        if (firstIncomplete !== -1) {
            setCurrentStepIndex(firstIncomplete);
        }
    };

    const handleToggleItem = async (itemId: string) => {
        // Optimistic update
        setSteps(prevSteps => prevSteps.map(step => ({
            ...step,
            items: step.items.map(item =>
                item.id === itemId ? { ...item, isCompleted: !item.isCompleted } : item
            )
        })));

        await toggleActionItemCompletion(itemId);
        // Refresh to get any derived state updates (like step completion)
        const updatedSteps = await getTransitionSteps();
        setSteps(updatedSteps);
    };

    const handleNext = () => {
        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(prev => prev - 1);
        }
    };

    if (loading) {
        return <div className={styles.loading}>Loading transition plan...</div>;
    }

    const currentStep = steps[currentStepIndex];

    return (
        <div className={styles.wizardContainer}>
            <div className={styles.stepNav}>
                {steps.map((step, index) => (
                    <button
                        key={step.id}
                        className={`${styles.navItem} ${index === currentStepIndex ? styles.active : ''} ${step.isCompleted ? styles.completed : ''}`}
                        onClick={() => setCurrentStepIndex(index)}
                    >
                        {index + 1}. {step.title}
                    </button>
                ))}
            </div>

            <div className={styles.stepContent}>
                <h2 className={styles.stepTitle}>{currentStep.title}</h2>
                <p className={styles.stepDescription}>{currentStep.description}</p>

                <ActionItemList items={currentStep.items} onToggleItem={handleToggleItem} />

                <div className={styles.controls}>
                    <button
                        onClick={handlePrevious}
                        disabled={currentStepIndex === 0}
                        className={`${styles.button} ${styles.secondary}`}
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={currentStepIndex === steps.length - 1}
                        className={`${styles.button} ${styles.primary}`}
                    >
                        {currentStepIndex === steps.length - 1 ? 'Finish' : 'Next'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransitionWizard;

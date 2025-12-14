import React from 'react';
import TransitionWizard from '../../components/transition/TransitionWizard';

export default function TransitionPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Transition Support Action</h1>
                <p className="text-lg text-gray-600 mb-8">
                    Your personalized guide to transitioning from military to civilian life.
                    Follow these steps to ensure a smooth transition.
                </p>
                <TransitionWizard />
            </div>
        </div>
    );
}

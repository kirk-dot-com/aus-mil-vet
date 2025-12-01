"use client";

import React, { useState } from 'react';
import styles from './GPT.module.css';

export default function GPTAssistantPage() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hello. I am the Australian Military Veteran Assistant. I can help you with information about entitlements, transition support, and local services. How can I assist you today?' }
    ]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newMessages = [...messages, { role: 'user', content: input }];
        setMessages(newMessages);
        setInput('');

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: newMessages.map(m => ({ role: m.role, content: m.content })) }),
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: data.content
            }]);
        } catch (error) {
            console.error('Error fetching GPT response:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "I'm sorry, I'm having trouble connecting to the server right now. Please try again later."
            }]);
        }
    };

    return (
        <div className={`container ${styles.container}`}>
            <div className={styles.header}>
                <h1 className={styles.title}>Australian Military Veteran GPT</h1>
                <p className={styles.subtitle}>Confidential, region-aware guidance. No Ranks. No Red Tape.</p>
            </div>

            <div className={styles.chatInterface}>
                <div className={styles.chatHistory}>
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`${styles.message} ${msg.role === 'user' ? styles.userMessage : styles.botMessage}`}>
                            {msg.content}
                        </div>
                    ))}
                </div>

                <form className={styles.inputArea} onSubmit={handleSend}>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Ask about entitlements, medical support, or transition..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button type="submit" className={styles.sendBtn}>Send</button>
                </form>
            </div>

            <p className={styles.disclaimer}>
                This AI assistant provides general information and is not a substitute for professional legal or medical advice.
            </p>
        </div>
    );
}

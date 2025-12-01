import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'mock-key',
});

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        if (!process.env.OPENAI_API_KEY) {
            // Return mock response if no key is present
            return NextResponse.json({
                role: 'assistant',
                content: "[MOCK RESPONSE] I am the Australian Military Veteran Assistant. I can help you with entitlements, transition support, and local services. (Configure OPENAI_API_KEY to get real AI responses)"
            });
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful assistant for Australian Military Veterans. You provide region-aware advice on entitlements, transition pathways, and support services. Your tone is trusted, experienced, and care-focused. 'No Ranks. No Red Tape.'" },
                ...messages
            ],
        });

        const reply = completion.choices[0].message;
        return NextResponse.json(reply);

    } catch (error: any) {
        console.error('Error in chat API:', error);

        // Fallback to mock response on error (e.g., quota exceeded)
        return NextResponse.json({
            role: 'assistant',
            content: "[FALLBACK] I'm currently having trouble connecting to my brain (OpenAI API Error). But don't worry, I can still tell you that Open Arms (1800 011 046) is available 24/7 for support."
        });
    }
}

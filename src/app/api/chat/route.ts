import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getServices } from '@/services/directoryService';
import { GPT_SYSTEM_INSTRUCTIONS } from '@/config/gpt-system-instructions';
import { getKnowledgeBaseContext } from '@/services/knowledge-base-service';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'mock-key',
});

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        // Fetch directory services for context
        const services = await getServices();
        const serviceContext = services.map(s =>
            `- ${s.name} (${s.category}): ${s.description}. Contact: ${s.phone || 'N/A'}, ${s.location}`
        ).join('\n');

        // Get knowledge base context
        const knowledgeContext = getKnowledgeBaseContext();

        // Combine system instructions with dynamic context
        const fullSystemPrompt = `${GPT_SYSTEM_INSTRUCTIONS}

IMPORTANT: You have access to the following trusted Directory Services. 
ALWAYS recommend them when relevant to the user's query:

${serviceContext}

If the user asks for help that matches one of these services, provide the name and contact details explicitly.

${knowledgeContext}`;

        if (!process.env.OPENAI_API_KEY) {
            // Return mock response if no key is present
            return NextResponse.json({
                role: 'assistant',
                content: "[MOCK RESPONSE] I see you're looking for support. Based on my directory, I can recommend Open Arms (1800 011 046) for 24/7 counselling or RSL Queensland (133 775) for welfare support. (Configure OPENAI_API_KEY to get real AI responses)"
            });
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: fullSystemPrompt },
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

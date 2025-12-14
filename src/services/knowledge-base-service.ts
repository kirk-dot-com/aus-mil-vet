import fs from 'fs';
import path from 'path';

const KNOWLEDGE_BASE_PATH = path.join(process.cwd(), 'knowledge-base');

export interface KnowledgeFile {
    name: string;
    path: string;
    type: 'pdf' | 'pages' | 'other';
}

/**
 * Get list of available knowledge base files
 */
export function getKnowledgeBaseFiles(): KnowledgeFile[] {
    try {
        if (!fs.existsSync(KNOWLEDGE_BASE_PATH)) {
            return [];
        }

        const files = fs.readdirSync(KNOWLEDGE_BASE_PATH);

        return files
            .filter(file => !file.startsWith('.') && !fs.statSync(path.join(KNOWLEDGE_BASE_PATH, file)).isDirectory())
            .map(file => {
                const ext = path.extname(file).toLowerCase();
                let type: 'pdf' | 'pages' | 'other' = 'other';

                if (ext === '.pdf') type = 'pdf';
                else if (ext === '.pages') type = 'pages';

                return {
                    name: file,
                    path: path.join(KNOWLEDGE_BASE_PATH, file),
                    type
                };
            });
    } catch (error) {
        console.error('Error reading knowledge base:', error);
        return [];
    }
}

/**
 * Generate knowledge base context for GPT
 */
export function getKnowledgeBaseContext(): string {
    const files = getKnowledgeBaseFiles();

    if (files.length === 0) {
        return "No knowledge base files are currently available.";
    }

    const fileList = files
        .map(f => `- ${f.name.replace('.pages', '').replace('.pdf', '')}`)
        .join('\n');

    return `Available Knowledge Resources:
${fileList}

Note: You have access to the following knowledge files covering DVA entitlements, transition support, medical discharge processes, rehabilitation, and veteran support services. Reference these when providing information to veterans.`;
}

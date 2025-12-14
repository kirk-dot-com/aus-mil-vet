
import fs from 'fs';
import path from 'path';

const DATA_DIR = '/Users/kirkjohnstone/.gemini/antigravity/playground/cosmic-belt/knowledge-base/ESO-12.csv';
const OUTPUT_FILE = '/Users/kirkjohnstone/.gemini/antigravity/playground/cosmic-belt/src/data/servicesData.json';

// Helper to parse CSV line respecting quotes
function parseCSVLine(line) {
    const result = [];
    let start = 0;
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        if (line[i] === '"') {
            inQuotes = !inQuotes;
        } else if (line[i] === ',' && !inQuotes) {
            result.push(line.slice(start, i).replace(/^"|"$/g, '').trim());
            start = i + 1;
        }
    }
    result.push(line.slice(start).replace(/^"|"$/g, '').trim());
    return result;
}

const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.csv'));
let allServices = [];
let idCounter = 1;

files.forEach(file => {
    const filePath = path.join(DATA_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n').map(l => l.trim()).filter(l => l);

    // Default category from filename
    let defaultCategory = file.split('-')[0].replace('Table 1.csv', '').trim();
    if (defaultCategory.includes('Medical')) defaultCategory = 'Medical';
    if (defaultCategory === 'ESO') defaultCategory = 'Support Services';

    let headers = [];
    let dataStarted = false;

    lines.forEach((line, index) => {
        // Simple heuristic to find header line
        if (line.startsWith('Name,') || line.startsWith('Medical Field,')) {
            headers = parseCSVLine(line).map(h => h.toLowerCase().replace(/ /g, '_'));
            dataStarted = true;
            return;
        }

        if (!dataStarted) return;

        // Stop if we hit a weird line or new table start (like likely in ESO file)
        if (line.includes('https://') && !line.includes(',')) return; // weird link lines
        if (line.startsWith('Name,')) return; // Restarted headers (ESO legacy section)

        const cols = parseCSVLine(line);
        if (cols.length < 2) return;

        const entry = {};
        headers.forEach((h, i) => {
            if (cols[i]) entry[h] = cols[i];
        });

        // Map to ServiceListing interface
        const listing = {
            id: String(idCounter++),
            name: entry.name,
            category: entry.category || entry.medical_field || defaultCategory,
            description: entry.notes || entry.description || `Service provided by ${entry.name}`,
            location: (entry.state || '') + (entry.post_code ? ' ' + entry.post_code : ''),
            phone: entry.phone || entry.telephone,
            website: entry.website,
            email: entry.email,
            address: entry.address || (entry.street_address ? `${entry.street_address}, ${entry.state || ''} ${entry.post_code || ''}` : '')
        };

        // Clean up fields
        if (listing.address && listing.address.startsWith(',')) listing.address = listing.address.substring(1).trim();
        if (listing.address && listing.address.endsWith(',')) listing.address = listing.address.slice(0, -1).trim();

        if (listing.name) { // Ensure name exists
            allServices.push(listing);
        }
    });
});


const tsContent = `import { ServiceListing } from '@/services/directoryService';

export const PROCESSED_SERVICES: ServiceListing[] = ${JSON.stringify(allServices, null, 4)};
`;

fs.writeFileSync(OUTPUT_FILE.replace('.json', '.ts'), tsContent);
console.log(`Generated ${allServices.length} services to ${OUTPUT_FILE.replace('.json', '.ts')}`);


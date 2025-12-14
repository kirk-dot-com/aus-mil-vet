
import fs from 'fs';
import path from 'path';

// Manual definition since we can't import TS directly in simple node script easily without compilation
const SERVICES_FILE = '/Users/kirkjohnstone/.gemini/antigravity/playground/cosmic-belt/src/data/servicesData.ts';
const API_KEY = 'AIzaSyDfAYoh2fMKeFHYtpzgBhBRbZSGi_P7uek';

function extractServices() {
    const content = fs.readFileSync(SERVICES_FILE, 'utf-8');
    const match = content.match(/export const PROCESSED_SERVICES: ServiceListing\[\] = (\[[\s\S]*?\]);/);
    if (!match) throw new Error("Could not parse services");
    return JSON.parse(match[1]);
}

async function geocodeAddress(address) {
    if (!address) return null;
    try {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'OK' && data.results.length > 0) {
            const loc = data.results[0].geometry.location;
            return { lat: loc.lat, lng: loc.lng };
        } else {
            console.log(`Failed to geocode "${address}": ${data.status}`);
            return null;
        }
    } catch (e) {
        console.error("Error geocoding:", e.message);
        return null;
    }
}

async function run() {
    const services = extractServices();
    console.log(`Geocoding ${services.length} services...`);

    let updated = 0;

    for (const service of services) {
        // Skip if already has lat/lng or no address info
        if (service.latitude && service.longitude) continue;

        // Construct best search address
        let searchAddr = service.address;

        // If address is vague (just states), don't bother for now or use state center
        if (!searchAddr && service.location) searchAddr = service.location;

        if (searchAddr) {
            // Add "Australia" to ensure we don't get London results
            if (!searchAddr.toLowerCase().includes('australia')) searchAddr += ', Australia';

            const coords = await geocodeAddress(searchAddr);
            if (coords) {
                service.latitude = coords.lat;
                service.longitude = coords.lng;
                updated++;
                console.log(`✓ ${service.name}: ${coords.lat}, ${coords.lng}`);
            } else {
                console.log(`✗ ${service.name} (${searchAddr})`);
            }

            // Sleep to be nice to API rate limits
            await new Promise(r => setTimeout(r, 200));
        }
    }

    const tsContent = `import { ServiceListing } from '@/services/directoryService';

export const PROCESSED_SERVICES: ServiceListing[] = ${JSON.stringify(services, null, 4)};
`;

    fs.writeFileSync(SERVICES_FILE, tsContent);
    console.log(`Done! Updated ${updated} services.`);
}

run();

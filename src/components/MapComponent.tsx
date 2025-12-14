import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { ServiceListing } from '@/services/directoryService';

const containerStyle = {
    width: '100%',
    height: '600px',
    borderRadius: '1rem',
    overflow: 'hidden'
};

const center = {
    lat: -25.2744, // Australia center
    lng: 133.7751
};

interface MapComponentProps {
    services: ServiceListing[];
}

const MapComponent: React.FC<MapComponentProps> = ({ services }) => {
    const [apiKey, setApiKey] = useState<string>('');
    const [selectedService, setSelectedService] = useState<ServiceListing | null>(null);

    useEffect(() => {
        // Safe access to environment variable
        const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
        setApiKey(key);
    }, []);

    if (!apiKey) {
        return (
            <div style={{ ...containerStyle, background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem', color: '#666' }}>
                <h3>Map Unavailable</h3>
                <p>Google Maps API Key is missing.</p>
                <code style={{ background: '#e0e0e0', padding: '0.5rem', borderRadius: '4px' }}>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code>
            </div>
        );
    }

    return (
        <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={4}
            >
                {services.map(service => {
                    const coords = service.latitude && service.longitude
                        ? { lat: service.latitude, lng: service.longitude }
                        : null;// Skip if no valid coords

                    if (!coords) return null;

                    return (
                        <Marker
                            key={service.id}
                            position={coords}
                            title={service.name}
                            onClick={() => setSelectedService(service)}
                        />
                    );
                })}

                {selectedService && (
                    <InfoWindow
                        position={{
                            lat: selectedService.latitude!,
                            lng: selectedService.longitude!
                        }}
                        onCloseClick={() => setSelectedService(null)}
                    >
                        <div style={{ maxWidth: '200px', padding: '0.5rem' }}>
                            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-navy-blue)' }}>{selectedService.name}</h4>
                            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>{selectedService.category}</p>
                            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.8rem', color: '#666' }}>{selectedService.address}</p>
                            {selectedService.phone && <p style={{ margin: 0, fontSize: '0.8rem' }}>📞 {selectedService.phone}</p>}
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </LoadScript>
    );
};

export default MapComponent;

import React, { useEffect, useRef } from 'react';

const STORES = [
  { name: 'ShopApp Mumbai',    lat: 19.0760, lng: 72.8777 },
  { name: 'ShopApp Delhi',     lat: 28.6139, lng: 77.2090 },
  { name: 'ShopApp Bangalore', lat: 12.9716, lng: 77.5946 },
];

export default function StoreLocator() {
  const mapRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY';
    script.async = true;
    script.onload = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 20.5937, lng: 78.9629 },
        zoom: 5
      });
      STORES.forEach(store => {
        const marker = new window.google.maps.Marker({
          position: { lat: store.lat, lng: store.lng },
          map, title: store.name
        });
        marker.addListener('click', () => {
          new window.google.maps.InfoWindow({
            content: `<b>${store.name}</b>`
          }).open(map, marker);
        });
      });
    };
    document.head.appendChild(script);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Find Our Stores</h1>
      <div ref={mapRef} className="w-full h-96 rounded-xl shadow" />
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {STORES.map(s => (
          <div key={s.name} className="bg-white rounded-xl shadow p-4">
            <h3 className="font-semibold">{s.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
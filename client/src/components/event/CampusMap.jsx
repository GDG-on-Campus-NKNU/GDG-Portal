import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const CampusMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      // Initialize map if not already initialized
      if (!mapRef.current._leaflet_id) {
        // Create map centered on the NKNU campus
        const map = L.map(mapRef.current, {
          center: [22.78727903510654, 120.4067639424875], // Approximate coordinates for NKNU
          zoom: 18,
          scrollWheelZoom: false
        });

        // Add OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19
        }).addTo(map);

        // Custom icon for markers
        const greenIcon = new L.Icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        });

        // Add only the library marker
        const libraryMarker = L.marker([22.787007350133123, 120.40738855083502], { icon: greenIcon }).addTo(map);
        libraryMarker.bindPopup("<h4>圖書館</h4>").openPopup();

        // Add some buildings outlines (simplified from your original data)
        const libraryPolygon = L.polygon([
          [22.6526, 120.3118],
          [22.6528, 120.3122],
          [22.6522, 120.3124],
          [22.6520, 120.3120]
        ], { color: '#3388ff', fillOpacity: 0.2 }).addTo(map);
      }
    }

    // Cleanup function
    return () => {
      if (mapRef.current && mapRef.current._leaflet_id) {
        // No need to explicitly remove the map, React will handle DOM cleanup
      }
    };
  }, []);

  return (
    <div
      ref={mapRef}
      className="rounded-lg w-full aspect-video"
      style={{ height: '300px' }}
    ></div>
  );
};

export default CampusMap;

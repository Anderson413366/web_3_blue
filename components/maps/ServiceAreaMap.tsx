'use client'

import { MapContainer, TileLayer, Circle, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

// Fix Next.js/Leaflet icon issue
// This is necessary because Next.js doesn't handle Leaflet's default icon paths correctly
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  })
}

// West Springfield, MA (zip 01089) - center point
const centerPoint: [number, number] = [42.1015, -72.5898]

// 50 miles in meters (1 mile = 1609.34 meters)
const radiusInMeters = 50 * 1609.34 // 80,467 meters

// Major cities to mark on the map
const cities = [
  { name: 'West Springfield, MA', position: [42.1015, -72.5898] as [number, number] },
  { name: 'Springfield, MA', position: [42.1015, -72.5898] as [number, number] },
  { name: 'Hartford, CT', position: [41.7658, -72.6734] as [number, number] },
  { name: 'Worcester, MA', position: [42.2626, -71.8023] as [number, number] },
  { name: 'New Haven, CT', position: [41.3083, -72.9279] as [number, number] },
]

export default function ServiceAreaMap() {
  return (
    <div className="h-[500px] w-full rounded-xl overflow-hidden border-2 border-neutral-light-grey dark:border-slate-700">
      <MapContainer
        center={centerPoint}
        zoom={8}
        scrollWheelZoom={false}
        className="h-full w-full z-0"
        style={{ zIndex: 0 }}
      >
        {/* Map tiles - using OpenStreetMap (free) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 50-mile radius circle */}
        <Circle
          center={centerPoint}
          radius={radiusInMeters}
          pathOptions={{
            fillColor: '#00A57E', // brand-bright-blue
            fillOpacity: 0.15,
            color: '#00A57E',
            weight: 3,
          }}
        />

        {/* City markers */}
        {cities.map((city) => (
          <Marker key={city.name} position={city.position}>
            <Popup>
              <div className="text-sm font-semibold text-neutral-charcoal">{city.name}</div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

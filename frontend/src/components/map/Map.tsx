import { MapContainer, TileLayer } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import Pin from "@/components/pin/Pin";
import type { Post } from "@/types/post.types";


const DEFAULT_CENTER: LatLngExpression = [23.0225, 72.5714];

function Map({
  items,
  activePostId,
}: {
  items: Post[];
  activePostId?: string | null;
}) {
  const center: LatLngExpression =
    items.length > 0
      ? [Number(items[0].latitude), Number(items[0].longitude)]
      : DEFAULT_CENTER;

  return (
    <MapContainer
      center={center}
      zoom={7}
      scrollWheelZoom={false}
      className="w-full h-full"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {items.map((item) => (
        <Pin 
        key={item.id} 
        item={item}
        isActive={item.id === activePostId}
        />
      ))}
    </MapContainer>
  );
}

export default Map;

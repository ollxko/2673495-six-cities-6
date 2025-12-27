import { useRef, useEffect, useState } from 'react';
import { Icon, Marker, layerGroup, Map, TileLayer } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

const URL_MARKER_ACTIVE = '/img/pin-active.svg';

export type City = {
  lat: number;
  lng: number;
  zoom?: number;
};

export type Point = {
  id: number;
  lat: number;
  lng: number;
  title?: string;
};

export type Points = Point[];

type MapProps = {
  city: City;
  points: Points;
  selectedPoint: Point | undefined;
  hoveredPointId?: number | null;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const activeCustomIcon = new Icon({
  iconUrl: URL_MARKER_ACTIVE,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export default function MapComponent({
  city,
  points,
  selectedPoint,
  hoveredPointId,
}: MapProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: city.lat,
          lng: city.lng,
        },
        zoom: city.zoom || 10,
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        }
      );

      instance.addLayer(layer);
      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [city]);

  useEffect(() => {
    if (map) {
      map.setView([city.lat, city.lng], city.zoom || 10);
    }
  }, [map, city]);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.lat,
          lng: point.lng,
        });

        let icon = defaultCustomIcon;
        if (selectedPoint !== undefined && point.id === selectedPoint.id) {
          icon = currentCustomIcon;
        } else if (
          hoveredPointId !== undefined &&
          hoveredPointId !== null &&
          point.id === hoveredPointId
        ) {
          icon = activeCustomIcon;
        }

        marker.setIcon(icon).addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPoint, hoveredPointId]);

  return <div style={{ height: '500px' }} ref={mapRef}></div>;
}

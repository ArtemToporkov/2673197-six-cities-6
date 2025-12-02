import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { ReactNode } from 'react';

import { useMap } from '../../hooks/use-map';
import type { City } from '../../types/city';
import type { Point } from '../../types/point.ts';

type MapProps = {
  city: City | null;
  points: Point[];
  selectedPoint: Point | null;
};

const customMarkerOptions = {
  iconSize: [40, 40] as [number, number],
  iconAnchor: [20, 40] as [number, number]
};

const defaultCustomMarker = new Icon({
  ...customMarkerOptions,
  iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg'
});

const currentCustomMarker = new Icon({
  ...customMarkerOptions,
  iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg',
});

export function Map({city, points, selectedPoint}: MapProps): ReactNode {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude
        });

        marker
          .setIcon(
            selectedPoint && point.key === selectedPoint.key
              ? currentCustomMarker
              : defaultCustomMarker
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPoint]);

  return <div style={{height: '500px'}} ref={mapRef}></div>;
}

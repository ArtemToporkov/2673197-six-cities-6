import { render, screen } from '@testing-library/react';

import { Map } from './map.tsx';
import { makeCity } from '../../utils/mocks.ts';

vi.mock('leaflet', () => {
  const mockMap = {
    setView: vi.fn(),
    remove: vi.fn(),
    addLayer: vi.fn(),
    removeLayer: vi.fn(),
  };
  const mockLayer = {
    addTo: vi.fn(),
  };
  return {
    Map: vi.fn(() => mockMap),
    TileLayer: vi.fn(() => mockLayer),
    Icon: vi.fn(),
    Marker: vi.fn(() => ({
      setIcon: vi.fn(() => ({
        addTo: vi.fn(),
      })),
    })),
    layerGroup: vi.fn(() => mockLayer),
  };
});

describe('Component: Map', () => {
  it('should render map container', () => {
    const city = makeCity();
    const testId = 'map';

    render(<Map city={city} points={[]} selectedPoint={null} />);

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
});

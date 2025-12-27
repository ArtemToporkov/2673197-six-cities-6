import { render, screen } from '@testing-library/react';
import { image } from 'faker';

import { OfferGallery } from './offer-gallery.tsx';

describe('Component: OfferGallery', () => {
  it('should render correct number of images', () => {
    const imagesCount = 6;
    const images = Array.from({ length: imagesCount }, () => image.imageUrl());

    render(<OfferGallery images={images} />);

    const imageElements = screen.getAllByAltText(/Photo studio/i);
    expect(imageElements.length).toBe(imagesCount);
  });
});

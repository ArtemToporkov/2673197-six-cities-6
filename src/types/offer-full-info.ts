import type { OfferPreviewInfo } from './offer-preview-info.ts';
import type { Url } from './url.ts';
import type { HostInfo } from './host-info.ts';
import { Good } from '../enums/good.ts';

export type OfferFullInfo = Omit<OfferPreviewInfo, 'previewImage'> & {
  description: string;
  bedrooms: number;
  goods: Good[];
  host: HostInfo;
  images: Url[];
  maxAdults: number;
};

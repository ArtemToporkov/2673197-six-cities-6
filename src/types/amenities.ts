import { Amenity } from '../enums/amenity.ts';

export type Amenities = Partial<Record<Amenity, boolean>>;

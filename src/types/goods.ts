import type { Good } from '../enums/good.ts';

export type Goods = Partial<Record<Good, boolean>>;

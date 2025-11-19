import type { Url } from './url.ts';
import type { HostStatus } from '../enums/host-status.ts';

export type HostInfo = {
  avatarUrl: Url;
  name: string;
  status: HostStatus;
};

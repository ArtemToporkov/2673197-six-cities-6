import { Url } from './url.ts';
import { HostStatus } from '../enums/host-status.ts';

export type HostInfo = {
  avatarUrl: Url;
  name: string;
  status: HostStatus;
};

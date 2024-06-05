export type Source = {
  name: string;
  date?: Date;
};

export type SearchResult = {
  email: string;
  password: string;
  username: string;
  full_name: string;
  ip_address: string;
  phone_number: string;
  hash: string;
  source: Source;
};

export type SearchResponse = {
  databases: number;
  results: SearchResult[];
  first_seen: string;
  last_seen: string;
};

export type SearchField =
  | "email"
  | "username"
  | "full_name"
  | "password"
  | "ip_address"
  | "phone_number"
  | "domain"
  | "hash";

export type SearchFilter = "use" | "ignore";

export type SearchFilterOptions = {
  type: SearchFilter;
  databases: string[];
};

export type SearchPaginationOptions = {
  offset: number;
  limit: number;
};

export type SearchOptions = {
  field: SearchField;
  query: string;
  filter?: SearchFilterOptions;
  pagination?: SearchPaginationOptions;
};

export type CheckOptions = {
  field: SearchField;
  query: string;
};

export type CheckResponse = {
  found: boolean;
};

export enum MonitorStatus {
  Running = 0,
  Paused,
  Expired,
}

export type AssetMonitor = {
  id: string;
  status: MonitorStatus;
  type: SearchField;
  asset: string;
  notification_email: string;
  expires_soon: boolean;
  created_at: Date;
  ends_at: Date;
};

export type DomainMonitor = {
  id: string;
  status: MonitorStatus;
  domain: string;
  notification_email: string;
  expires_soon: boolean;
  created_at: Date;
  ends_at: Date;
};

export type GetMonitorsResponse = {
  asset_monitors: AssetMonitor[];
  domain_monitors: DomainMonitor[];
};

export type UpdateAssetMonitorParams = {
  asset_type: SearchField;
  asset: string;
  notification_email: string;
};

export type UpdateDomainMonitorParams = {
  domain: string;
  notification_email: string;
};

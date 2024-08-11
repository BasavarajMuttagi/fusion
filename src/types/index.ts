export type CloudinaryResource = {
  asset_id: string;
  public_id: string;
  format: string;
  version: number;
  resource_type: string;
  type: string;
  created_at: string;
  bytes: number;
  width: number;
  height: number;
  asset_folder: string;
  display_name: string;
  url: string;
  secure_url: string;
};

export type CloudinaryResponse = {
  resources: CloudinaryResource[];
  next_cursor: string;
  rate_limit_allowed: number;
  rate_limit_reset_at: string;
  rate_limit_remaining: number;
};

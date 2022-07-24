export interface Recurring {
  aggregate_usage?: any;
  interval: string;
  interval_count: number;
  usage_type: string;
}

export interface PriceResponseDto {
  id: string;
  object: string;
  active: boolean;
  billing_scheme: string;
  created: number;
  currency: string;
  custom_unit_amount?: any;
  livemode: boolean;
  lookup_key: string;
  metadata: any;
  nickname?: any;
  product: string;
  recurring: Recurring;
  tax_behavior: string;
  tiers_mode?: any;
  transform_quantity?: any;
  type: string;
  unit_amount: number;
  unit_amount_decimal: string;
}

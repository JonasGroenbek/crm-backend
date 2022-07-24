export interface Recurring {
  aggregate_usage?: any;
  interval: string;
  interval_count: number;
  usage_type: string;
}

//has additional parameters, look into tiers https://stripe.com/docs/api/prices/create
export interface CreatePriceRequestDto {
  currency: string;
  nickname: string;
  product: string;
  recurring?: Recurring;
  type: string;
  unit_amount: number;
}

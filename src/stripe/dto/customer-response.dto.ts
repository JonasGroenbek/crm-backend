export interface InvoiceSettings {
  custom_fields?: any;
  default_payment_method?: any;
  footer?: any;
  rendering_options?: any;
}

export interface Address {
  city: string;
  country: string;
  lin1: string;
  lin2: string;
  postal_code: string;
  state: string;
}

export interface CustomerResponseDto {
  id: string;
  object: string;
  address?: Address;
  balance: number;
  created: number;
  currency: string;
  default_currency: string;
  default_source?: any;
  delinquent: boolean;
  description?: any;
  discount?: any;
  email?: any;
  invoice_prefix: string;
  invoice_settings: InvoiceSettings;
  livemode: boolean;
  metadata: any;
  //The customer’s full name or business name.
  name?: any;
  phone?: any;
  preferred_locales: any[];
  shipping?: any;
  tax_exempt: string;
  test_clock?: any;
}

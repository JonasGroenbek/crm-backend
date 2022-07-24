export interface AutomaticTax {
  enabled: boolean;
  status?: any;
}

export interface PhoneNumberCollection {
  enabled: boolean;
}

export interface SessionResponseDto {
  id: string;
  object: string;
  after_expiration?: any;
  allow_promotion_codes?: any;
  amount_subtotal?: any;
  amount_total?: any;
  automatic_tax: AutomaticTax;
  billing_address_collection?: any;
  cancel_url: string;
  client_reference_id?: any;
  consent?: any;
  consent_collection?: any;
  currency?: any;
  customer?: any;
  customer_creation?: any;
  customer_details?: any;
  customer_email?: any;
  expires_at: number;
  livemode: boolean;
  locale?: any;
  metadata: any;
  mode: string;
  payment_intent: string;
  payment_link?: any;
  payment_method_options: any;
  payment_method_types: string[];
  payment_status: string;
  phone_number_collection: PhoneNumberCollection;
  recovered_from?: any;
  setup_intent?: any;
  shipping?: any;
  shipping_address_collection?: any;
  shipping_options: any[];
  shipping_rate?: any;
  status: string;
  submit_type?: any;
  subscription?: any;
  success_url: string;
  total_details?: any;
  url?: any;
}

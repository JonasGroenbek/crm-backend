export interface LineItem {
  //The ID of the Price or Plan object. One of price or price_data is required.
  price: string;
  //The quantity of the line item being purchased. Quantity should not be defined when recurring.usage_type=metered.
  quantity: number;
}

//https://stripe.com/docs/api/checkout/sessions/create?lang=node
export interface CreateSessionRequestDto {
  //The URL the customer will be directed to if they decide to cancel payment and return to your website.
  cancel_url: string;

  //The mode of the Checkout Session. Required when using prices or setup mode.
  //Pass subscription if the Checkout Session includes at least one recurring item
  mode: 'payment' | 'setup' | 'subscription';

  //The URL to which Stripe should send customers when payment or setup is complete.
  //If you’d like to use information from the successful Checkout Session on your page,
  //read the guide on https://stripe.com/docs/payments/checkout/custom-success-page
  success_url: string;

  //A unique string to reference the Checkout Session. This can be a customer ID, a cart ID,
  //or similar, and can be used to reconcile the session with your internal systems.
  client_reference_id?: string;

  //ID of an existing Customer, if one exists. In payment mode,
  //the customer’s most recent card payment method will be used to prefill the
  //email, name, card details, and billing address on the Checkout page. In subscription mode,
  //the customer’s default payment method will be used if it’s a card,
  //and otherwise the most recent card will be used. A valid billing address,
  //billing name and billing email are required
  //on the payment method for Checkout to prefill the customer’s card details.

  //If the Customer already has a valid email set, the email will be prefilled and not editable in Checkout.
  //If the Customer does not have a valid email,
  //Checkout will set the email entered during the session on the Customer.

  //If blank for Checkout Sessions in payment or subscription mode,
  //Checkout will create a new Customer object based on information provided during the payment flow.

  //You can set payment_intent_data.setup_future_usage to have Checkout automatically
  //attach the payment method to the Customer you pass in for future reuse.
  customer?: string;

  //A list of items the customer is purchasing. Use this parameter to pass one-time or recurring Prices.
  //For payment mode, there is a maximum of 100 line items, however it is recommended to consolidate line
  //items if there are more than a few dozen.

  //For subscription mode, there is a maximum of 20 line items with recurring Prices and 20 line items
  //with one-time Prices. Line items with one-time Prices in will be on the initial invoice only.
  line_items: LineItem[];
}

export interface SourceTypes {
  card: number;
}

export interface Available {
  amount: number;
  currency: string;
  source_types: SourceTypes;
}

export interface SourceTypes2 {
  card: number;
}

export interface Pending {
  amount: number;
  currency: string;
  source_types: SourceTypes2;
}

export interface BalanceResponseDto {
  object: string;
  available: Available[];
  livemode: boolean;
  pending: Pending[];
}

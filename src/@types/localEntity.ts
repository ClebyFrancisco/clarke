export interface Supplier {
  id: number;
  kwh_cost: number;
  logo: string | null;
  min_kwh_limit: number;
  name: string;
  rating: null;
  state: string;
  total_customers: number;
}

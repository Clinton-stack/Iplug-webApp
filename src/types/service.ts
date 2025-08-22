export interface ServiceItem {
  id: string | number;
  title: string;
  image: string;
  provider?: string;
  postedBy?: string;
  category?: string;
  subcategory?: string;
  rating: number;
  reviews?: number;
  pricePerTask?: number;
  price?: number;
  pricePerHour?: number;
  budget?: string;
  deliveryTime?: number;
  avgDeliveryTime?: number;
  deliveries?: number;
  languages?: string[];
  location?: string;
  availability?: string;
  createdAt?: string;
}

export interface FilterState {
  searchTerm: string;
  minPrice: string;
  maxPrice: string;
  minRating: string;
  sortBy: string;
  category: string;
  maxDeliveryTime: string;
}

export interface Filters {
  searchTerm?: string;
  minPrice?: string | number;
  maxPrice?: string | number;
  minRating: number;
  maxDeliveryTime?: string | number;
  sortBy?: string;
}

export type Role = "requester" | "provider";

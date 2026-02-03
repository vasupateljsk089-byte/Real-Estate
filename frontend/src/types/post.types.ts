export type PostType = "buy" | "rent" | "all";

export type PropertyType =
  | "apartment"
  | "house"
  | "villa"
  | "plot";

export interface Filters {
  city?: string;
  type?: PostType;
  property?: PropertyType;
  bedroom?: number;
  minPrice?: number;
  maxPrice?: number;
}

export type Search = Omit<Filters, "city"> & {
  search?: string;
};

export interface Post {
  id: string;
  title: string;
  price: number;

  images: string[];

  address: string;
  city: string;

  bedroom: number;
  bathroom: number;

  latitude: number;   // backend sends string
  longitude: number;  // backend sends string

  type: PostType;
  property: PropertyType;

  createdAt: string;  // ISO date string
}

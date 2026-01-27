export type PostType = "buy" | "rent";

export type PropertyType =
  | "apartment"
  | "house"
  | "villa"
  | "plot";

export interface PostQueryParams {
  city?: string;
  type?: PostType;
  property?: PropertyType;
  bedroom?: number;
  minPrice?: number;
  maxPrice?: number;
}

export interface Post {
  id: string;
  title: string;
  price: number;

  images: string[];

  address: string;
  city: string;

  bedroom: number;
  bathroom: number;

  latitude: string;   // backend sends string
  longitude: string;  // backend sends string

  type: PostType;
  property: PropertyType;

  createdAt: string;  // ISO date string
}

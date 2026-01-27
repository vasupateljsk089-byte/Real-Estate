type PostType = 'rent' | 'buy';
type PropertyType = "apartment" | "house" | "condo" | "land";

export interface PostQueryParams {
  city?: string;
  type?: PostType;
  property?: PropertyType;
  bedroom?: string;
  minPrice?: string;
  maxPrice?: string;
}

export interface CreatePostPayload {
  postData: {
    title: string;
    price: number;
    images: string[];
    address: string;
    city: string;
    bedroom: number;
    bathroom: number;
    latitude: string;
    longitude: string;
    type: PostType;
    property: PropertyType;
  };
  postDetails: {
    desc: string;
    utilities: string;
    pet: string;
    income: string;
    size: number;
    school: number;
    bus: number;
    restaurant: number;
  };
}



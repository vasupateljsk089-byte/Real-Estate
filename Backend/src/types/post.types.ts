export interface PostQueryParams {
  city?: string;
  type?: string;
  property?: string;
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
    type: "buy" | "rent";
    property: "apartment" | "house" | "condo" | "land";
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


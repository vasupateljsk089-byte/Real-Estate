import type { PostType, PropertyType } from "./post.types";

export type Search = {
  search?: string;
  type?: PostType | "all";
  property?: PropertyType | "all";
  bedroom?: number | "all";
  minPrice?: number;
  maxPrice?: number;
};

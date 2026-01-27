import { z } from "zod";

export const postSearchSchema = z
  .object({
    type: z.enum(["buy", "rent"]),

    city: z
    .string()
    .min(3, "City must be at least 3 characters")
    .max(50, "City must be less than 50 characters")
    .optional(),


    minPrice: z
      .number()
      .min(0,"Min price must be positive")
      .max(10_000_000)
      .optional(),

    maxPrice: z
      .number()
      .min(0,"Max price must be positive")
      .max(10_000_000)
      .optional(),
  })
  .refine(
    (data) =>
      data.minPrice === undefined ||
      data.maxPrice === undefined ||
      data.minPrice <= data.maxPrice,
    {
      message: "Min price cannot be greater than max price",
      path: ["minPrice"],
    }
  );

export type PostSearchForm = z.infer<typeof postSearchSchema>;

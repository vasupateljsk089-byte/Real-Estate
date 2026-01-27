import { apiConnector } from "@/api/axios";
import type { ApiResponse } from "@/types/api.types";
import type { Post, PostQueryParams } from "@/types/post.types";
import { POST_ENDPOINTS } from "@/api/endpoints";


export const getAllPosts = async (params: PostQueryParams) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      query.append(key, String(value));
    }
  });

  return apiConnector<ApiResponse<Post[]>>(
    "GET",
    `${POST_ENDPOINTS.GET_ALL_POSTS}?${query.toString()}`
  );
};


  
  /* 🔹 Get single post */
  export const getPostById = async (id: string) => {
    return apiConnector<ApiResponse<Post>>(
      "GET",
      POST_ENDPOINTS.GET_POST_BY_ID(id)
    );
  };
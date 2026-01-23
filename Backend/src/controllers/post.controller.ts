import { Request, Response } from "express";
import prisma from "@lib/prisma";
import { ApiResponse, PostQueryParams, CreatePostPayload } from "@types";
import { MESSAGES } from "@constants/messages";
import { Type, Property } from "@prisma/client";

export const getPosts = async (
  req: Request<{}, {}, {}, PostQueryParams>,
  res: Response<ApiResponse>
): Promise<Response<ApiResponse>> => {
  try {
    const {
      city,
      type,
      property,
      bedroom,
      minPrice,
      maxPrice,
    } = req.query;

    const posts = await prisma.post.findMany({
      where: {
        city: city || undefined,
        type: type ? (type as Type) : undefined,
        property: property ? (property as Property) : undefined,
        bedroom: bedroom ? parseInt(bedroom) : undefined,
        price: {
          gte: minPrice ? parseFloat(minPrice) : 0,
          lte: maxPrice ? parseFloat(maxPrice) : 100000000,
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: MESSAGES.POST.FETCH_ALL_SUCCESS,
      data: posts,
    });
  } catch (error) {
    console.error("Get posts error:", error);
    return res.status(500).json({
      success: false,
      message: MESSAGES.POST.FETCH_ALL_FAILED,
    });
  }
};

export const getPost = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse>
): Promise<Response<ApiResponse>> => {
  const postId = req.params.id;
  const userId = req.userId;

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            profileImage: true,
          },
        },
      },
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: MESSAGES.POST.NOT_FOUND,
      });
    }

    let isSaved = false;

    if (userId) {
      const saved = await prisma.savedPost.findUnique({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });

      isSaved = Boolean(saved);
    }

    return res.status(200).json({
      success: true,
      message: MESSAGES.POST.FETCH_ONE_SUCCESS,
      data: {
        ...post,
        isSaved,
      },
    });
  } catch (error) {
    console.error("Get post error:", error);
    return res.status(500).json({
      success: false,
      message: MESSAGES.POST.FETCH_ONE_FAILED,
    });
  }
};

export const addPost = async (
  req: Request<{}, {}, CreatePostPayload>,
  res: Response<ApiResponse>
): Promise<Response<ApiResponse>> => {
  const userId = req.userId;

  if (!userId) {
    return res.status(403).json({
      success: false,
      message: MESSAGES.POST.NOT_AUTHORIZED,
      code: "NOT_AUTHORIZED",
    });
  }

  const { postData, postDetails } = req.body;

  try {
    const newPost = await prisma.post.create({
      data: {
        ...postData,
        type: postData.type as Type,
        property: postData.property as Property,
        userId,
        postDetail: {
          create: postDetails,
        },
      },
    });

    return res.status(201).json({
      success: true,
      message: MESSAGES.POST.CREATE_SUCCESS,
      data: newPost,
    });
  } catch (error) {
    console.error("Add post error:", error);
    return res.status(500).json({
      success: false,
      message: MESSAGES.POST.CREATE_FAILED,
    });
  }
};

export const updatePost = async (
  req: Request<{ id: string }, {}, Partial<CreatePostPayload["postData"]>>,
  res: Response<ApiResponse>
): Promise<Response<ApiResponse>> => {
  const postId = req.params.id;
  const userId = req.userId;

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: MESSAGES.POST.NOT_FOUND,
      });
    }

    if (post.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: MESSAGES.POST.NOT_AUTHORIZED,
        code: "NOT_AUTHORIZED",
      });
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: req.body,
    });

    return res.status(200).json({
      success: true,
      message: MESSAGES.POST.UPDATE_SUCCESS,
      data: updatedPost,
    });
  } catch (error) {
    console.error("Update post error:", error);
    return res.status(500).json({
      success: false,
      message: MESSAGES.POST.UPDATE_FAILED,
    });
  }
};

export const deletePost = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse>
): Promise<Response<ApiResponse>> => {
  const postId = req.params.id;
  const userId = req.userId;

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: MESSAGES.POST.NOT_FOUND,
      });
    }

    if (post.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: MESSAGES.POST.NOT_AUTHORIZED,
        code: "NOT_AUTHORIZED",
      });
    }

    await prisma.post.delete({
      where: { id: postId },
    });

    return res.status(200).json({
      success: true,
      message: MESSAGES.POST.DELETE_SUCCESS,
    });
  } catch (error) {
    console.error("Delete post error:", error);
    return res.status(500).json({
      success: false,
      message: MESSAGES.POST.DELETE_FAILED,
    });
  }
};

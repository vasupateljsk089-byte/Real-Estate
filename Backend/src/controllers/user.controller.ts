import { Request, Response } from "express";
import prisma from "@lib/prisma";

import { ApiResponse, SavePostPayload ,UpdateProfilePayload } from "@types";
import { MESSAGES } from "@constants/messages";
import {uploadToCloudinary} from "@utils/uploadToCloudinary";

export const getUsers = async (
  _req: Request,
  res: Response<ApiResponse>
): Promise<Response<ApiResponse>> => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        avtar: true,
        createdAt: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: MESSAGES.USER.FETCH_ALL_SUCCESS,
      data: users,
    });
  } catch (error) {
    console.error("Get users error:", error);
    return res.status(500).json({
      success: false,
      message: MESSAGES.USER.FETCH_ALL_FAILED,
    });
  }
};

// export const updateUser = async (
//   req: Request<{ id: string }, {}, UpdateUserPayload>,
//   res: Response<ApiResponse>
// ): Promise<Response<ApiResponse>> => {
//   const id = req.params.id;
//   const tokenUserId = req.userId;

//   if (id !== tokenUserId) {
//     return res.status(403).json({
//       success: false,
//       message: MESSAGES.USER.NOT_AUTHORIZED,
//       code: "NOT_AUTHORIZED",
//     });
//   }

//   const {avtar, ...inputs } = req.body;

//   try {

//     const updatedUser = await prisma.user.update({
//       where: { id },
//       data: {
//         ...inputs,
//         ...(avtar && { avtar }),
//       },
//     });

//     const { password: _, ...safeUser } = updatedUser;

//     return res.status(200).json({
//       success: true,
//       message: MESSAGES.USER.UPDATE_SUCCESS,
//       data: safeUser,
//     });
//   } catch (error) {
//     console.error("Update user error:", error);
//     return res.status(500).json({
//       success: false,
//       message: MESSAGES.USER.UPDATE_FAILED,
//     });
//   }
// };

export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse>
): Promise<Response<ApiResponse>> => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  if (id !== tokenUserId) {
    return res.status(403).json({
      success: false,
      message: MESSAGES.USER.NOT_AUTHORIZED,
      code: "NOT_AUTHORIZED",
    });
  }

  try {
    await prisma.user.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: MESSAGES.USER.DELETE_SUCCESS,
    });
  } catch (error) {
    console.error("Delete user error:", error);
    return res.status(500).json({
      success: false,
      message: MESSAGES.USER.DELETE_FAILED,
    });
  }
};


export const savePost = async (
  req: Request<{}, {}, SavePostPayload>,
  res: Response<ApiResponse>
): Promise<Response<ApiResponse>> => {
  const { postId } = req.body;
  const userId = req.userId!;

  try {
    const savedPost = await prisma.savedPost.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (savedPost) {
      await prisma.savedPost.delete({
        where: { id: savedPost.id },
      });

      return res.status(200).json({
        success: true,
        message: MESSAGES.USER.POST_UNSAVED,
      });
    }

    await prisma.savedPost.create({
      data: {
        userId,
        postId,
      },
    });

    return res.status(200).json({
      success: true,
      message: MESSAGES.USER.POST_SAVED,
    });
  } catch (error) {
    console.error("Save post error:", error);
    return res.status(500).json({
      success: false,
      message: MESSAGES.USER.POST_SAVE_FAILED,
    });
  }
};

export const profilePosts = async (
  req: Request,
  res: Response<ApiResponse>
): Promise<Response<ApiResponse>> => {
  const userId = req.userId!;

  try {
    const userPosts = await prisma.post.findMany({
      where: { userId },
    });

    const saved = await prisma.savedPost.findMany({
      where: { userId },
      include: { post: true },
    });

    const savedPosts = saved.map((item : any) => item.post);

    return res.status(200).json({
      success: true,
      message: MESSAGES.USER.PROFILE_POSTS_SUCCESS,
      data: {
        userPosts,
        savedPosts,
      },
    });
  } catch (error) {
    console.error("Profile posts error:", error);
    return res.status(500).json({
      success: false,
      message: MESSAGES.USER.PROFILE_POSTS_FAILED,
    });
  }
};

export const updateProfile = async (
  req: Request<{}, {}, UpdateProfilePayload>,
  res: Response
) => {
  try {
    const userId = req.userId; // from auth middleware

    const { username, phone, gender, city } =
      req.body;

    const updateData: UpdateProfilePayload = {
      username,
      phone,
      gender,
      city,
    };

    console.log("Update Data before cleaning:", updateData);
    // 🖼 Avatar upload
    if (req.file) {
      const avatarUrl = await uploadToCloudinary(
        req.file.buffer,
        "avtars"
      );
      console.log("Uploaded Avatar URL:", avatarUrl);
      updateData.avatar = avatarUrl;
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        username: true,
        email: true,
        avtar: true,
        phone: true,
        gender: true,
        city: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};
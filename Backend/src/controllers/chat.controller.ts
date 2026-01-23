import { Request, Response } from "express";
import prisma from "@lib/prisma";

import { ApiResponse, CreateChatPayload } from "@types";
import { MESSAGES } from "@constants/messages";

export const getChats = async (
  req: Request,
  res: Response<ApiResponse>
): Promise<Response<ApiResponse>> => {
  const userId = req.userId!;

  try {
    const chats = await prisma.chat.findMany({
      where: {
        userIds: {
          hasSome: [userId],
        },
      },
    });

    // attach receiver info (optimized with Promise.all)
    const chatsWithReceiver = await Promise.all(
      chats.map(async (chat) => {
        const receiverId = chat.userIds.find((id) => id !== userId);

        const receiver = receiverId
          ? await prisma.user.findUnique({
              where: { id: receiverId },
              select: {
                id: true,
                username: true,
                profileImage: true,
              },
            })
          : null;

        return { ...chat, receiver };
      })
    );

    return res.status(200).json({
      success: true,
      message: MESSAGES.CHAT.FETCH_ALL_SUCCESS,
      data: chatsWithReceiver,
    });
  } catch (error) {
    console.error("Get chats error:", error);
    return res.status(500).json({
      success: false,
      message: MESSAGES.CHAT.FETCH_ALL_FAILED,
    });
  }
};

export const getChat = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse>
): Promise<Response<ApiResponse>> => {
  const userId = req.userId!;
  const chatId = req.params.id;

  try {
    const chat = await prisma.chat.findFirst({
      where: {
        id: chatId,
        userIds: {
          hasSome: [userId],
        },
      },
      include: {
        message: {
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: MESSAGES.CHAT.NOT_FOUND,
      });
    }

    await prisma.chat.update({
      where: { id: chatId },
      data: {
        seenBy: { push: userId },
      },
    });

    return res.status(200).json({
      success: true,
      message: MESSAGES.CHAT.FETCH_ONE_SUCCESS,
      data: chat,
    });
  } catch (error) {
    console.error("Get chat error:", error);
    return res.status(500).json({
      success: false,
      message: MESSAGES.CHAT.FETCH_ONE_FAILED,
    });
  }
};

export const addChat = async (
  req: Request<{}, {}, CreateChatPayload>,
  res: Response<ApiResponse>
): Promise<Response<ApiResponse>> => {
  const userId = req.userId!;
  const { receiverId } = req.body;

  try {
    const newChat = await prisma.chat.create({
      data: {
        userIds: [userId, receiverId],
      },
    });

    return res.status(201).json({
      success: true,
      message: MESSAGES.CHAT.CREATE_SUCCESS,
      data: newChat,
    });
  } catch (error) {
    console.error("Add chat error:", error);
    return res.status(500).json({
      success: false,
      message: MESSAGES.CHAT.CREATE_FAILED,
    });
  }
};

export const readChat = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse>
): Promise<Response<ApiResponse>> => {
  const userId = req.userId!;
  const chatId = req.params.id;

  try {
    const chat = await prisma.chat.findFirst({
      where: {
        id: chatId,
        userIds: {
          hasSome: [userId],
        },
      },
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: MESSAGES.CHAT.NOT_FOUND,
      });
    }

    const updatedChat = await prisma.chat.update({
      where: { id: chatId },
      data: {
        seenBy: {
          set: [userId],
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: MESSAGES.CHAT.READ_SUCCESS,
      data: updatedChat,
    });
  } catch (error) {
    console.error("Read chat error:", error);
    return res.status(500).json({
      success: false,
      message: MESSAGES.CHAT.READ_FAILED,
    });
  }
};

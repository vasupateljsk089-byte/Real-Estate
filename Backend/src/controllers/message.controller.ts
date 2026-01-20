import { Request, Response } from "express";
import prisma from "@lib/prisma";

import { ApiResponse, AddMessagePayload } from "@types";
import { MESSAGES } from "@constants/messages";

export const addMessage = async (
  req: Request<{ chatId: string }, {}, AddMessagePayload>,
  res: Response<ApiResponse>
): Promise<Response<ApiResponse>> => {
  const userId = req.userId!;
  const chatId = req.params.chatId;
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({
      success: false,
      message: MESSAGES.MESSAGE.TEXT_REQUIRED,
    });
  }

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

    const message = await prisma.message.create({
      data: {
        text,
        chatId,
        userId, // sender
      },
    });

    await prisma.chat.update({
      where: { id: chatId },
      data: {
        seenBy: [userId],
        lastmessage: text,
      },
    });

    return res.status(201).json({
      success: true,
      message: MESSAGES.MESSAGE.SEND_SUCCESS,
      data: message,
    });
  } catch (error) {
    console.error("Add message error:", error);
    return res.status(500).json({
      success: false,
      message: MESSAGES.MESSAGE.SEND_FAILED,
    });
  }
};

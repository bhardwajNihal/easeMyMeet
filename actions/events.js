"use server"

import { DbClient } from "@/db/prismaClient";
import { eventSchema } from "@/zodSchemas/eventSchema";
import { auth } from "@clerk/nextjs/server";

export async function createEvent(data) {
  try {
    const { userId } = await auth();
  
    if (!userId) {
      throw new Error("Unauthorized");
    }
  
    const validatedData = eventSchema.parse(data);
  
    const foundUser = await DbClient.User.findUnique({
      where: { clerkUserId: userId },
    });
  
    if (!foundUser) {
      throw new Error("User not found");
    }
  
    const createdEvent = await DbClient.Event.create({
      data: {
        ...validatedData,
        userId: foundUser.id,
      },
    });
  
    return createdEvent;
  } catch (error) {
    throw error;
  }
}
"use server"

import { DbClient } from "@/db/prismaClient";
import { eventSchema } from "@/zodSchemas/eventSchema";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

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
  
    revalidatePath("/events");
    return createdEvent;
  } catch (error) {
    throw error;
  }
}


export async function getAllEvents() {
  
  try {
    const { userId } = await auth();
    
      if (!userId) {
        throw new Error("Unauthorized");
      }
  
      const foundUser = await DbClient.User.findUnique({
        where: { clerkUserId: userId },
      });
    
      if (!foundUser) {
        throw new Error("User not found");
      }
  
      // find event for the user and return
      const events = await DbClient.Event.findMany({
        where : {
          userId : foundUser.id
        },
        orderBy : {
          createdAt : "desc"
        },
        include : {
          _count : {    // each event have bookings, so here to return the count of the bookings for that particular event
           select : {bookings : true}
          }
        }
      })
  
      return {events, username : foundUser.username} // the username is to be utilized the share link
  } catch (error) {
    throw error;
  }
}


export async function deleteEvent(eventId) {
  
  try {
    const { userId } = await auth();
  
    if (!userId) {
      throw new Error("Unauthorized");
    }
  
    const foundUser = await DbClient.User.findUnique({
      where: { clerkUserId: userId },
    });
  
    if (!foundUser) {
      throw new Error("User not found");
    }
  
  
    const foundEvent = await DbClient.Event.findUnique({
      where : {
        id : eventId, 
        userId : foundUser.id
      }
    })
  
    if(!foundEvent){
      throw new Error("Event not found!")
    }
  
    await DbClient.Event.delete({
      where : {
        id : foundEvent.id
      }
    })
  
    revalidatePath("/events")
    return {success : true}
  } catch (error) {
    throw error;
  }

}

export async function getEventDetails(username, eventId){

  const foundEvent = await DbClient.Event.findFirst({
    where : {
      id : eventId,
      user : {
        username : username
      }
    },
    include : {
      user : {
        select : {
          name : true,
          email : true,
          imageUrl : true
        }
      }
    }
  }) 

  return foundEvent;
}
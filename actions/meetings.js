import { DbClient } from "@/db/prismaClient";
import { auth } from "@clerk/nextjs/server";

export async function getMeetings(type="upcoming") {
    
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
    
        const now = new Date();
        const meetings = await DbClient.Booking.findMany({
            where : {
                userId : foundUser.id,
                startTime : type==="upcoming" ? {gte : now} : {lt : now}
            },
            include : {
                event : true, 
                user : {
                    select : {
                        name : true,
                        email : true
                    }
                }
            },
            orderBy : {
                startTime : type==="upcoming" ? "asc" : "desc",
            }
        })
    
        return meetings;
    } catch (error) {
        throw error;
    }

}
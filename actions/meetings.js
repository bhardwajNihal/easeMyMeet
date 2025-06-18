
"use server"
import { DbClient } from "@/db/prismaClient";
import clerkClient from "@clerk/clerk-sdk-node";
import { auth } from "@clerk/nextjs/server";
import { google } from "googleapis";

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


export async function cancelMeeting(meetingId) {
    
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
    
        const foundMeeting = await DbClient.Booking.findUnique({
            where : {id : meetingId},
        })
    
        if(!foundMeeting && foundMeeting.userId !== userId){
            throw new Error("Authorized meeting not found!");
        }
    
    
        // get oauth access token
        const data = await clerkClient.users.getUserOauthAccessToken(foundUser.clerkUserId, "oauth_google");
        const token = data[0]?.token;
    
        // get access to the google oauth client
        const oauth2client = new google.auth.OAuth2();
        oauth2client.setCredentials({access_token : token});
    
        // get access to the google calendar using oauth client
        const calendar = google.calendar({version : "v3", auth : oauth2client})
    
    
        // delete the calendar entry
        await calendar.events.delete({
            calendarId : "primary",
            eventId : foundMeeting.googleEventId
        })
    
        // finally delete the db entry 
        await DbClient.Booking.delete({
            where : {
                id : foundMeeting.id
            }
        })
    
        return {success : true};
    } catch (error) {
        throw error;
    }

}
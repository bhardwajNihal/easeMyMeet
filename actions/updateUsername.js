"use server"

import { DbClient } from "@/db/prismaClient";
import { auth } from "@clerk/nextjs/server"
import clerkClient from "@clerk/clerk-sdk-node";    // clerk client imported from here enables to manipulate clerk entries

export async function updateUsername(username) {
    
    try {
        const {userId} = await auth()
        if(!userId){
            throw new Error("Unauthorized request!");
        }
    
        //check if the username already taken
        const existingUsername = await DbClient.User.findUnique({
            where : {
                username
            }
        })
    
        // if username found, but does not belong the requesting user, mean its taken by someone else
        if(existingUsername && existingUsername.id !== userId){
            throw new Error("username already taken!")
        }
    
        // update db entry
        await DbClient.User.update({
            where : {clerkUserId : userId},
            data : {username}
        })
    
        // update clerk entry
        await clerkClient.users.updateUser(userId,{username});
    
        return { success : true}
    } catch (error) {
        throw error;
    }
}
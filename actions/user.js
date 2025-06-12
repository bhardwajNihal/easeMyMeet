
"use server"
import { DbClient } from "@/db/prismaClient";

export async function getUserByUsername(username) {
    
    const foundUser = await DbClient.User.findUnique({
        where : {username},
        select : {
            id : true,
            name : true, 
            email : true,
            imageUrl : true,
            events : {
                where : {
                    isPrivate : false
                },
                orderBy : {
                    createdAt : "desc"
                },
                select : {
                    id : true,
                    title :true,
                    description : true,
                    duration : true,
                    _count : {
                        select : {bookings : true}
                    }
                }
            }
        }
    })

    return foundUser;
}
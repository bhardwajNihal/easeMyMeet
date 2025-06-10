"use server";
import { DbClient } from "@/db/prismaClient";
import { auth } from "@clerk/nextjs/server";

export async function getUserAvailability() {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized request!");
    }

    const foundUser = await DbClient.User.findUnique({
      where: {
        clerkUserId: userId,
      },
    });
    if (!foundUser) throw new Error("user not found!");

    const foundAvailability = await DbClient.Availability({
      where: {
        userId: foundUser.id,
      },
      include: {
        days: true,
      },
    });

    if (!foundAvailability) return []; // if no availibility found show default availabilities

    // now if the availability data is found
    // format it in a format accepted by the frontend form

    // the db schema is like
    // it have a availability table which has timegap,
    // and a 1 to many relationship to the day table which have the dayName, start and endTime

    const formatedData = {
      timeGap: foundAvailability.timeGap,
    }[
      //loop through the weekdays, find if a day is available, if so set start and endtime

      ("monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday")
    ].forEach((weekday) => {
      const dayAvailable = foundAvailability.days.find(
        (day) => day.day === weekday.toUpperCase()
      );

      // add the found day as key to the formated data, attach start and end time to it

      formatedData[weekday] = {
        isAvailable: !!dayAvailable, // converts to boolean value, like if the day is found then true
        startTime: dayAvailable
          ? dayAvailable.startTime.toISOString().slice(11, 16) //whatever format of time is stored in db, convert it to ISOString, and extract the time out of it.
          : "09:00",
        endTime: dayAvailable
          ? dayAvailable.endTime.toISOString().slice(11, 16)
          : "17:00",

        // * ISO format ("2023-01-01T09:00:00Z") is the gold standard in APIs.
        // theres a lot benefit to convert date into it
        // standardization, consistency, timezone awareness, sorting, comparision, also DB support.
        // it will further help integrate google calender
        // as Google Calendar APIs require proper ISO 8601 timestamps with full date + time + time zone context,
      };
    });

    return { availabilityData: formatedData };
  } catch (error) {
    throw error;
  }
}


// update availability
// take data from the frontend, format in db format
// if availability exits >> update, if not then create fresh availability.
// will obtain all weekdays, with flag of true or false depicting availability
// filter out the weekdays marked as true only, add it to db

export async function updateAvailability(data) {
    
try {
        const { userId } = await auth();
        if (!userId) {
          throw new Error("Unauthorized request!");
        }
    
        const foundUser = await DbClient.User.findUnique({
          where: {
            clerkUserId: userId,
          },
        });
        if (!foundUser) throw new Error("user not found!");
    
        const foundAvailability = await DbClient.Availability({ //used further to
          where: {
            userId: foundUser.id,
          }
        });
    
        
        // prepare availability data --> with array of objects having day, startTime, endTime
            // input data is an object of objects >> convert it to array >> format it for db
                // .flatMap() lets us:
                // Return an array with one object if isAvailable === true
                // Return an empty array otherwise
                // Result: a flat list of all active days only
    
    
        const formatedAvailabilityData = Object.entries(data).flatMap(
            ([day, {isAvailable, startTime, endTime}]) => {
    
                // return the weekday only if marked as true
                if(isAvailable){
    
                    //create a base date, to facilitate start and endTime to be stored as date format to db
                    const baseDate = new Date().toISOString.split("T")[0]; // extract the date portion only
    
                    return [
                        {
                            day : day.toUpperCase(),        // db only accepts enums
                            startTime : new Date(`${baseDate}T${startTime}:00Z`), // converts it to ISOString, which is necessary to get all the benefits of date object, also to integrate it with goolgle calender, which can't be done with raw time string like "09:00"
                            endTime : new Date(`${baseDate}T${endTime}:00Z`),
                        }
                    ]
                }
                return [];
            }
        )
    
        // now as we have the db friendly formatted data
        // weekdays unmarked are not ommited, the data is ready to be added to the db
    
        // if availibility is not already prsent then create fresh
        if(!foundAvailability){
    
            await DbClient.Availability.create({
                
                data : {
                    userId : foundUser.id,
                    timeGap : data.timeGap,
                    // as availability has 1-to-many relation to days
                    // Prisma allows nested create with an array when the relation is one-to-many.
                    // Prisma can bulk-create nested records in one go.
                    // It knows each one belongs to the parent Availability because of the availabilityId foreign key, which Prisma automatically fills in for you during the nested create.
                    days : {       
                        create : formatedAvailabilityData
                    }
                }
            })
        }
        else{
            await DbClient.Availability.update({
                where : {userId : foundUser.id},
                data : {
                    timeGap : data.timeGap,
                    days : {
                        deleteMany : {},    // delete all the previous entries, add new one afresh
                        create : formatedAvailabilityData
                    }
                }
            })
        }
    
        return {success:true}
} catch (error) {
    throw error;
}

}
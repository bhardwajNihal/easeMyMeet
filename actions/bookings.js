"use server"
import { DbClient } from "@/db/prismaClient";
import clerkClient from "@clerk/clerk-sdk-node";
import {google} from "googleapis"

export async function createBooking(bookingData) {
    
  try {
      // check if event exists
     const foundEvent = await DbClient.Event.findUnique({
      where  : { id : bookingData.eventId },
      include : { user : true }
     })
  
     if(!foundEvent) throw new Error("Event not found!, what to book??");
  
     // the most interesting part and the usp of the project
     // using google calender API to generate meetlink and add it to the calender
     // steps :
          // 1. go to google cloud console >> create a new project✅
          // 2. enable the calender api 
          // 3. on the redirected page click on "OAuth consent screen"
              // this is besically to prompt user to give permissions to google calender on the oauth screen during signup
              // -- add app info in the branding tab
                  // for authorized domain >> go to clerk >> app >> configure >> turn on custom credentials >> copy the Authorized Redirect URI >> paste it back to the field >> remove unnecessary string, only to contain domain name
  
          // 4. go to data access tab >> add or remove scopes >> add auth/calendar, profile and email >> save
          // 5. in the audience tab >> add a test user
          // 6. back to calendar dashboard >> credentials >> create OAuth client Id
              // select "web application" >> add authorized js origin to - http://localhost:3000
              // add the authorized redirect URI from clerk
              // click save
              // now will be provided with client ID and secret >> copy paste it into clerk's configuration tab open. >> save it.
              // done with custom OAuth of the app.
  
  
      // google oauth configuration done
      // now generate meetlink and google event id
  
  
      // get google's oauth token from clerk
     const data = await clerkClient.users.getUserOauthAccessToken(foundEvent.user.clerkUserId, "oauth_google");
     const token = data[0]?.token;
     
     if(!token) throw new Error("Google calendar has not been connected by event creator!");
  
     //setting up google Api client
     const OAuth2Client = new google.auth.OAuth2();
     OAuth2Client.setCredentials({access_token : token});
  
     // initiating calendar
     const calendar = google.calendar({version : "v3", auth : OAuth2Client});
  
  
     // finally creating google meet link via google calender utility
     const calendarResponse = await calendar.events.insert({
      calendarId : "primary",
      conferenceDataVersion : 1,
      requestBody : {
          summary : `${bookingData.name} - ${foundEvent.title}`,
          description : bookingData.additionalInfo,
          start : {dateTime : bookingData.startTime},
          end : {dateTime : bookingData.endTime},
          attendees : [{email : bookingData.email}, {email : foundEvent.user.email}],
          conferenceData:{
              createRequest : {requestId : `${foundEvent.id}-${Date.now()}`}
          }
      }
     })
  
     const meetLink = calendarResponse.data.hangoutLink;
     const googleEventId = calendarResponse.data.id;
     
     
     // adding to the db
     const bookedData = await DbClient.Booking.create({
      data : {
          eventId : foundEvent.id,
          userId : foundEvent.user.id,
          name : bookingData.name,
          email : bookingData.email,
          additionalInfo : bookingData.additionalInfo,
          startTime : bookingData.startTime,
          endTime : bookingData.endTime,
          meetLink,
          googleEventId
      }
     })
  
     return {success : true, bookedData};
  } catch (error) {
    throw error;
  }
   


}

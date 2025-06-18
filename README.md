
# easeMyMeet
    - A full stack calendly clone
    - that lets user to efectively manage meetings
    - it lets user to : 
        - create events i.e. the basis and describing the agenda for the meeting
        - expose public profile to let others book public events with the admin
        - cancel meetings
        - set custom availability, with days and time slots
        - google calendar api integration to add booked meetings info to the calendar and send a gmail to notify for the upcoming meetings
        - notification for the cancelled meetings as well

# Project setup

    - initialize a nextjs project
    -install shadcn
    - setup main layout, main, header, footer

    - setup clerk for authentication
    - setup neon db, get the db url
    - configure all the environment variable

# Functionalities

    - 1st done with landing page

    - User's clerk credentials to db on 1st login,
    - Dashboard
        - user intro
        - upcoming booked meetings brief
        - public url

    - Clerk user profile modification,  clerk configurations
    
    - Database model design
    - neon db setup
    - migration to the remote db
    - generating prisma client
    - making db client singleton for the dev mode

    # Adding server actions for
    - user entry, update username
    - create, delete, fetch events

    # public and private routes overview
    - /dashboard is for the logged-in owner to manage their profile, events, availability, etc.
    - /[username] is a read-only public version of admin profile.

    - complex logic to fetch user availability, i.e. time slots for the respective available days that user set for other to book meetings
    - server action to update availbality
    - date-time formating, refining input data to be stored into db
    - for potential available slots, things considered
        - start and endtime time for the available date
        - any bookings for that day
        - time gap, between two bookings

    # Event bookings logic
    # congiguring Oauth, for taking access and connecting google calendar
    # using google calender API to generate meetlink and add it to the calender
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

            - Delete the current user entry
            - do a fresh signup,
            - give permission to access calendar

    # finally book meeting server action
        - with adding entry to google calendar
        
        # to interact with the google calendar api
        1. get oauth access token from clerk client
        2. get access to the oauth client using the access token provided
        3. finally get access to the calendar using the oauth client
        - now calenar entries can be manipulated with the calendar instance

    - Done with the create a booking functionality, with entry to calendar, email to both the involved client of the meeting
    - fetching existing booked meetings
    - cancelling existing meeting, with deleting calendar entry as well.




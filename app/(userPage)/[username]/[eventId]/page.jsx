import { getEventAvailability } from '@/actions/availability';
import { getEventDetails } from '@/actions/events';
import BookingForm from '@/components/BookingForm';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Clock } from 'lucide-react';
import { notFound } from 'next/navigation';
import React from 'react'

export async function generateMetadata({params}){
  const username = params.username;
  const eventId = params.eventId
  const eventData = await getEventDetails(username, eventId);

  if (!eventData) {
    return {title : "Event not found!"}
  }

  return {
    title : `Book "${eventData.title}" event | easeMyMeet` ,
    description : `Book an ${eventData.duration} min call on "${eventData.title}" with ${eventData.user.name}.`
  }
}

const EventBookingPage = async({params}) => {

    const username = await params.username;
    const eventId = await params.eventId;
    const eventdetails = await getEventDetails(username,eventId);
    console.log(eventdetails);
    const eventAvailability = await getEventAvailability(eventId)
    

    if(!eventdetails){
        notFound();
    }
    
  return (
    <div className='mt-14 min-h-screen w-full flex items-center justify center px-4 sm:px-16 lg:px-28'>
        
        <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-4 sm:p-4 py-6 bg-gray-100/50 rounded-lg shadow-sm shadow-gray-400'>

            <div className="details space-y-2 lg:border-r border-gray-500 bg-white p-4 rounded my-2 h-fit ">
                <h1 className='text-2xl font-bold'>{eventdetails?.title}</h1>
                
                <div className='flex items-center gap-2'>
                    <Avatar className={'h-11 w-11'}>
                        <AvatarImage src={eventdetails?.user.imageUrl} alt={eventdetails?.user.name}/>
                        <AvatarFallback>
                            {eventdetails.user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className='font-semibold'>{eventdetails?.user.name}</p>
                        <p className='text-gray-500'>@{username}</p>
                    </div>
                </div>
                <span className='flex gap-1 items-center '><Clock size={"18px"}/> <span>{eventdetails.duration} minutes</span></span>
                <span className='flex gap-1 items-center '><Calendar size={"18px"}/> <span>Google Meet</span></span>
                <p className='text-gray-700'>{eventdetails.description}</p>
                
            </div>
            <div className="bookingform">
                <BookingForm event={eventdetails} eventAvailability={eventAvailability} />
            </div>
        </div>
    </div>
  )
}

export default EventBookingPage
import { getUserByUsername } from '@/actions/user';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'

// adding metaData, this public page needs to be SEO friendly
export async function generateMetadata({params}){
  const username = await params.username;
  const userData = await getUserByUsername(username);

  if (!userData) {
    return {title : "User not found!"}
  }

  return {
    title : `${userData.name}'s profile | easeMyMeet` ,
    description : `Book an event with ${userData.name}. View available public events and schedules.`
  }
}


// a route displaying user profile and all the public events available to book 
const UserPage = async ({ params }) => {

  const username = await params.username;
  const userData = await getUserByUsername(username);

  if (!userData) {
    notFound();
  }



  return (
    <div className='min-h-screen w-fullName flex flex-col items-center pt-24 space-y-4'>
      <div className="profile-pic">
        <Avatar className={`w-32 h-32`}>
          <AvatarImage src={userData?.imageUrl} alt={userData?.name} />
          <AvatarFallback>{userData.name.charAt(1)}</AvatarFallback>
        </Avatar>
      </div>
      <div className="info text-center">
        <h2 className='text-xl font-bold'>{userData.name}</h2>
        <h2 className='text-gray-500 text-sm'>{userData.email}</h2>
      </div>
      <div className="events p-4 px-8 sm:px-16">
        <h2 className='text-center text-lg'>Welcome to my Meets page.</h2>
        <h3 className='text-center mb-2'>Select any of following events to book a call with me.</h3>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 p-2 px-8 sm:px-16'>
          {userData.events.length > 0 ?
            userData.events.map((event) =>
              <Link
              key={event.id}
              href={`/${username}/${event.id}`}>
              <div  
              className='group relative overflow-hidden p-6 bg-cyan-200/50 space-y-2 cursor-pointer border border-gray-400 rounded-lg hover:-translate-y-2 duration-200 hover:shadow hover:shadow-gray-400'>
                <h2 className='text-xl font-semibold'>{event.title}</h2>
                <div className='flex items-center justify-between text-sm text-gray-500'>
                  <span>{event.duration} minutes</span>
                  <span>bookings {event._count.bookings}</span>
                </div>
                <h3>{event.description}</h3>

                <div className="overlay flex justify-center items-center absolute bottom-0 left-0 bg-gradient-to-t from-cyan-300 to-cyan-100/20 backdrop-blur-xs w-full h-1/2 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h2 className='flex items-center gap-2'><span>Book now</span> <ArrowRight size={"15px"} color='darkblue'/></h2>
                </div>
              </div>
              </Link>)
            : <div className='text-center text-2xl font-semibold text-gray-500 mt-24'>No public events available!</div>  
            }
        </div>
      </div>
    </div>
  )
}

export default UserPage
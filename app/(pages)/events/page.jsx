
"use client"
import { deleteEvent, getAllEvents } from '@/actions/events'
import { AddEventDrawer } from '@/components/addEventDrawer'
import useFetch from '@/customHooks/useFetch'
import { Copy, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import { toast } from 'sonner'

const Events = () => {

  const [deletingEventId, setDeletingEventId] = useState(null);

  const router = useRouter();
  const {
    data : eventsData,
    loading : FetchingEvents,
    fn : fetchEventsFn
  } = useFetch(getAllEvents)

  useEffect(() => {
    fetchEventsFn();
  },[])

  useEffect(() => {
    if(eventsData && !FetchingEvents){
      console.log(eventsData);
    }
  },[eventsData, FetchingEvents])

  
  function handleCopy(eventId, username){

    try {
      navigator.clipboard.writeText(`${window?.location.origin}/${username}/${eventId}`);
      toast.success("Event link Copied to clipboard!", {richColors:true})
    } catch (error) {
      console.error(error?.message);  
    }
  }

  const {
    data : deletedEventData,
    error : deleteEventError,
    loading : deletingEvent,
    fn : deleteEventFn
  } = useFetch(deleteEvent)

  function handleDelete(eventId){
    if(window?.confirm("Are you sure about deleting this event?")){
      setDeletingEventId(eventId);
      deleteEventFn(eventId);
    }
  }

  useEffect(() => {
    if(deletedEventData && !deleteEventError && !deletingEvent){
      toast.success("Event Deleted Successfully!");
      fetchEventsFn();      // to refetch and update events page
    }
  },[deletedEventData,deleteEventError, deletingEvent])


  function handleEventClick(eventId){
    window?.open(`${window?.location.origin}/${eventsData.username}/${eventId}`,"_blank");
  }


  if(FetchingEvents) return <div className='min-h-screen w-full flex items-center justify-center'><ClipLoader color='cyan' size={"25px"}/></div>

  return (
    <div className='pt-6 px-8'>
        <h2 className='text-3xl sm:text-4xl font-black text-cyan-600'>Events</h2>

        {/* fetch and display events */}
        <div className='h-full w-full grid grid-cols-1 sm:grid-cols-2 gap-6 mb-20 mt-4'>
          {eventsData && eventsData?.events.length!==0

          ? eventsData.events.map((event) => 
          <div 
          onClick={(e) =>{
            if(e.target.tagname !=="Button" || e.target.tagname !== "SVG") handleEventClick(event.id)
          }}
          className='p-4 sm-p-6 bg-cyan-100 shadow shadow-gray-400 rounded-lg'
          key={event.id}>

            <h2 className='font-semibold text-lg truncate max-w-[90%]'>{event?.title}</h2>
            <div className='flex text-xs sm:text-sm text-gray-500 justify-between'>
              <div>
                <span>{event?.duration} minutes</span> | 
              <span> {event?.isPrivate ? "Private" : "Public"}</span>
              </div>
              <span>{event?._count.bookings} bookings</span>
            </div>

            <p className='truncate max-w-[90%] py-2'>{event?.description}</p>

            <div className='flex gap-2'>
              <button 
              onClick={(e) => {
                e.stopPropagation();
                handleCopy(event.id, eventsData?.username);
              }
            }
              className='flex items-center gap-2 p-1 sm:py-1 sm:px-4 bg-gray-200/50 rounded border border-cyan-600 text-cyan-600 cursor-pointer hover:bg-cyan-200/50 duration-200'><Copy size={"15px"} color='#09A3B4'/><span>Copy Link</span></button>
            <button
            disabled={deletingEvent} 
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(event.id)
            }}
            className='flex items-center gap-2 p-1 sm:py-1 sm:px-4 bg-gray-200/50 rounded border border-red-600 cursor-pointer hover:bg-red-200 duration-200 text-red-600'>{deletingEvent && deletingEventId==event.id ? <ClipLoader size={"15px"} color='red'/> : <Trash size={"15px"} color='red'/>}<span>Delete</span></button>
            </div>
          </div>)
          : <div className='text-2xl font-semibold text-gray-500 text-center mt-28'>No events yet!</div>
        }
        </div>


        <AddEventDrawer reFetchEvents={fetchEventsFn}/>
    </div>
  )
}

export default Events
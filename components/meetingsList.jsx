"use client"
import { format } from 'date-fns';
import { Calendar, Clock, Video } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';
import useFetch from '@/customHooks/useFetch';
import { cancelMeeting, getMeetings } from '@/actions/meetings';
import { ClipLoader } from 'react-spinners';
import { toast } from 'sonner'; 

const MeetingsList = ({type}) => {

    const [cancelledMeetingId, setCancelledMeetingId] = useState()

    const {
        data : meetings,
        loading : meetingsLoading,
        fn: fetchMeetingsFn
    } = useFetch(getMeetings)
    // fetch meeting on mount 
    useEffect(() => {
        fetchMeetingsFn(type)
    },[type])


    const {
        data,
        loading,
        fn: cancelMeetingFn
    } = useFetch(cancelMeeting)

    async function handleCancelMeeting(meetingId) {
        if (window?.confirm("Are you sure, you want to Cancel this meeting??")) {
            setCancelledMeetingId(meetingId)
            cancelMeetingFn(meetingId);
        }
    }


    useEffect(() => {
        if (data && !loading) {
            toast.success("Meeting cancelled successfully!");
            // refetch updated meetings
            fetchMeetingsFn();
        }
    }, [data, loading])

    if(meetingsLoading){
        return <div>loading {type} meetings...</div>
    }

    return (<div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>

        {meetings && meetings.length > 0
            ? (meetings.map(meeting => (<div key={meeting.id} className='space-y-2 border border-gray-400 bg-white p-4 rounded-lg'>
                <h2 className='text-xl font-semibold'>{meeting?.event?.title}</h2>
                <h3 className='text-gray-500 '>with {meeting?.name}</h3>
                <p>{meeting.additionalInfo && meeting.additionalInfo}</p>

                <span className='flex gap-1 items-center text-gray-600'><Calendar size={"15px"} color='darkblue' />{format(new Date(meeting.startTime), "MMMM d, yyyy")}</span>
                <span className='flex gap-1 items-center text-gray-600'><Clock size={"15px"} color='darkblue' />{format(new Date(meeting.startTime), "h:mm a")} - {format(new Date(meeting.endTime), "h:mm a")}</span>

                <div className='flex gap-1 items-center'>
                    <Video size={"15px"} />
                    <a href={meeting.meetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline">Join meeting</a>
                </div>
                <Button
                    onClick={() => handleCancelMeeting(meeting.id)}
                    disabled={loading}
                    variant={"destructive"}>{loading && cancelledMeetingId === meeting.id ? <ClipLoader size={"15px"} color='white' /> : "Cancel Meeting"}</Button>

            </div>)))
            : <div>No {type} meetings!</div>
        }
    </div>)
}

export default MeetingsList
import { format } from 'date-fns';
import { meet } from 'googleapis/build/src/apis/meet';
import { Calendar, Clock, Video } from 'lucide-react';
import React from 'react'

const MeetingsList = ({ meetings, type }) => {

    return (<div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>

        {meetings && meetings.length > 0
            ? (meetings.map(meeting => (<div key={meeting.id} className='space-y-2 border border-gray-400 bg-white p-4 rounded-lg'>
                <h2 className='text-xl font-semibold'>{meeting?.event?.title}</h2>
                <h3 className='text-gray-500 '>with {meeting?.name}</h3>
                <p>{meeting.additionalInfo && meeting.additionalInfo}</p>

                <span className='flex gap-1 items-center text-gray-600'><Calendar size={"15px"} color='darkblue' />{format(new Date(meeting.startTime), "MMMM d, yyyy")}</span>
                <span className='flex gap-1 items-center text-gray-600'><Clock size={"15px"} color='darkblue'/>{format(new Date(meeting.startTime), "h:mm a")} - {format(new Date(meeting.endTime), "h:mm a")}</span>
                
                <div className='flex gap-1 items-center'>
                    <Video size={"15px"}/>
                    <a href={meeting.meetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline">Join meeting</a>
                </div>


            </div>)))
            : <div>No {type} meetings!</div>
        }
    </div>)
}

export default MeetingsList
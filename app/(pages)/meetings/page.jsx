
import MeetingsList from '@/components/meetingsList'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'

const Meetings = () => { 

  return (
    <div className='p-6'>
        <h2 className='text-3xl sm:text-4xl font-black text-cyan-600 mb-4'>Meetings</h2>

         <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">upcoming</TabsTrigger>
          <TabsTrigger value="past">past</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <MeetingsList type={"upcoming"}/>
        </TabsContent>
        <TabsContent value="past">
          <MeetingsList type={"past"}/>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Meetings
import { AddEventDrawer } from '@/components/addEventDrawer'
import React from 'react'

const Events = () => {
  return (
    <div>
        <h2 className='text-3xl sm:text-4xl font-black text-cyan-600 m-4'>Events</h2>


        <AddEventDrawer/>
    </div>
  )
}

export default Events
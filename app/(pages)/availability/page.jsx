import { getUserAvailability } from '@/actions/availability'
import AvailabilityForm from '@/components/AvailabilityForm';
import { defaultAvailability } from '@/lib/availabilityData';
import React from 'react'

const Availability = async() => {

  const {availabilityData} = await getUserAvailability();
  
  
  return (
    <div className='p-6'>
        <h2 className='text-3xl sm:text-4xl font-black text-cyan-600'>Availability</h2>

        <AvailabilityForm initialAvailability={ availabilityData ?? defaultAvailability}/>
    </div>
  )
}

export default Availability
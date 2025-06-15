
"use client"
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/style.css'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { bookingSchema } from '@/zodSchemas/bookingSchema'
import { toast } from 'sonner'
import useFetch from '@/customHooks/useFetch'
import { createBooking } from '@/actions/bookings'
import { ClipLoader } from 'react-spinners'


const BookingForm = ({ event, eventAvailability }) => {

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [slots, setSlots] = useState([])

  const{
    register,
    handleSubmit,
    setValue, 
    reset,
    formState : {errors}
  } = useForm({
    resolver : zodResolver(bookingSchema)
  })


  useEffect(() => {
    if (selectedDate) {
      const slotsForTheDay = eventAvailability.find(day => day.date === format(selectedDate, "yyyy-MM-dd"))?.availableSlots;
      setSlots(slotsForTheDay)
      setValue("date", format(selectedDate,"yyyy-MM-dd"))
    }
    else {
      setSlots(null)
    }

  }, [selectedDate])

  useEffect(() => {
    setValue("time", selectedTime)
    // console.log(selectedTime);

  }, [selectedTime])

  // useEffect(() => {
  //   console.log(slots);

  // }, [slots])

  // console.log("event : ", event);
  // console.log("event availability : ", eventAvailability);

  // get available dates, feed it to the day picker to highlight available dates
  const availableDays = eventAvailability.map(day => new Date(day.date));
  // console.log(availableDays);

  const {
    data : BookedData,
    loading : createBookingLoading,
    fn : createBookingFn
  } = useFetch(createBooking)


  async function handleBooking(data){
    // console.log("form data : ",data);
    
    if(!selectedDate && !selectedTime){
      toast.error("Date and time both are required!")
      return;
    }

    const startTime = new Date(`${format(selectedDate,"yyyy-MM-dd")}T${selectedTime}`);
    const endTime = new Date(startTime.getTime() + event.duration*60*1000);

    // preparing final data for the api call
    const bookingSubmissionData ={
      eventId : event.id,
      name : data.name,
      email : data.email,
      additionalInfo : data.additionalInfo,
      startTime, 
      endTime
    }

    createBookingFn(bookingSubmissionData)
    
  }

  useEffect(() => {
    if(BookedData && !createBookingLoading){
      reset();
      setSelectedDate(null);
      setSelectedTime(null);
      toast.success("Event booked successfully!")
    }

  },[BookedData, createBookingLoading])



  return (
    <div className='px-4'>
      <h2 className='text-xl font-semibold'>Book an Event</h2>
      <p className='text-gray-500'>Pick a Date and time.</p>
      <div className='flex gap-4 flex-wrap mb-4'>
        <DayPicker
          className='border border-gray-300 bg-white rounded p-1 w-full flex justify-center items-center'
          mode='single'
          selected={selectedDate}
          onSelect={(date) => {
            setSelectedDate(date)
            setSelectedTime(null)
          }
          }
          disabled={[
            { before: new Date() }
          ]}
          modifiers={{ available: availableDays }}
          modifiersStyles={{
            available: {
              backgroundColor: "#99DFE9",
              borderRadius: 20,
            }
          }}
        />
        {slots && slots.length > 0 && <div className="slot-options">
          <h2 className='text-lg font-semibold '>Available slots</h2>
          <div className='flex flex-wrap gap-1'>
            {
              slots.map(slot => <button
                onClick={() => setSelectedTime(slot)}
                className={`border border-gray-400 p-1 px-2 rounded ${selectedTime == slot ? "bg-[#99DFE9]" : ""}`} key={slot}>{slot}</button>)
            }
          </div>
        </div>}
      </div>

      {selectedTime && <div>
        
        <h2 className='text-lg font-semibold'>Fill In some details</h2>

        <form className='space-y-2' onSubmit={handleSubmit(handleBooking)}>
          <Input {...register("name")} placeholder="Name"/>
          {errors?.name && <p className='text-sm text-red-500'>{errors?.name?.message}</p>}
          <Input {...register("email")} placeholder="email"/>
          {errors?.email && <p className='text-sm text-red-500'>{errors?.email?.message}</p>}
          <Textarea {...register("additionalInfo")} placeholder="Additional Info (optional)"/>
          {errors?.additionalInfo && <p className='text-sm text-red-500'>{errors?.additionalInfo?.message}</p>}

          <button
          disabled={createBookingLoading}
          className='bg-cyan-300 w-fit py-2 px-6 rounded-lg'>
            {createBookingLoading ? <ClipLoader size="15px" color='darkblue'/> : "Submit"}</button>
        </form>

        </div>}
    </div>
  )
}

export default BookingForm
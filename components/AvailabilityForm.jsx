"use client"
import { availabilitySchema } from '@/zodSchemas/availabilitySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { Info } from 'lucide-react';
import useFetch from '@/customHooks/useFetch';
import { updateAvailability } from '@/actions/availability';
import { MdSecurityUpdateWarning } from 'react-icons/md';
import { toast } from 'sonner';
import { ClipLoader } from 'react-spinners';

const AvailabilityForm = ({ initialAvailability }) => {

    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
        watch,
        control
    } = useForm({
        resolver: zodResolver(availabilitySchema),
        defaultValues: {
            ...initialAvailability
        }
    })

    const { 
        data : updated,
        error : updateError,
        loading : updating,
        fn : updateFn
    } = useFetch(updateAvailability);


    function handleUpdateAvailability(data) {
        updateFn(data);
    }

    useEffect(() => {
        if(updated && !updating){
            toast.success("Availability Updated Successfully!", {richColors : true})
        }
    },[updated, updating])

    return (
        <form onSubmit={handleSubmit(handleUpdateAvailability)} className='space-y-3 mt-4'>
            {
                [
                    "monday",
                    "tuesday",
                    "wednesday",
                    "thursday",
                    "friday",
                    "saturday",
                    "sunday",
                ].map((day) => {
                    const isAvailable = watch(`${day}.isAvailable`)
                    return <div key={day} >
                        <div className='flex flex-col items-start gap-2 sm:items-center sm:flex-row'>
                            <div>
                                <Controller
                                    name={`${day}.isAvailable`}
                                    control={control}
                                    render={({ field }) =>
                                        <Checkbox
                                            className={`border border-blue-500 mr-2 `}
                                            checked={field.value}
                                            onCheckedChange={(checked) => {
                                                setValue(`${day}.isAvailable`, checked);
                                                if (!checked) {
                                                    setValue(`${day}.startTime`, "09:00");
                                                    setValue(`${day}.endTime`, "17:00")
                                                }
                                            }} />}
                                />
                                <span className='font-semibold'>{day[0].toUpperCase() + day.slice(1)}</span>
                            </div>

                            <div className='flex items-center'>
                                {isAvailable && <div className='flex gap-2 items-center sm:ml-4'>
                                    <span className='hidden sm:block'> | </span>
                                    <span className='text-nowrap text-gray-700 text-xs sm:text-sm'>Time range:</span>
                                    <Input {...register(`${day}.startTime`)} className={`border border-gray-400 bg-white`} type={"time"} /> <span className='text-sm text-gray-600'>to</span>
                                    <Input {...register(`${day}.endTime`)} className={`border border-gray-400 bg-white`} type={"time"} />

                                </div>}
                            </div>
                        </div>
                        {errors[day] && <p className='text-sm text-red-500 '>{errors[day].endTime?.message}</p>}
                    </div>
                })
            }

            <div >
                <div className='flex items-center gap-4'>
                    <label className='flex gap-1 items-center'><span>Time gap (mins)</span> <Info size={"18px"} /></label>
                    <Input
                        type={"number"}
                        {...register("timeGap", { valueAsNumber: true })}
                        className={"border border-gray-400 bg-white w-1/4"}
                    />
                </div>
                {errors.timeGap && (
                    <span className="text-red-500 text-sm">{errors.timeGap.message}</span>
                )}
            </div>
                {updateError && <span className="text-red-500 text-sm">{updateError?.message}</span>}
            <button
            disabled={updating}
            type="submit" className="px-4 py-2 mt-2 bg-cyan-300 hover:bg-cyan-400 cursor-pointer rounded">
                {updating ? <ClipLoader size={"15px"} color='darkblue'/> : ""} Save Availability
            </button>
        </form>
    )
}

export default AvailabilityForm
import { eventSchema } from '@/zodSchemas/eventSchema';
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { createEvent } from '@/actions/events';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import useFetch from '@/customHooks/useFetch';
import { ClipLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';


const AddEventForm = () => {
    const router = useRouter();

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            title: "",
            description: "",
            duration: 30,
            isPrivate: true,
        },
    });

    const {
        data : addedEventData,
        loading : addingEvent,
        error : addEventError,
        fn : addEventFn
    } = useFetch(createEvent)


    function handleAddEvent(data){
        addEventFn(data)
    }

    useEffect(()=> {
        if(!addingEvent && addedEventData) alert("event added successfully!");  
        router.refresh();       // refresh the events page to show new event added  
    }, [addedEventData, addingEvent])


    return (
        <form onSubmit={handleSubmit(handleAddEvent)} className='p-4 my-4 bg-white rounded-lg'>
            {addEventError && <p className="text-red-500 text-xs mt-1">{addEventError.message}</p>}
            <div>
                <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                >
                    Event Title
                </label>

                <Input id="title" {...register("title")} className="mt-1" />

                {errors.title && (
                    <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
                )}
            </div>

            <div>
                <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                >
                    Description
                </label>

                <Textarea
                    {...register("description")}
                    id="description"
                    className="mt-1"
                />
                {errors.description && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.description.message}
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="duration"
                    className="block text-sm font-medium text-gray-700"
                >
                    Duration (minutes)
                </label>

                <Input
                    id="duration"
                    {...register("duration", {
                        valueAsNumber: true,
                    })}
                    type="number"
                    className="mt-1"
                />

                {errors.duration && (
                    <p className="text-red-500 text-xs mt-1">{errors.duration.message}</p>
                )}
            </div>


            <div>
                <label
                    htmlFor="isPrivate"
                    className="block text-sm font-medium text-gray-700"
                >
                    Set visibility
                </label>

                <Controller
                    name='isPrivate'
                    control={control}
                    render={({ field }) => (
                        <Select
                            value={field.value ? "true" : "false"}
                            onValueChange={(value) => field.onChange(value === "true" ? true : false)}
                        >
                            <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select privacy" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="true">Private</SelectItem>
                                <SelectItem value="false">Public</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />


                {errors.isPrivate && (
                    <p className="text-red-500 text-xs mt-1">{errors.isPrivate.message}</p>
                )}
            </div>
                <button
                disabled={addingEvent}
                type='submit'
                className='bg-cyan-300 w-full py-2 rounded flex items-center gap-2 justify-center'><span>{addingEvent && <ClipLoader color='darkblue' size={"15px"}/>}</span><span>{addingEvent ? "Submitting..." : "Submit"}</span></button>
        </form>
    )
}

export default AddEventForm
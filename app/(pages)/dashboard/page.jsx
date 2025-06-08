
"use client"
import React, { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { Input } from '@/components/ui/input';
import { Pencil } from 'lucide-react';
import { useForm } from 'react-hook-form';
import {zodResolver} from "@hookform/resolvers/zod"
import { usernameSchema } from '@/zodSchemas/usernameSchema';
import { Island_Moments } from 'next/font/google';
import useFetch from '@/customHooks/useFetch';
import { updateUsername } from '@/actions/updateUsername';
import { ClipLoader } from 'react-spinners';


const Dashboard = () => {

  const {isLoaded,user} = useUser();

  const{
    register,
    handleSubmit,
    setValue,
    formState: {errors}
  } = useForm({
    resolver : zodResolver(usernameSchema)
  })

  const {
    fn : updateUsernameFn,
    loading : updateUsernameLoading,
    error : updateUsernameError
  } = useFetch(updateUsername);

  async function handleUpdateUsername(data){
    updateUsernameFn(data.username);    
  }

  useEffect(() => {
      setValue("username", user?.username ? user.username : "username")
  },[isLoaded])

  return (
    <div className='p-4 sm:py-6 px-10'>
        <h2 className='text-3xl sm:text-4xl font-black text-cyan-600'>Dashboard</h2>

        <div className="welcome bg-cyan-100 p-2 rounded my-4 shadow shadow-gray-300">
          <h2>Welcome, <span className='font-semibold'>{user.fullName ? user.fullName : user.username}</span></h2>
        </div>

        <div className="link bg-cyan-100 p-2 py-4 rounded my-4 shadow shadow-gray-300">
          <h2 className='text-lg font-semibold mb-2'>Your Unique Link</h2>

          {/* form to update username */}
          <form onSubmit={handleSubmit(handleUpdateUsername)}>
            <div className='flex gap-2 items-center mb-3'>
              <span>{window?.location.origin}</span>/
            <Input
            {...register("username")}
            placeholder="username" className={"bg-gray-200/50"}/>
            </div>
            {errors?.username && <p className='text-sm text-red-500 -mt-2 mb-2'>{errors.username.message}</p>}
            {updateUsernameError?.message && <p className='text-sm text-red-500 -mt-2 mb-2'>{updateUsernameError?.message}</p>}

            <button
            disabled={updateUsernameLoading}
            type='submit'
            className='bg-cyan-300 py-2 px-6 rounded flex items-center gap-2 hover:bg-cyan-400 cursor-pointer'>
              {updateUsernameLoading && <ClipLoader size={"15px"} color='darkblue'/>}
              <Pencil size={"15px"}/>Update Username</button>
          </form>

        </div>
    </div>
  )
}

export default Dashboard
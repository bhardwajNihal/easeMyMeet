import React from 'react'

const Notfound = () => {
  return (
    <div className='w-full min-h-screen flex flex-col justify-center items-center'>
    <h2 className='text-5xl text-cyan-700/60 font-black'>404 - Not Found</h2>
    <p className='text-gray-500 font-semibold texl-xl'>The page you are looking for either doesn't exist or have been moved! </p>
    </div>
  )
}

export default Notfound
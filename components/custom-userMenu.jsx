"use client"
import { UserButton } from '@clerk/nextjs'
import { ChartNoAxesGantt } from 'lucide-react'
import React from 'react'

const CustomUserMenu = () => {
  return <UserButton appearance={{
    elements : {
        avatarBox : "h-10 w-10"
    }
  }}>

{/* adding custom options to user menu */}
    <UserButton.MenuItems>
        <UserButton.Link
        href='/events'
        label='My Events'
        labelIcon={<ChartNoAxesGantt size={"18px"}/>}
        />
        <UserButton.Action label='manageAccount'/>
    </UserButton.MenuItems>
    </UserButton>
}

export default CustomUserMenu
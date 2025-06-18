import React from 'react'
import Link from 'next/link'
import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs'
import { Button } from './ui/button'
import { PenBox } from 'lucide-react'
import CustomUserMenu from './custom-userMenu'
import { checkUser } from '@/lib/checkUser'

const Header = async () => {

  // check if user entry in db
  await checkUser();

  return (
    <header className='h-14 w-full border-b border-cyan-200 backdrop-blur bg-gradient-to-r from-cyan-200 to-transparent flex justify-between items-center px-4 sm:px-10 md:px-16 fixed top-0 z-50'>

      <Link href={"/"}>
        <div className="logo font-black text-xl sm:text-2xl ">
          easeMyMeet
        </div>
      </Link>

      <div className="menuoptions flex gap-2">
        <SignedOut>
          <SignInButton>
            <Button className={"bg-cyan-300 text-blue-800 hover:bg-cyan-400"}>Login</Button>
          </SignInButton>
          <SignUpButton>
            <Button className={"border border-blue-700 text-blue-800 bg-transparent hover:bg-cyan-300"}>Register</Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>

          <Link href={"/dashboard"}>
            <button className="py-2 px-6 text-blue-600 hover:underline cursor-pointer">Dashboard</button>
          </Link>

          <Link href={"/events?create=true"}>
            <Button
              className={"bg-cyan-300 hover:bg-cyan-400 text-blue-800"}>
              <PenBox />Add Event
            </Button>
          </Link>
          <CustomUserMenu />
        </SignedIn>
      </div>
    </header>
  )
}

export default Header
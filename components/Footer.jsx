import React from 'react'
import { Github, Linkedin } from 'lucide-react'
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="h-20 border-t border-blue-800 flex flex-col justify-center items-center text-sm gap-2 bg-cyan-200">
        <div className="flex gap-2 sm:gap-6 justify-center items-center">
          <p>Made with ❤️ by Nihal Bhardwaj.</p>
          <a target="_blank" href="https://x.com/bhardwajnihal21" ><FaXTwitter className="hover:text-blue-400 text-lg"/></a>
          <a target="_blank" href="https://github.com/bhardwajNihal"><Github size={"18px"} className="hover:text-black"/></a>
          <a target="_blank" href="https://www.linkedin.com/in/nihal-bhardwaj-8397212b8/"><Linkedin size={"18px"} className="hover:text-blue-600"/></a>
        </div>
        <p className='text-center'>© 2025 easyMyMeet. All rights reserved.</p>
    </footer>
  )
}

export default Footer
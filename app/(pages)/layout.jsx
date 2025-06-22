"use client"
import { BarChart2, Calendar, Clock10 } from 'lucide-react'
import { MdPeople } from "react-icons/md";

import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { ClockLoader } from "react-spinners"

const PageLayout = ({ children }) => {

    const { isLoaded } = useUser();
    const path = usePathname().replace("/","");
    const router = useRouter();

    const routes = [
        { route: "Dashboard", icon: <BarChart2 size={"19px"} /> },
        { route: "Events", icon: <Calendar size={"19px"} /> },
        { route: "Meetings", icon: <MdPeople size={"19px"} /> },
        { route: "Availability", icon: <Clock10 size={"19px"} /> },
    ]

    if (!isLoaded) return <div className='w-full min-h-screen flex items-center justify-center'><ClockLoader size={"35px"} color='cyan' /></div>

    return (
        <div className='flex relative w-full min-h-screen'>
            <aside className="sidebar w-48 lg:w-60 min-h-full mt-14 bg-cyan-200/40 border-r border-cyan-300 hidden md:block pt-6 p-2 ">

                <ul>
                    {routes.map((route, index) => <li key={index} onClick={() => {
                        router.push(`/${(route.route).toLowerCase()}`);
                    }}
                        className={`hover:bg-cyan-200 cursor-pointer duration-200 rounded w-full h-8 flex gap-2 mb-1 items-center p-2 ${path == (route.route).toLowerCase() ? "bg-cyan-300/70 border-l border-cyan-500" : ""}`}>
                        {route.icon}
                        <span>{route.route}</span>
                    </li>)}
                </ul>
            </aside>

            <main className="page-content w-full min-h-full mt-14 ">{children}</main>

            <div className="foot-menu fixed backdrop-blur-lg h-16 w-full bottom-0 left-0 z-50 block bg-cyan-200/40 border-r border-cyan-300 md:hidden">
                <ul className='w-full h-full flex justify-evenly'>
                    {routes.map((route, index) =>
                        <li
                            key={index}
                            onClick={() => {
                                router.push(`/${(route.route).toLowerCase()}`);
                            }}
                            className={`hover:bg-cyan-300/80 cursor-pointer duration-200 rounded text-xs sm:text-sm w-full h-full flex flex-col justify-center items-center mb-1 items-center p-2 ${path == (route.route).toLowerCase() ? "bg-cyan-300/70" : ""}`}>
                            {route.icon}
                            <span>{route.route}</span>
                        </li>)}
                </ul>
            </div>
        </div>
    )
}

export default PageLayout
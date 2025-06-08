"use client"
import React, { useEffect, useState } from "react"
import {
    Drawer,
    DrawerContent,
} from "@/components/ui/drawer"
import { DialogTitle } from "@radix-ui/react-dialog"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import AddEventForm from "./addEventForm"

export function AddEventDrawer() {

    const [open, setOpen] = useState(false);
    const searchParams = useSearchParams();
    const create = searchParams.get("create");
    const router = useRouter();

    useEffect(() => {
        if (create === "true") {
            setOpen(true);
        }
    }, [create])


    return (
        <Drawer open={open}
            onOpenChange={(newOpen) => {
                setOpen(newOpen);
                if (!newOpen) {
                    router.push(window?.location.pathname);
                }
            }}>

            <DrawerContent className={"bg-gray-200"}>
                <DialogTitle className="text-center text-cyan-700 font-semibold text-xl sm:text-2xl">Add a new Event</DialogTitle>
                <div className="mx-auto w-full max-w-sm">

                    <AddEventForm/>

                </div>
            </DrawerContent>
        </Drawer>
    )
}
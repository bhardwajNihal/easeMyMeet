"use client"
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"


const testimonials = [
  {
    id : 1,
    name: "Sarah Johnson",
    role: "Marketing Manager",
    content:
      "easeMyMeet has transformed how I manage my team's meetings. It's intuitive and saves us hours every week!",
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    id : 2,
    name: "David Lee",
    role: "Freelance Designer",
    content:
      "As a freelancer, easeMyMeet helps me stay organized and professional. My clients love how easy it is to book time with me.",
    image: "https://i.pravatar.cc/150?img=2",
  },
  {
    id : 3,
    name: "Emily Chen",
    role: "Startup Founder",
    content:
      "easeMyMeet streamlined our hiring process. Setting up interviews has never been easier!",
    image: "https://i.pravatar.cc/150?img=3",
  },
  {
    id : 4,
    name: "Michael Brown",
    role: "Sales Executive",
    content:
      "I've seen a 30% increase in my meeting bookings since using easeMyMeet. It's a game-changer for sales professionals.",
    image: "https://i.pravatar.cc/150?img=4",
  },
];

export default function TestimonialsCarousel() {

    return (
        <Carousel
            plugins={[
                Autoplay({
                    delay: 2000,
                }),
            ]}
            className="w-full mx-auto overflow-hidden">
            <CarouselContent className="-ml-1">
                {testimonials.map((testimonial) => (
                    <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-2">
                            <Card className={"p-4"}>
                                <CardHeader className={"flex gap-2 "}>
                                    <img className="h-12 w-12 rounded-full object-cover" src={testimonial.image} alt="" />
                                    <div>
                                        <h2>{testimonial.name}</h2>
                                    <p className="text-gray-500">{testimonial.role}</p>
                                    </div>
                                </CardHeader>
                                <CardContent className="h-36 flex aspect-square items-center justify-center">
                                    {testimonial.content}
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}
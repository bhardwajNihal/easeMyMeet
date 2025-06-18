import { Calendar, Clock, LinkIcon, Bell, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import TestimonialsCarousel from "@/components/Testimonials";
import Footer from "@/components/Footer";

const features = [
  {
    id: 1,
    icon: <Calendar size={"35px"} />,
    title: "Manage Meets.",
    description: "Seemlessly schedule, manage, track, cancel, reschedule you meetings.",
  },
  {
    id: 2,
    icon: <Clock size={"35px"} />,
    title: "Manage Availability",
    description: "Define your availability to streamline scheduling.",
  },
  {
    id: 3,
    icon: <Bell size={"35px"} />,
    title: "Get Reminded",
    description: "Remain updated about upcoming events with timed notifications.",
  },
  {
    id: 4,
    icon: <LinkIcon size={"35px"} />,
    title: "Custom Links",
    description: "Share your personalized scheduling link with friends, family or colleagues.",
  },
];


const workings = [
  {
    step: "Sign Up",
    description: "Create your free Schedulrr account"
  },
  {
    step: "Set Availability",
    description: "Define when you're available for meetings",
  },
  {
    step: "Share Your Link",
    description: "Send your scheduling link to clients or colleagues",
  },
  {
    step: "Get Booked",
    description: "Receive confirmations for new appointments automatically",
  },
];

export default function Home() {
  return (
    <div className="w-full px-4 sm:px-10 md:px-16">
      <div className="hero-section min-h-screen flex flex-col gap-2 md:flex-row">

        <div className="hero-text pr-8 mt-16 md:mt-0 min-h-full w-full md:w-1/2 flex flex-col justify-center items-center md:items-start gap-4">
          <h2 className="text-6xl md:text-7xl font-black ">Focus on <span className="text-cyan-500">Meets.</span> <br /><span className="text-5xl">That's it!</span></h2>
          <p className="text-lg font-semibold sm:text-xl">Rest will be taken care of by us.</p>

          <Link href={"/dashboard"}>
            <button className="bg-cyan-300 text-blue-800 flex gap-2 px-4 py-2 rounded-lg hover:bg-cyan-400 cursor-pointer font-semibold ">
              Get Started <ArrowRight />
            </button>
          </Link>

        </div>
        <div className="hero-image relative min-h-full w-full md:w-1/2 aspect-square flex justify-center items-center">
          <Image
            className="rounded-xl overflow-hidden"
            src={"/hero_image.png"}
            alt="meeting_illustration"
            objectFit="contain"
            layout="fill"
          />
        </div>
      </div>

      <h2 className="text-blue-800 text-2xl my-4 font-semibold text-center">What we provide??</h2>
      <div className="features-section min-h-64 w-full grid grid-cols-1 sm:grid-cols-2 gap-6 px-8">
        {features.map((feature) => <div key={feature.id} className="box bg-white shadow shadow-cyan-500 rounded-lg p-6 flex flex-col gap-2 ">
          <div className="icon text-cyan-600 bg-gray-100/50 w-fit p-2 rounded-lg ">{feature.icon}</div>
          <div className="heading text-xl font-semibold">{feature.title}</div>
          <div className="content">{feature.description}</div>
        </div>)}
      </div>


      <h2 className="text-2xl font-semibold text-center mt-32">What our users say??</h2>
      <TestimonialsCarousel />


      <h2 className="text-2xl font-semibold text-center mt-32 mb-4">How it works??</h2>
      <div className="w-full h-fit grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-8">
        {workings.map((step, index) =>
          <div
            className="p-6 shadow shadow-cyan-500 rounded-lg bg-white flex flex-col gap-4 items-center justify-center"
            key={index}>
            <div className="step-count bg-cyan-100 text-2xl rounded-full w-12 h-12 flex items-center justify-center text-center text-blue-800">{index + 1}</div>
            <h2 className="text-blue-800 font-bold text-lg"><u>{step.step}</u></h2>
            <div className="text-gray-600 text-center">{step.description}</div>
          </div>)}
      </div>


      <div className="lastmessage bg-cyan-200 p-8 flex flex-col gap-2 border border-blue-600 mt-24 rounded-lg px-12 mx-auto w-[90%] mb-24">
          <h2 className="text-xl font-bold">Ready to start easing your meets?</h2>
          <h3>Join the community of thousands of individuals organizing there events seamlessly through <b>easeMyMeet</b></h3>
          <Link href={"/sign-in"}>
          <button 
          className="bg-cyan-300 hover:bg-cyan-400 cursor-pointer w-fit flex gap-2 mt-4 text-blue-800 font-semibold px-6 py-2 rounded-lg items-center">Start for free <ArrowRight size={"18px"}/></button>
          </Link>
      </div>


      <Footer />

    </div>

  );
}

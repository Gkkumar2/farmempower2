import { AuroraBackgroundDemo } from "@/components/home/AuroraBackgroundDemo";
import { HeroHighlightDemo } from "@/components/home/HeroHighlightDemo";

import { LayoutGridDemo } from "@/components/home/LayoutGridDemo";

import { TextGenerateEffectDemo } from "@/components/home/TextGenerateEffectDemo";
import { TypewriterEffectSmoothDemo } from "@/components/home/TypewriterEffectSmoothDemo";
import Link from "next/link";
import backgroundImage from '../public/bck3.jpg';
import { ChevronDown, ChevronUp, DiamondMinus, FileWarningIcon, Flower2, Handshake, HeartHandshake, HomeIcon } from "lucide-react";
import { FiFramer } from "react-icons/fi";
import StickyScrollRevealDemo from "@/components/home/StickyScrollRevealDemo";
import InfiniteMovingCardsDemo from "@/components/home/InfiniteMovingCardsDemo";


export default function Home() {
  return (
  
  <div className="">
    <div className="flex flex-wrap bg-slate-100 max-w-5xl ml-5 rounded-xl">
    <div className="w-full sm:w-8/12 mb-10">
      <div className="container mx-auto h-full sm:p-10 ">
        <nav className="flex px-4 justify-between items-center">
          <div className="text-3xl font-bold">
            <span className="text-green-700">Farm</span>Empower<span className="text-green-700">.</span>
          </div>
          <div>
            <img src="https://image.flaticon.com/icons/svg/497/497348.svg" alt="" className="w-8"></img>
          </div>
        </nav>
        <header className="container px-4 lg:flex mt-10 items-center h-full lg:mt-0">
          <div className="w-full">
            <h1 className="text-4xl lg:text-6xl font-bold">Revolutionizing <span className="text-green-700">Farming for a </span>Better Tomorrow</h1>
            <div className="w-20 h-2 bg-green-700 my-4"></div>
            <p className="text-2xl font-mono font-extrabold text-yellow-600 mb-5">Sowing sustainability, reaping community.</p>
          </div>
        </header>
      </div>
    </div>
    <img src="https://images.unsplash.com/photo-1536147116438-62679a5e01f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" alt="Leafs" className="w-full h-48 object-cover sm:h-full sm:w-4/12"></img>
  </div>


  <div className="max-w-5xl mx-auto p-4 mt-10">
  <div className="btm-nav flex justify-between items-center shadow-sm rounded-lg p-4 gap-1 bg-gray-100 text-green-800">
    <div className="flex flex-col items-center w-full p-2">
      <DiamondMinus className="h-10 w-10 text-green-400" />
      <span className="btm-nav-label">Reduces Environmental Impact</span>
    </div>
    <div className="flex flex-col items-center w-full p-2">
      <Flower2 className="h-10 w-10 text-yellow-600" />
      <span className="btm-nav-label">Promotes Biodiversity</span>
    </div>
    <div className="flex flex-col items-center w-full p-2">
      <Handshake className="h-10 w-10 text-teal-600" />
      <span className="btm-nav-label">Supports Local Economies</span>
    </div>
  </div>
</div>
 <div className="-mt-20">
     <LayoutGridDemo/>
 </div>

<div className="-mt-16">
      <StickyScrollRevealDemo/>
</div>
     

 <div className="relative max-w-5xl mx-auto mt-5">
    <img className="h-96 w-full object-cover rounded-md" src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2813&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Random image"></img>
    <div className="absolute inset-0 bg-gray-500 opacity-60 rounded-md"></div>
    <div className="absolute inset-0 flex items-center justify-center">

        <h2 className="text-lg font-mono text-white p-4  ">
          <TextGenerateEffectDemo />
        </h2>
    </div>
</div>

     
      <div className="mt-10">
           <InfiniteMovingCardsDemo/>
      </div>
      
      <TypewriterEffectSmoothDemo/>
      <div>
      </div>
  </div>
)}

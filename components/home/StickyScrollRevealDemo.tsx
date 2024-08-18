import { BrainCircuit, Cloud, FramerIcon, Library, MessageCircleIcon, Tractor, TreeDeciduous } from 'lucide-react'
import React from 'react'

function StickyScrollRevealDemo() {
  return (
    <div><section className="py-20 bg-white">
    <div className="container max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold tracking-tight text-center">App Features</h2>
        <p className="mt-2 text-lg text-center text-gray-600">Check out our list of awesome features below.</p>
        <div className="grid grid-cols-4 gap-8 mt-10 sm:grid-cols-8 lg:grid-cols-12 sm:px-8 xl:px-0">

            <div className="relative flex flex-col items-center justify-between col-span-4 px-8 py-12 space-y-4 overflow-hidden bg-gray-100 sm:rounded-xl" data-rounded="rounded-xl" data-rounded-max="rounded-full">
                <div className="p-3 text-white bg-blue-500 rounded-full" data-primary="blue-500" data-rounded="rounded-full">
                   <Tractor className='h-8 w-8'/>
                </div>
                <h4 className="text-xl font-medium text-gray-700">Farm Management</h4>
                <p className="text-base text-center text-gray-500">This involves tracking and managing various aspects of your farm.</p>
            </div>

            <div className="flex flex-col items-center justify-between col-span-4 px-8 py-12 space-y-4 bg-gray-100 sm:rounded-xl" data-rounded="rounded-xl" data-rounded-max="rounded-full">
                <div className="p-3 text-white bg-blue-500 rounded-full" data-primary="blue-500" data-rounded="rounded-full">
                    <Cloud className='h-8 w-8'/>
                </div>
                <h4 className="text-xl font-medium text-gray-700">Weather Forecast </h4>
                <p className="text-base text-center text-gray-500">Integrating weather APIs can provide real-time weather updates for your users.</p>
            </div>

            <div className="flex flex-col items-center justify-between col-span-4 px-8 py-12 space-y-4 bg-gray-100 sm:rounded-xl" data-rounded="rounded-xl" data-rounded-max="rounded-full">
                <div className="p-3 text-white bg-blue-500 rounded-full" data-primary="blue-500" data-rounded="rounded-full">
                    <BrainCircuit className='h-8 w-8'/>
                </div>
                <h4 className="text-xl font-medium text-gray-700">Crop Disease Diagnosis</h4>
                <p className="text-base text-center text-gray-500">You can use image recognition models to identify common crop diseases based on leaf images.</p>
            </div>

            <div className="flex flex-col items-center justify-between col-span-4 px-8 py-12 space-y-4 bg-gray-100 sm:rounded-xl" data-rounded="rounded-xl" data-rounded-max="rounded-full">
                <div className="p-3 text-white bg-blue-500 rounded-full" data-primary="blue-500" data-rounded="rounded-full">
                    <TreeDeciduous className='h-8 w-8'/>
                </div>
                <h4 className="text-xl font-medium text-gray-700">Sustainable Farming</h4>
                <p className="text-base text-center text-gray-500">Provide educational content on sustainable practices, soil conservation, organic farming, and biodiversity.</p>
            </div>

            <div className="flex flex-col items-center justify-between col-span-4 px-8 py-12 space-y-4 bg-gray-100 sm:rounded-xl" data-rounded="rounded-xl" data-rounded-max="rounded-full">
                <div className="p-3 text-white bg-blue-500 rounded-full" data-primary="blue-500" data-rounded="rounded-full">
                    <Library className='h-8 w-8'/>
                </div>
                <h4 className="text-xl font-medium text-gray-700">Resource Library</h4>
                <p className="text-base text-center text-gray-500">Curate articles, videos, e-books, infographics, and case studies. Organize them for easy navigation.</p>
            </div>

            <div className="flex flex-col items-center justify-between col-span-4 px-8 py-12 space-y-4 bg-gray-100 sm:rounded-xl" data-rounded="rounded-xl" data-rounded-max="rounded-full">
                <div className="p-3 text-white bg-blue-500 rounded-full" data-primary="blue-500" data-rounded="rounded-full">
                    <MessageCircleIcon className='h-8 w-8'/>
                </div>
                <h4 className="text-xl font-medium text-gray-700">Farming Community Chat</h4>
                <p className="text-base text-center text-gray-500">Create a community space where farmers can connect, share experiences, ask questions, and collaborate.</p>
            </div>

        </div>
    </div>
</section></div>
  )
}

export default StickyScrollRevealDemo
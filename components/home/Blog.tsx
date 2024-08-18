import React from 'react'

function Blog() {
  return (
    <div>
        <section className="bg-white">
            <div className='flex bg-slate-100 text-3xl font-serif mt-4 text-bold text-violet-600 items-center justify-center '>
                <p>
                    Coming Soon...
                </p>
            </div>
    <div className="w-full px-5 py-6 mx-auto space-y-5 sm:py-8 md:py-12 sm:space-y-8 md:space-y-16 max-w-7xl">

        <div className="flex flex-col items-center sm:px-5 md:flex-row">
            <div className="w-full md:w-1/2">
                <a href="#_" className="block">
                    <img className="object-cover w-full h-full rounded-lg max-h-64 sm:max-h-96" src="/blog1.jpg" alt=''></img>
                </a>
            </div>
            <div className="flex flex-col items-start justify-center w-full h-full py-6 mb-6 md:mb-0 md:w-1/2">
                <div className="flex flex-col items-start justify-center h-full space-y-3 transform md:pl-10 lg:pl-16 md:space-y-5">
                    <div className="bg-pink-500 flex items-center pl-2 pr-3 py-1.5 leading-none rounded-full text-xs font-medium uppercase text-white inline-block">
                        <svg className="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <span>Featured</span>
                    </div>
                    <h1 className="text-4xl font-bold leading-none lg:text-5xl xl:text-6xl"><a href="#_">Sustainable Farming. Future Harvests.</a></h1>
                    <p className="pt-2 text-sm font-medium">by <a href="#_" className="mr-1 underline">John Doe</a> · <span className="mx-1">April 23rd, 2021</span> · <span className="mx-1 text-gray-600">5 min. read</span></p>
                </div>
            </div>
        </div>

        <div className="flex grid grid-cols-12 pb-10 sm:px-5 gap-x-8 gap-y-16">
            <div className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-6 xl:col-span-4">
                <a href="#_" className="block">
                    <img className="object-cover w-full mb-2 overflow-hidden rounded-lg shadow-sm max-h-56" src="/blog2n.jpg" alt=''></img>
                </a>
                <div className="bg-purple-500 flex items-center px-3 py-1.5 leading-none rounded-full text-xs font-medium uppercase text-white inline-block">
                    <span>Farming</span>
                </div>
                <h2 className="text-lg font-bold sm:text-xl md:text-2xl"><a href="#_">Building a Sustainable Future</a></h2>
                <p className="text-sm text-gray-500">Explore the principles of sustainable farming and how they can lead to a brighter future for agriculture.</p>
                <p className="pt-2 text-xs font-medium"><a href="#_" className="mr-1 underline">Mary Jane</a> · <span className="mx-1">April 17, 2021</span> · <span className="mx-1 text-gray-600">3 min. read</span></p>
            </div>

            <div className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-6 xl:col-span-4">
                <a href="#_" className="block">
                    <img className="object-cover w-full mb-2 overflow-hidden rounded-lg shadow-sm max-h-56" src="blog3n.jpg" alt=''></img>
                </a>
                <div className="bg-pink-500 flex items-center px-3 py-1.5 leading-none rounded-full text-xs font-medium uppercase text-white inline-block">
                    <span>Health</span>
                </div>
                <h2 className="text-lg font-bold sm:text-xl md:text-2xl">Healthier Farming Practices</h2>
                <p className="text-sm text-gray-500">Learn how adopting healthier farming practices can lead to better yields and a sustainable future.</p>
                <p className="pt-2 text-xs font-medium"><a href="#_" className="mr-1 underline">Fred Jones</a> · <span className="mx-1">April 10, 2021</span> · <span className="mx-1 text-gray-600">3 min. read</span></p>
            </div>

            <div className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-6 xl:col-span-4">
                <a href="#_" className="block">
                    <img className="object-cover w-full mb-2 overflow-hidden rounded-lg shadow-sm max-h-56" src="/blog4.jpg" alt=''></img>
                </a>
                <div className="bg-red-500 flex items-center px-3 py-1.5 leading-none rounded-full text-xs font-medium uppercase text-white inline-block">
                    <span>Food</span>
                </div>
                <h2 className="text-lg font-bold sm:text-xl md:text-2xl">Farm-to-Table Delights</h2>
                <p className="text-sm text-gray-500">Discover the joy of fresh, sustainably grown food straight from your farm to your table.</p>
                <p className="pt-2 text-xs font-medium"><a href="#_" className="mr-1 underline">Mike Roberts</a> · <span className="mx-1">April 6, 2021</span> · <span className="mx-1 text-gray-600">3 min. read</span></p>
            </div>

            <div className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-6 xl:col-span-4">
                <a href="#_" className="block">
                    <img className="object-cover w-full mb-2 overflow-hidden rounded-lg max-h-56" src="blog5.jpg" alt=''></img>
                </a>
                <div className="bg-blue-500 flex items-center px-3 py-1.5 leading-none rounded-full text-xs font-medium uppercase text-white inline-block">
                    <span>Inspiration</span>
                </div>
                <h2 className="text-lg font-bold sm:text-xl md:text-2xl">Inspiring Stories of Sustainable Farming</h2>
                <p className="text-sm text-gray-500">Read inspiring stories of farmers who have successfully adopted sustainable practices.</p>
                <p className="pt-2 text-xs font-medium"><a href="#_" className="mr-1 underline">Tom Johnson</a> · <span className="mx-1">May 25, 2021</span> · <span className="mx-1 text-gray-600">3 min. read</span></p>
            </div>

            <div className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-6 xl:col-span-4">
                <a href="#_" className="block">
                    <img className="object-cover w-full mb-2 overflow-hidden rounded-lg max-h-56" src="blog6.jpg" alt=''></img>
                </a>
                <div className="bg-gray-800 flex items-center px-3 py-1.5 leading-none rounded-full text-xs font-medium uppercase text-white inline-block">
                    <span>Efficiency</span>
                </div>
                <h2 className="text-lg font-bold sm:text-xl md:text-2xl">Maximizing Efficiency on the Farm</h2>
                <p className="text-sm text-gray-500">Tips and tricks for making your farming operations more efficient and sustainable.</p>
                <p className="pt-2 text-xs font-medium"><a href="#_" className="mr-1 underline">Susan Lee</a> · <span className="mx-1">May 12, 2021</span> · <span className="mx-1 text-gray-600">4 min. read</span></p>
            </div>

            <div className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-6 xl:col-span-4">
                <a href="#_" className="block">
                    <img className="object-cover w-full mb-2 overflow-hidden rounded-lg max-h-56" src="blog8.jpg" alt=''></img>
                </a>
                <div className="bg-gray-800 flex items-center px-3 py-1.5 leading-none rounded-full text-xs font-medium uppercase text-white inline-block">
                    <span>Tips</span>
                </div>
                <h2 className="text-lg font-bold sm:text-xl md:text-2xl">Seasonal Farming Tips</h2>
                <p className="text-sm text-gray-500">Get the latest tips for seasonal farming to ensure a successful harvest every time.</p>
                <p className="pt-2 text-xs font-medium"><a href="#_" className="mr-1 underline">Rachel Adams</a> · <span className="mx-1">May 2, 2021</span> · <span className="mx-1 text-gray-600">3 min. read</span></p>
            </div>
        </div>
    </div>
</section>
    </div>
  )
}

export default Blog

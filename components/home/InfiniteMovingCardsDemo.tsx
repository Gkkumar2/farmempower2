import React from 'react';

function InfiniteMovingCardsDemo() {
  return (
    <div>
      <section className="flex items-center justify-center py-8 bg-gray-100 min-w-screen">
        <div className="max-w-4xl px-6 mx-auto bg-gray-100 md:px-8 xl:px-6">
          <div className="flex flex-col items-center lg:flex-row">
            <div className="flex flex-col items-start justify-center w-full h-full pr-6 mb-8 lg:mb-0 lg:w-1/2">
              <p className="mb-2 text-sm font-medium tracking-tight text-indigo-500 uppercase" data-primary="indigo-500">
                Our customers love our product
              </p>
              <h2 className="text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl sm:leading-none md:text-5xl lg:text-4xl xl:text-5xl">
                Testimonials
              </h2>
              <p className="my-4 text-base text-gray-600">
                Don't just take our word for it, read from our extensive list of case studies and customer testimonials.
              </p>
            </div>
            <div className="w-full lg:w-1/2">
              <blockquote className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow" data-rounded="rounded-lg" data-rounded-max="rounded-full">
                <div className="flex flex-col pr-4">
                  <div className="relative pl-8">
                    <svg className="absolute left-0 w-8 h-8 text-indigo-500 fill-current" data-primary="indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125">
                      <path d="M30.7 42c0 6.1 12.6 7 12.6 22 0 11-7.9 19.2-18.9 19.2C12.7 83.1 5 72.6 5 61.5c0-19.2 18-44.6 29.2-44.6 2.8 0 7.9 2 7.9 5.4S30.7 31.6 30.7 42zM82.4 42c0 6.1 12.6 7 12.6 22 0 11-7.9 19.2-18.9 19.2-11.8 0-19.5-10.5-19.5-21.6 0-19.2 18-44.6 29.2-44.6 2.8 0 7.9 2 7.9 5.4S82.4 31.6 82.4 42z" />
                    </svg>
                    <p className="mt-2 text-xs text-gray-600 sm:text-sm lg:text-xs xl:text-sm">
                    This app has completely transformed how I manage my farm. The crop disease prediction and weather forecasting tools are incredibly accurate and useful.
                    </p>
                  </div>
                  <h3 className="pl-8 mt-2 text-xs font-medium leading-4 text-gray-800 truncate sm:text-sm lg:text-xs xl:text-sm">
                  Rajitha Subasinghe
                    <span className="mt-1 text-xs leading-4 text-gray-500 truncate">- Farmer</span>
                  </h3>
                </div>
                <img className="flex-shrink-0 w-16 h-16 bg-gray-300 rounded-full xl:w-20 xl:h-20" src="https://images.pexels.com/photos/240561/pexels-photo-240561.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
              </blockquote>
              <blockquote className="flex items-center justify-between w-full p-4 mt-4 bg-white rounded-lg shadow" data-rounded="rounded-lg" data-rounded-max="rounded-full">
                <div className="flex flex-col pr-4">
                  <div className="relative pl-8">
                    <svg className="absolute left-0 w-8 h-8 text-indigo-500 fill-current" data-primary="indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125">
                      <path d="M30.7 42c0 6.1 12.6 7 12.6 22 0 11-7.9 19.2-18.9 19.2C12.7 83.1 5 72.6 5 61.5c0-19.2 18-44.6 29.2-44.6 2.8 0 7.9 2 7.9 5.4S30.7 31.6 30.7 42zM82.4 42c0 6.1 12.6 7 12.6 22 0 11-7.9 19.2-18.9 19.2-11.8 0-19.5-10.5-19.5-21.6 0-19.2 18-44.6 29.2-44.6 2.8 0 7.9 2 7.9 5.4S82.4 31.6 82.4 42z" />
                    </svg>
                    <p className="mt-2 text-xs text-gray-600 sm:text-sm lg:text-xs xl:text-sm">
                    The practices and library are a fantastic resource, filled with valuable information on sustainable farming practices.
                    </p>
                  </div>
                  <h3 className="pl-8 mt-2 text-xs font-medium leading-4 text-gray-800 truncate sm:text-sm lg:text-xs xl:text-sm">
                    Naleen Rajapakshe
                    <span className="mt-1 text-xs leading-4 text-gray-500 truncate">- Farmer</span>
                  </h3>
                </div>
                <img className="flex-shrink-0 w-16 h-16 bg-gray-300 rounded-full xl:w-20 xl:h-20" src="https://images.pexels.com/photos/762527/pexels-photo-762527.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
              </blockquote>
              <blockquote className="flex items-center justify-between w-full p-4 mt-4 bg-white rounded-lg shadow" data-rounded="rounded-lg" data-rounded-max="rounded-full">
                <div className="flex flex-col pr-4">
                  <div className="relative pl-8">
                    <svg className="absolute left-0 w-8 h-8 text-indigo-500 fill-current" data-primary="indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125">
                      <path d="M30.7 42c0 6.1 12.6 7 12.6 22 0 11-7.9 19.2-18.9 19.2C12.7 83.1 5 72.6 5 61.5c0-19.2 18-44.6 29.2-44.6 2.8 0 7.9 2 7.9 5.4S30.7 31.6 30.7 42zM82.4 42c0 6.1 12.6 7 12.6 22 0 11-7.9 19.2-18.9 19.2-11.8 0-19.5-10.5-19.5-21.6 0-19.2 18-44.6 29.2-44.6 2.8 0 7.9 2 7.9 5.4S82.4 31.6 82.4 42z" />
                    </svg>
                    <p className="mt-2 text-xs text-gray-600 sm:text-sm lg:text-xs xl:text-sm">
                    Peer-to-peer support has been amazing. Connecting with other farmers and sharing experiences has helped me improve my techniques and find new ways to tackle problems
                    </p>
                  </div>
                  <h3 className="pl-8 mt-2 text-xs font-medium leading-4 text-gray-800 truncate sm:text-sm lg:text-xs xl:text-sm">
                     Nimal Surendara
                    <span className="mt-1 text-xs leading-4 text-gray-500 truncate">- Farmer</span>
                  </h3>
                </div>
                <img className="flex-shrink-0 w-16 h-16 bg-gray-300 rounded-full xl:w-20 xl:h-20" src="https://images.pexels.com/photos/307847/pexels-photo-307847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
              </blockquote>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default InfiniteMovingCardsDemo;

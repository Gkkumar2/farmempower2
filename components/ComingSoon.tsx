import { BrainCog } from 'lucide-react'
import React from 'react'

function ComingSoon() {
  return (
    <div>
        <div className="bg-gray-200 font-sans leading-normal tracking-normal">

    
<section className="bg-white py-20">
    <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
            <h1 className="flex items-center justify-center text-4xl font-bold mb-6">We're launching soon <BrainCog/></h1>
        </div>
    </div>
</section>


<section className="bg-gray-200 py-20">
    <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">What to expect</h2>
            <p className="text-gray-600 mb-12 text-xl">Our crop prediction page is almost here! Get ready to transform your farming experience with cutting-edge technology. Here's a sneak peek at what's coming:
            </p>
        </div>
        <div className="flex flex-wrap -mx-4 mt-12">
            <div className="w-full md:w-1/3 px-4 mb-8">
                <div className="rounded-md bg-white shadow-md p-8">
                    <div className="text-4xl font-bold text-purple-600 mb-4">01</div>
                    <h3 className="text-2xl font-bold mb-4">Weather Insights</h3>
                    <p className="text-gray-600 mb-4">Stay ahead with accurate weather forecasts tailored to your field. Get detailed predictions that help you plan your farming activities, optimize watering schedules, and protect your crops from adverse weather conditions. Alerts to stay prepared for weather changes.</p>
                </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-8">
                <div className="rounded-md bg-white shadow-md p-8">
                    <div className="text-4xl font-bold text-purple-600 mb-4">02</div>
                    <h3 className="text-2xl font-bold mb-4">Soil Analysis</h3>
                    <p className="text-gray-600 mb-4">Understand your soil like never before. Our advanced soil analysis feature provides insights into soil health, nutrient levels, and moisture content, enabling you to make informed decisions for better crop yields and sustainable farming practices.</p>
                </div>
            </div>

            <div className="w-full md:w-1/3 px-4 mb-8">
                <div className="rounded-md bg-white shadow-md p-8">
                    <div className="text-4xl font-bold text-purple-600 mb-4">03</div>
                    <h3 className="text-2xl font-bold mb-4">Crop Prediction</h3>
                    <p className="text-gray-600 mb-4">Predict the best crops for your field based on comprehensive data analysis. Our crop prediction tool uses weather patterns, soil conditions, and historical data to recommend the most suitable crops for your farm, ensuring maximum productivity and sustainability.

</p>
                </div>
            </div>
        </div>
    </div>
</section>
</div>
    </div>
  )
}

export default ComingSoon
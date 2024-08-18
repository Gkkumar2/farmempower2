
import CategoryList from '@/components/Sustainable/CategoryList'
import AddSustainabilityPracticeForm from '@/components/Sustainable/SustainabilityForm'
import React from 'react'

function page() {
  return (
    <div className='grid gap-3 bg-slate-50'>
      <div className='font-serif mt-3'><AddSustainabilityPracticeForm/></div>
      <div><CategoryList/></div>
    </div>
    
  )
}

export default page
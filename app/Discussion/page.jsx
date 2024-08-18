import QuestionList from '@/components/Discussion/QuestionList'
import { PopoverDemo } from '@/components/Discussion/questionpop'
import { MessageSquareText } from 'lucide-react'



import React from 'react'

function page() {
  return (
    <div className='w-full bg-gray-100'>
      <div className="container mx-auto p-4">
      <h1 className="flex text-3xl font-bold mb-4">Discussion <MessageSquareText/></h1>
      <QuestionList />
    </div>
    </div>
    
  )
}

export default page
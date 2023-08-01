import { useState } from 'react'
import './App.css'
import { ListPlus, StackSimple, ArrowsCounterClockwise, ArrowsClockwise, ToggleLeft, ToggleRight, Stack } from "@phosphor-icons/react";
import NewTopic from './components/NewTopic';

function App() {
  const [topic, setTopic] = useState('')


  function handleTopicUpdate(newTopic){
    setTopic(newTopic)
  }

  return (
    <div className='mx-auto'>
      <div className='flex flex-row w-full justify-between items-center h-14 border-b-2 px-4'>
        <div className='grid grid-cols-2 gap-4'>
          <StackSimple size={24} className='cursor-pointer' />
          <ListPlus size={24} className='cursor-pointer' />
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div className='text-sm cursor-pointer'>log in</div>
          <div className='text-sm cursor-pointer'>sign up</div>
        </div>
        
      </div>
      <div className='flex flex-row w-full justify-between items-center h-14 px-4'>
        <div className='grid grid-cols-2 items-center justify-items-center'>
          <NewTopic getNewTopic={handleTopicUpdate} />
          <div className='text-sm uppercase'>topic</div>
        </div>
        <div className='grid grid-cols-2 items-center justify-items-center'>
          <ToggleLeft size={24} className='cursor-pointer' />
          <div className='text-sm uppercase'>private</div>
        </div> 
      </div>
      <div className='px-6 text-left'>
        {topic}
      </div>

    </div>
  )
}

export default App

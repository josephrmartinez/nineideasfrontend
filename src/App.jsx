// import { useState } from 'react'
// import './App.css'
// import { ListPlus, StackSimple, ArrowsCounterClockwise, ArrowsClockwise, ToggleLeft, ToggleRight, Stack } from "@phosphor-icons/react";
// import NewTopic from './components/NewTopic';
// import VisibilityToggle from './components/VisibilityToggle';

// function App() {
//   const [topic, setTopic] = useState('')
//   const [buttonActive, setButtonActive] = useState(false)
//   const fillWidth = 30



//   function handleTopicUpdate(newTopic){
//     setTopic(newTopic)
//   }

//   function handleAddIdea() {
//     setButtonActive(true)  
//     setTimeout(() => {
//         setButtonActive(false);
//       }, 100);
//   }

//   return (
//     <div className='mx-auto'>
//       <div className='flex flex-row w-full justify-between items-center h-14 border-b-2 px-4'>
//         <div className='grid grid-cols-2 gap-4'>
//           <StackSimple size={24} className='cursor-pointer' />
//           <ListPlus size={24} className='cursor-pointer' />
//         </div>
//         <div className='grid grid-cols-2 gap-4'>
//           <div className='text-sm cursor-pointer'>log in</div>
//           <div className='text-sm cursor-pointer'>sign up</div>
//         </div>
        
//       </div>

//       <div className='w-96 mx-auto'>
//       <div className='flex flex-row w-full justify-between items-center h-14'>
//         <NewTopic onClick={handleTopicUpdate} />
//         <VisibilityToggle /> 
//       </div>
//       <div className='text-left mb-2'>
//         {topic}:
//       </div>

//       <textarea
//         className='w-96 h-20 mb-3 outline-none border bg-neutral-50'
//         // value={currentIdea}
//         // ref={ideaInputRef}
//         autoFocus
//         // onChange={handleIdeaInputChange}
//         // onKeyDown={checkForSubmit}
//       >
//       </textarea> 
      

//       </div>
//       <div className='w-96 h-4 mb-4 mx-auto rounded-full border relative'>  
//         <div className='absolute left-0 top-0 h-full rounded-full shadow-lg'
//           style={{ width: fillWidth, background: "linear-gradient(to bottom, #6cb00e, #005c14)", transition: "width 0.4s cubic-bezier(0.3, .15, 0.35, 1)" }}>
//         </div>
//       </div>
//       <div className='w-80 mx-auto'>
//       <button class={`pushable ${buttonActive ? 'active' : ''}`} onClick={handleAddIdea}>
//         <span class="shadow"></span>
//         <span class="edge"></span>
//         <span class="front">
//           add idea
//         </span>
//       </button>
//       </div>

//       </div>
      
      


    
//   )
// }

// export default App

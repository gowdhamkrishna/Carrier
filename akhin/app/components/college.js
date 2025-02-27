import React from 'react'

const College = ({page}) => {
    console.log(page);
    
  return (
    <div className='w-[100vw] h-[100vh] absolute bg-gradient-to-r backdrop-blur-lg bg-green-400/40   0 to to-blue-600/10'>
         <p className='p-[30px] mt-[70px] text-center text-black/55 text-[30px]'>Top Colleges</p>
         {json.Topcolleges.map((steps,index)=>(<>{steps}</>))}
    </div>
  )
}

export default College
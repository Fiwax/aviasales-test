import React from 'react'


const Loader = () => {
  return (
    <div>
      <div className="flex justify-center">
        <div className="p-5 rounded-full bg-blue-500 flex space-x-2">
          <div className="w-5 h-5 bg-white rounded-full animate-bounce" />
          <div className="w-5 h-5 bg-white rounded-full animate-bounce" />
          <div className="w-5 h-5 bg-white rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  )
}

export default Loader
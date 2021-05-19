import React from 'react'

const ShowMoreButton = ({ setTicketNum, ticketNum }) => {
  return (
    <div className="flex justify-center w-full items-center rounded-lg h-14 bg-blue-500 text-white text-xl my-10">
      <button
        className="w-full focus:outline-none"
        type="button"
        onClick={() => setTicketNum(ticketNum + 5)}
      >
        Показать еще 5 билетов
      </button>
    </div>
  )
}

export default ShowMoreButton

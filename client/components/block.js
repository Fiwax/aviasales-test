import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ShowMoreButton from './showMoreButton'
import './checkbox.scss'
import Loader from './loader'

const Block = () => {
  const [isBlue, setBlue] = useState('cheap')
  const { ticketsData } = useSelector((s) => s.tickets)
  const [ticketNum, setTicketNum] = useState(5)
  const [isLoading, setIsLoading] = useState(true)

  const [checkbox, setCheckbox] = useState({
    all: true,
    noTransfer: true,
    oneTransfer: true,
    twoTransfer: true,
    threeTransfer: true
  })

  const arrayOfCheckbox = Object.keys(checkbox).filter((item) => checkbox[item])

  const handleCheckbox = (event) => {
    const { name, checked } = event.target
    setCheckbox((prev) => ({ ...prev, [name]: checked }))
  }

  const allCheckbox = () => {
    setCheckbox((prev) => ({
      ...prev,
      all: !checkbox.all,
      noTransfer: !checkbox.noTransfer,
      twoTransfer: !checkbox.twoTransfer,
      oneTransfer: !checkbox.oneTransfer,
      threeTransfer: !checkbox.threeTransfer
    }))
  }

  const sortTickets = (tickets) => {
    if (isBlue === 'cheap') {
      return tickets.sort((a, b) => a.price - b.price)
    }
    if (isBlue === 'faster') {
      tickets.sort(
        (a, b) =>
          a.segments[0].duration +
          a.segments[1].duration -
          (b.segments[0].duration + b.segments[1].duration)
      )
    }
    return tickets
  }

  const filterCheckBox = (ticketsArr) => {
    return ticketsArr.filter((arr) => {
      if (checkbox.all) return arr
      if (
        checkbox.noTransfer &&
        arr.segments[0].stops.length === 0 &&
        arr.segments[1].stops.length === 0
      ) {
        return true
      }
      if (
        checkbox.oneTransfer &&
        arr.segments[0].stops.length === 1 &&
        arr.segments[1].stops.length === 1
      )
        return true
      if (
        checkbox.twoTransfer &&
        arr.segments[0].stops.length === 2 &&
        arr.segments[1].stops.length === 2
      )
        return true
      if (
        checkbox.threeTranfer &&
        arr.segments[0].stops.length === 3 &&
        arr.segments[1].stops.length === 3
      )
        return true
      return false
    })
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(!isLoading)
    }, 2000)
  }, [])

  const shortTickets = sortTickets(filterCheckBox(ticketsData)).slice(0, 5)
  console.log('tickets', shortTickets)

  const transferAmount = (amountOfTransfer) => {
    if (amountOfTransfer === 0) return '0 Пересадок'
    if (amountOfTransfer === 1) return '1 Пересадка'
    if (amountOfTransfer === 2) return '2 Пересадки'
    return '3 Пересадки'
  }

  return (
    <div className="flex justify-center">
      <div>
        <div>
          <div className="flex bg-white flex-col py-1 shadow-md rounded-lg">
            <div className="transfer-amount py-2 text-sm font-sm px-5 uppercase">Количество пересадок</div>
            <div className="flex items-center hover:bg-blue-200 px-3">
              <input
                className="w-5 h-5 my-2 rounded checkbox"
                type="checkbox"
                checked={checkbox.all}
                onChange={allCheckbox}
                id="all"
                name="all"
              />
              <span className="check__box" />
              <label htmlFor="all" className="px-2 text-gray-600 cursor-pointer">
                Все
              </label>
            </div>
            <div className="flex items-center px-3 hover:bg-blue-200">
              <input
                className="w-5 h-5 my-2 rounded checkbox"
                id="noTransfer"
                type="checkbox"
                checked={checkbox.noTransfer}
                onChange={handleCheckbox}
                name="noTransfer"
              />
              <span className="check__box" />
              <label htmlFor="noTransfer" className="px-2 text-gray-600 cursor-pointer">
                Без пересадок
              </label>
            </div>
            <div className="flex items-center hover:bg-blue-200 px-3">
              <input
                className="w-5 h-5 my-2 rounded checkbox"
                id="oneTransfer"
                type="checkbox"
                checked={checkbox.oneTransfer}
                name="oneTransfer"
                onChange={handleCheckbox}
              />
              <span className="check__box" />
              <label htmlFor="oneTransfer" className="px-2 text-gray-600 cursor-pointer">
                1 пересадка
              </label>
            </div>
            <div className="flex items-center hover:bg-blue-200 px-3">
              <input
                className="w-5 h-5 my-2 rounded checkbox"
                id="twoTransfer"
                type="checkbox"
                checked={checkbox.twoTransfer}
                name="twoTransfer"
                onChange={handleCheckbox}
              />
              <span className="check__box" />
              <label htmlFor="twoTransfer" className="px-2 text-gray-600 cursor-pointer">
                2 пересадки
              </label>
            </div>
            <div className="flex items-center hover:bg-blue-200 px-3">
              <input
                className="w-5 h-5 my-2 rounded checkbox"
                id="threeTransfer"
                type="checkbox"
                checked={checkbox.threeTransfer}
                name="threeTransfer"
                onChange={handleCheckbox}
              />
              <span className="check__box" />
              <label htmlFor="threeTransfer" className="px-2 text-gray-600 cursor-pointer">
                3 пересадки
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="w-6/12">
        <div className="px-4">
          <div className="h-14 bg-white rounded">
            <div className="tabs w-11/12 h-10 justify-between h-full w-full flex">
              <button
                type="button"
                onClick={() => setBlue('cheap')}
                className={`tabs__text text-black focus:outline-none text-lg rounded-l w-full ${
                  isBlue === 'cheap' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                }`}
              >
                Самый дешевый
              </button>
              <button
                type="button"
                onClick={() => setBlue('faster')}
                className={`tabs__text w-full text-lg focus:outline-none  ${
                  isBlue === 'faster' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                }`}
              >
                Самый быстрый
              </button>
            </div>
          </div>
          <div>
            {isLoading ? (
              <div className="mt-20">
                <Loader />
              </div>
            ) : (
              shortTickets?.map((item, indexx) => {
                return (
                  <div
                    key={`${item.price}${indexx}`}
                    className="bg-white p-4 rounded-lg my-10 shadow-md"
                  >
                    <div className="flex justify-between ">
                      <span className="text-blue-500 font-semibold text-2xl">
                        {item.price.toLocaleString()} Р
                      </span>
                      <img src={`//pics.avs.io/99/36/${item.carrier}.png`} alt="logo" />
                    </div>
                    {item?.segments?.map((segment, i) => {
                      return (
                        <div key={i}>
                          <div className="my-3 mr-4 flex justify-between">
                            <div>
                              <span className="uppercase text-gray-500 font-medium">
                                {segment.origin}-{segment.destination}
                              </span>
                              <p className="font-semibold">
                                {new Date(segment.date).getHours()}:
                                {new Date(segment.date).getMinutes()}-
                                {new Date(
                                  new Date(segment.date).setHours(
                                    new Date(segment.date).getHours() +
                                      Math.ceil(segment.duration / 60)
                                  )
                                ).getHours()}
                                :
                                {new Date(
                                  new Date(segment.date).setMinutes(
                                    new Date(segment.date).getMinutes() + segment.duration
                                  )
                                ).getMinutes()}
                              </p>
                            </div>
                            <div>
                              <span className="uppercase text-gray-500 font-medium">В Пути</span>
                              <div className="font-semibold">
                                {Math.ceil(segment.duration / 60)}ч {segment.duration % 60}м
                              </div>
                            </div>
                            <div>
                              <span className="uppercase text-gray-500 font-medium">
                                {transferAmount(segment.stops.length)}
                              </span>
                              <div className="flex">
                                {segment?.stops?.map((stops, index) => {
                                  return (
                                    <div key={stops}>
                                      <div className="mr-1 font-semibold text-gray-800">
                                        <span>{stops}</span>
                                        <span>{index < segment.stops.length - 1 && ','}</span>
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )
              })
            )}
          </div>
          {arrayOfCheckbox.length !== 0 && !isLoading && (
            <ShowMoreButton setTicketNum={setTicketNum} ticketNum={ticketNum} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Block

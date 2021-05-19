import React, { useState } from 'react'

const CheckBoxCard = () => {
  const [checkbox, setCheckbox] = useState({
    all: true,
    noTransfer: true,
    oneTransfer: true,
    twoTransfer: true,
    threeTranfer: true
  })

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
      threeTranfer: !checkbox.threeTranfer
    }))
  }
  return (
    <div className="">
      <div className="flex bg-white flex-col py-1 shadow-md rounded-lg">
        <div className="py-2 text-sm font-sm px-5 uppercase">Количество пересадок</div>
        <div className="flex items-center hover:bg-blue-200 px-3">
          <input
            className="w-5 h-5 my-2 rounded"
            type="checkbox"
            checked={checkbox.all}
            onChange={allCheckbox}
            id="all"
            name="all"
          />
          <label htmlFor="all" className="px-2 text-gray-600 cursor-pointer">
            Все
          </label>
        </div>
        <div className="flex items-center px-3 hover:bg-blue-200">
          <input
            className="w-5 h-5 my-2 rounded"
            id="noTransfer"
            type="checkbox"
            checked={checkbox.noTransfer}
            onChange={handleCheckbox}
            name="noTransfer"
          />
          <label htmlFor="noTransfer" className="px-2 text-gray-600 cursor-pointer">
            Без пересадок
          </label>
        </div>
        <div className="flex items-center hover:bg-blue-200 px-3">
          <input
            className="w-5 h-5 my-2 rounded"
            id="oneTransfer"
            type="checkbox"
            checked={checkbox.oneTransfer}
            name="oneTransfer"
            onChange={handleCheckbox}
          />
          <label htmlFor="oneTransfer" className="px-2 text-gray-600 cursor-pointer">
            1 пересадка
          </label>
        </div>
        <div className="flex items-center hover:bg-blue-200 px-3">
          <input
            className="w-5 h-5 my-2 rounded"
            id="twoTransfer"
            type="checkbox"
            checked={checkbox.twoTransfer}
            name="twoTransfer"
            onChange={handleCheckbox}
          />
          <label htmlFor="twoTransfer" className="px-2 text-gray-600 cursor-pointer">
            2 пересадки
          </label>
        </div>
        <div className="flex items-center hover:bg-blue-200 px-3">
          <input
            className="w-5 h-5 my-2 rounded"
            id="threeTransfer"
            type="checkbox"
            checked={checkbox.threeTranfer}
            name="threeTransfer"
            onChange={handleCheckbox}
          />
          <label htmlFor="threeTransfer" className="px-2 text-gray-600 cursor-pointer">
            3 пересадки
          </label>
        </div>
      </div>
    </div>
  )
}

export default CheckBoxCard

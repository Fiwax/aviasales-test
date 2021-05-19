import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Head from './head'
import Logo from './logo'
import Block from './block'
import { getSearchId, getTickets } from '../redux/reducers/tickets'

const Dummy = () => {
  const dispatch = useDispatch()
  const { searchId, stop } = useSelector((s) => s.tickets)

  useEffect(() => {
    dispatch(getSearchId())
  }, [])

  useEffect(() => {
    if (searchId && !stop) {
      dispatch(getTickets())
    }
  }, [searchId, stop])

  return (
    <div>
      <Head title="Hello" />
      <Logo />
      <Block />
    </div>
  )
}

Dummy.propTypes = {}

export default React.memo(Dummy)

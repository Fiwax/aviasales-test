import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import auth from './auth'
import tickets from './tickets'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,
    tickets
  })

export default createRootReducer

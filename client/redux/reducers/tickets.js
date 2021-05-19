import axios from 'axios'

const GET_SEARCH_ID = 'GET_SEARCH_ID'
const GET_TICKETS = 'GET_TICKETS'
const STOP = 'STOP'

const initialState = {
  searchId: '',
  stop: false,
  ticketsData: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SEARCH_ID: {
      return { ...state, searchId: action.searchId }
    }
    case GET_TICKETS: {
      return { ...state, ticketsData: [...state.ticketsData, ...action.ticketsData] }
    }
    case STOP: {
      return { ...state, stop: action.stop }
    }
    default:
      return state
  }
}

export function getSearchId() {
  return (dispatch) => {
    axios('https://front-test.beta.aviasales.ru/search').then(({ data }) =>
      dispatch({ type: GET_SEARCH_ID, searchId: data.searchId })
    )
  }
}

export function getTickets() {
  return async (dispatch, getState) => {
    const store = getState()
    const { searchId } = store.tickets
    async function getAxios() {
      try {
        const { data } = await axios(
          `https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`
        )
        dispatch({ type: GET_TICKETS, ticketsData: data.tickets })
        if (data.stop === true) {
          dispatch({ type: 'STOP', stop: data.stop })
        }
        if (!data.stop) {
          getAxios()
        }
      } catch (err) {
        console.log(err)
        getAxios()
      }
    }
    getAxios()
  }
}

const GET_CLOCK = "clock/GET_CLOCK"
const CREATE_CLOCK = "clock/CREATE_CLOCK"

const getClock = (clock) => ({
    type: GET_CLOCK,
    payload: clock
})

const createClock = (clock) => ({
    type: CREATE_CLOCK,
    payload: clock
})

export const getClockThunk = (id) => async(dispatch) => {
    const response = await fetch(`/api/clock/${id}`)
    const data = await response.json()
    if (data.errors){
        return data
    }
    dispatch(getClock(data))
}

export const createClockThunk = (clock) => async(dispatch) => {
    const { userId, title, description, danger, endDate, address, startLat, startLong, endLat, endLong } = clock
    const response = await fetch('/api/clock/new', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        title,
        description,
        danger,
        endDate,
        address,
        startLat,
        startLong,
        endLat, 
        endLong
      })
    })
  
    const newClock = await response.json()
    dispatch(createClock(newClock))
    return newClock
}

const initialState = {}

export default function clockReducer (clocks = initialState, action) {
    switch(action.type){
        case GET_CLOCK:
            return action.payload
        case CREATE_CLOCK:
            return {...clocks, [action.payload.id]: action.payload}
        default:
            return clocks
    }
}
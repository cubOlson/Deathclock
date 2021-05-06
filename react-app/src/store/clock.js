const GET_CLOCK = "clock/GET_CLOCK"

const getClock = (clock) => ({
    type: GET_CLOCK,
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

const initialState = null

export default function clockReducer (clocks = initialState, action) {
    switch(action.type){
        case GET_CLOCK:
            return action.payload
        default:
            return clocks
    }
}
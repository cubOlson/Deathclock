const SET_SUPPLIES = "supply/SET_SUPPLIES"

const setSupplies = (supply) => ({
    type: SET_SUPPLIES,
    payload: supply
})

export const setSupplyThunk = (supply) => async(dispatch) => {
    const { clockId, food, water, temp, shelter, tools } = supply
    const response = await fetch(`/api/supply/${clockId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clockId,
        food,
        water, 
        temp,
        shelter,
        tools
      })
    })

    const newSupply = await response.json()
    dispatch(setSupplies(newSupply))
    return newSupply
}

const initialState = {}

export default function supplyReducer (supplies = initialState, action) {
    switch(action.type){
        case SET_SUPPLIES:
            return action.payload
        default:
            return supplies
    }
}
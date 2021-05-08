const GET_FORM = "form/GET_FORM"
const SET_FORM = "form/SET_FORM"

const getForm = () => ({
    type: GET_FORM
})

const setForm = (form) => ({
    type: SET_FORM,
    payload: form
})

export const setFormThunk = (val) => async(dispatch) => {
    dispatch(setForm(val))
}

export const getFormThunk = () => async(dispatch) => {
    dispatch(getForm())
}

const initialState = false

export default function formReducer (form = initialState, action) {
    switch(action.type){
        case GET_FORM:
            return form
        case SET_FORM:
            return action.payload
        default:
            return form
    }
}


// constants 
const SET_USER = "session/SET_USER"
const EDIT_USER = "session/EDIT_USER"
const REMOVE_USER = "session/REMOVE_USER"

const setUser = (user) => ({
    type: SET_USER,
    payload: user
})

const editUser = (user) => ({
  type: EDIT_USER,
  payload: user
})

const removeUser = () => ({
    type: REMOVE_USER
})

//Thunks 
export const authenticate = () => async(dispatch) => {
    const response = await fetch('/api/auth/',{
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json()
    if (data.errors){
        return
    }
    dispatch(setUser(data))
  }
  
  export const login = (email, password) => async(dispatch) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });
    const data = await response.json();
    if (data.errors) {
        return data
    }
    dispatch(setUser(data))
    return {}
  }
  
  export const logout = () => async(dispatch) => {
    await fetch("/api/auth/logout", {
      headers: {
        "Content-Type": "application/json",
      }
    });
    dispatch(removeUser())
  };
  
  
  export const signUp = (username, fullname, phoneNumber, ecname, ecPhone, email, password) => async(dispatch) => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        fullname,
        phoneNumber,
        ecname,
        ecPhone,
        email,
        password,
      }),
    });
    const data = await response.json();
    dispatch(setUser(data))
  }

  export const editUserThunk = (username, fullname, phoneNumber, ecname, ecPhone, bio, email) => async(dispatch) => {
    const response = await fetch("/api/auth/editUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        fullname,
        phoneNumber,
        ecname,
        ecPhone,
        bio,
        email,
      }),
    });
    const data = await response.json();
    dispatch(editUser(data))
  }


const initialState = { user: null }

export default function reducer (state = initialState, action) {
    switch(action.type){
        case SET_USER:
            return { user: action.payload }
        case EDIT_USER:
            return { user: action.payload }
        case REMOVE_USER:
            return { user: null}
        default:
            return state;
    }
}
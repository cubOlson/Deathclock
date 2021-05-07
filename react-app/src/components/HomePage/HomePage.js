import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClockForm from '../ClockForm/ClockForm'
import Clock from '../Clock/clock'
import { createClockThunk, getClockThunk } from '../../store/clock'

function Home(){
    const dispatch = useDispatch()
    const clock = useSelector(state => state.clock)
    const user = useSelector(state => state.session.user)

    const [formBool, setFormBool] = useState(false)

    let userId
    if (user){
        userId = user.id
    }

    useEffect(() => {
        dispatch(getClockThunk(userId))
    }, [dispatch])

    return (
        <div>
            {clock.id ?
            <Clock clock={clock}/>
            : <button onClick={e => setFormBool(true)}>Create New Clock</button>}
            {formBool && <ClockForm />}
        </div>
    )

}

export default Home